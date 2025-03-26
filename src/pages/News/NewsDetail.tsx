"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdArrowBack, MdBookmark, MdShare } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { newsArticles } from "../../mock/mockData";
import NewsArticle from "../../types";

export default function NewsDetail() {
  const articleId = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // 記事データを取得
    const foundArticle = newsArticles.find((a) => a.id === Number(articleId));
    if (foundArticle) {
      setArticle(foundArticle);
      setLikeCount(foundArticle.likes || 0);
    }
  }, [articleId]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!article) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography>記事が見つかりません</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f9f9f9", minHeight: "100vh", pb: 8 }}>
      <Container maxWidth="lg">
        {/* 戻るボタン */}
        <Box sx={{ py: 2 }}>
          <Button startIcon={<MdArrowBack />} onClick={handleBack}>
            ニュース一覧に戻る
          </Button>
        </Box>

        {/* 記事ヘッダー */}
        <Card
          sx={{
            mb: 4,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <CardMedia
            component="img"
            height="400"
            image={article.image}
            alt={article.title}
            sx={{ objectFit: "cover" }}
          />
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Chip label={article.category} color="primary" />
              <Typography variant="body2" color="text.secondary">
                {article.date}
              </Typography>
            </Box>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              {article.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ mr: 2 }}>N</Avatar>
              <Typography variant="subtitle1">
                ニュースポータル編集部
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton size="small">
                <MdShare />
              </IconButton>
              <IconButton size="small">
                <MdBookmark />
              </IconButton>
            </Box>
          </CardContent>
        </Card>

        {/* 記事本文 */}
        <Paper sx={{ p: 4, mb: 4, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
          >
            {article.content}
          </Typography>
        </Paper>

        {/* タグ */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            タグ
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {article.tags?.map((tag, index) => (
              <Chip key={index} label={tag} variant="outlined" sx={{ mb: 1 }} />
            ))}
          </Stack>
        </Box>

        {/* いいねボタン */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 4,
          }}
        >
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                この記事はいかがでしたか？
              </Typography>
              <IconButton
                onClick={handleLike}
                sx={{
                  fontSize: "2rem",
                  color: liked ? "error.main" : "inherit",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                {liked ? <FaHeart size={40} /> : <FaRegHeart size={40} />}
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {likeCount} 人がいいねしました
              </Typography>
            </Box>
          </Card>
        </Box>

        {/* 関連記事 */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            関連記事
          </Typography>
          <Divider sx={{ mb: 3 }} />
          {/* 関連記事のコンテンツをここに追加 */}
        </Box>
      </Container>
    </Box>
  );
}
