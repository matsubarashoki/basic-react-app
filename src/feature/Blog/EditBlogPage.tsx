"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";

// ブログの型定義
interface BlogPost {
  id: string;
  title: string;
  content: string;
  tags: string[];
  featuredImage: string;
  createdAt: string;
}

// サンプルデータ
const sampleBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Reactの基本について",
    content:
      "Reactは、Facebookが開発したJavaScriptライブラリです。ユーザーインターフェイスを構築するために使用され、特に単一ページアプリケーションの開発に適しています。コンポーネントベースのアプローチを採用しており、再利用可能なUIパーツを作成できます。",
    tags: ["React", "JavaScript", "フロントエンド"],
    featuredImage: "/placeholder.svg?height=200&width=300",
    createdAt: "2023-04-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Material-UIを使ったデザイン",
    content:
      "Material-UI（MUI）は、GoogleのMaterial Designを実装したReactコンポーネントライブラリです。美しく、レスポンシブなUIを簡単に構築できます。豊富なコンポーネントが用意されており、カスタマイズも容易です。",
    tags: ["MUI", "デザイン", "React"],
    featuredImage: "/placeholder.svg?height=200&width=300",
    createdAt: "2023-04-20T14:45:00Z",
  },
  {
    id: "3",
    title: "Zodを使ったフォームバリデーション",
    content:
      "Zodは、TypeScriptファーストのスキーマ宣言と検証ライブラリです。フォームのバリデーションに使用すると、型安全性を確保しながら、ユーザー入力を検証できます。react-hook-formと組み合わせると、より強力なフォーム処理が可能になります。",
    tags: ["Zod", "TypeScript", "バリデーション"],
    featuredImage: "/placeholder.svg?height=200&width=300",
    createdAt: "2023-05-05T09:15:00Z",
  },
  {
    id: "4",
    title: "Next.jsでのルーティング",
    content:
      "Next.jsは、Reactフレームワークで、ファイルベースのルーティングを提供します。App Routerを使用すると、ディレクトリ構造に基づいてルートが自動的に生成されます。これにより、複雑なルーティング設定を簡素化できます。",
    tags: ["Next.js", "ルーティング", "React"],
    featuredImage: "/placeholder.svg?height=200&width=300",
    createdAt: "2023-05-10T16:20:00Z",
  },
  {
    id: "5",
    title: "react-iconsの使い方",
    content:
      "react-iconsは、さまざまなアイコンライブラリをReactコンポーネントとして使用できるパッケージです。Font Awesome、Material Design、Featherなど、多くのアイコンセットが含まれています。使い方は非常に簡単で、必要なアイコンをインポートするだけです。",
    tags: ["react-icons", "UI", "アイコン"],
    featuredImage: "/placeholder.svg?height=200&width=300",
    createdAt: "2023-05-15T11:30:00Z",
  },
];

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

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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

  // ブログデータの取得
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // 実際のアプリでは以下のようなAPIコールを行う
        // const response = await fetch(`/api/blogs/${id}`);
        // const data = await response.json();

        // サンプルデータから該当するブログを検索
        const foundBlog = sampleBlogs.find((blog) => blog.id === id);

        setTimeout(() => {
          if (foundBlog) {
            setBlog(foundBlog);
            reset({
              title: foundBlog.title,
              content: foundBlog.content,
            });
            setTags(foundBlog.tags);
            setImagePreview(foundBlog.featuredImage);
          }
          setLoading(false);
        }, 800); // ローディング状態をシミュレート
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id, reset]);

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
      console.log("Form data to update:", {
        id,
        title: data.title,
        content: data.content,
        tags,
        imageFile: selectedImage ? selectedImage.name : "No image change",
      });

      // Simulate API call success
      setNotification({
        open: true,
        message: "ブログが正常に更新されました！",
        severity: "success",
      });

      // 成功したら詳細ページに遷移（実際のアプリではAPIレスポンス後）
      setTimeout(() => {
        navigate(`/blogs/${id}`);
      }, 1500);
    } catch (error) {
      console.error("Error updating blog:", error);
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

  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{ py: 8, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h5" align="center">
          ブログが見つかりませんでした。
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button variant="contained" onClick={() => navigate("/blogs")}>
            ブログ一覧に戻る
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          ブログを編集
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
              画像を変更
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
              color="secondary"
              size="large"
              onClick={() => navigate(`/blogs/${id}`)}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              更新する
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
