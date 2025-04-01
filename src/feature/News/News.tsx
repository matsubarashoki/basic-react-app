"use client";

import type React from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  IconButton,
  InputBase,
  Pagination,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";
import { MdBookmark } from "react-icons/md";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { newsArticles } from "../../mock/mockData";
import { ROUTES } from "../../routes/routeConfig";

// スタイル付きの検索ボックス
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

// カテゴリーリスト
const categories = [
  "すべて",
  "テクノロジー",
  "ビジネス",
  "ライフスタイル",
  "エンタメ",
  "ファッション",
];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // handleCategoryChangeとhandlePageChangeの関数を修正します
  const handleCategoryChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setSelectedCategory(newValue);
    setPage(1);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // 選択されたカテゴリーでフィルタリング
  const filteredArticles =
    selectedCategory === 0
      ? newsArticles
      : newsArticles.filter(
          (article) => article.category === categories[selectedCategory]
        );

  // 注目記事
  const featuredArticle = newsArticles.find((article) => article.featured);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      {/* ヘッダー */}
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        {/* カテゴリータブ */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons="auto"
            allowScrollButtonsMobile
            centered={!isMobile}
          >
            {categories.map((category, index) => (
              <Tab key={index} label={category} />
            ))}
          </Tabs>
        </Box>

        {/* 注目記事 */}
        {selectedCategory === 0 && featuredArticle && (
          <Card
            sx={{
              mb: 4,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: { xs: "100%", md: "50%" },
                height: { xs: 240, md: 400 },
                objectFit: "cover",
              }}
              image={featuredArticle.image}
              alt={featuredArticle.title}
            />
            <CardContent
              sx={{
                width: { xs: "100%", md: "50%" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: 4,
              }}
            >
              <Chip
                label={featuredArticle.category}
                size="small"
                color="primary"
                sx={{ alignSelf: "flex-start", mb: 2 }}
              />
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                {featuredArticle.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {featuredArticle.description}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {featuredArticle.date}
              </Typography>
              <Button
                component={Link}
                to={`${ROUTES.NEWS}/${featuredArticle.id}`}
                variant="outlined"
                sx={{ alignSelf: "flex-start" }}
              >
                続きを読む
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ニュース記事一覧 */}
        <Grid container spacing={3}>
          {filteredArticles.map((article) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={article.image}
                  alt={article.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Chip
                      label={article.category}
                      size="small"
                      variant="outlined"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {article.date}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{ fontWeight: "bold", mt: 1 }}
                  >
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.description}
                  </Typography>
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    component={Link}
                    to={`${ROUTES.NEWS}/${article.id}`}
                    size="small"
                    color="primary"
                  >
                    続きを読む
                  </Button>
                  <IconButton size="small">
                    <MdBookmark />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ページネーション */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination
            count={3}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Container>
    </Box>
  );
}
