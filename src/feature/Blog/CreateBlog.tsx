"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

// Define the form schema with Zod
const blogSchema = z.object({
  title: z
    .string()
    .min(5, "タイトルは5文字以上で入力してください")
    .max(100, "タイトルは100文字以内で入力してください"),
  content: z.string().min(20, "内容は20文字以上で入力してください"),
  featuredImage: z.instanceof(File).optional(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

// Styled component for file upload
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CreateBlogPage() {
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: BlogFormValues) => {
    try {
      // Create form data to handle file upload
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("tags", JSON.stringify(tags));

      if (selectedImage) {
        formData.append("featuredImage", selectedImage);
      }

      // Here you would typically send the formData to your API
      console.log("Form data to submit:", {
        title: data.title,
        content: data.content,
        tags,
        imageFile: selectedImage ? selectedImage.name : "No image selected",
      });

      // Simulate API call success
      setNotification({
        open: true,
        message: "ブログが正常に保存されました！",
        severity: "success",
      });

      // Reset form
      reset();
      setTags([]);
      setSelectedImage(null);
      setImagePreview(null);

      // 成功したら一覧ページに遷移（実際のアプリではAPIレスポンス後）
      setTimeout(() => {
        navigate("/blogs");
      }, 1500);
    } catch (error) {
      console.error("Error submitting blog:", error);
      setNotification({
        open: true,
        message: "エラーが発生しました。もう一度お試しください。",
        severity: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          新しいブログを作成
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 3 }}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="タイトル"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="内容"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={8}
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />

          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              タグ
            </Typography>
            <TextField
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              label="タグを追加"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleAddTag} edge="end">
                      <FaPlus />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />

            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 1, flexWrap: "wrap", gap: 1 }}
            >
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>

          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              アイキャッチ画像
            </Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<FaCloudUploadAlt />}
              sx={{ mt: 1 }}
            >
              画像をアップロード
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {imagePreview && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
          </Box>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => {
                // Save as draft logic would go here
                setNotification({
                  open: true,
                  message: "下書きとして保存されました",
                  severity: "success",
                });
              }}
            >
              下書き保存
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              公開する
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
