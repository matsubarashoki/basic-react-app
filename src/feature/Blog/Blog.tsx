import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaSearch, FaTrash } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { sampleBlogs } from "../../mock/mockData";
import { BlogPost } from "../../types";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const blogsPerPage = 4;

  // ブログデータの取得（実際のアプリではAPIから取得）
  useEffect(() => {
    // APIからデータを取得する代わりにサンプルデータを使用
    const fetchBlogs = async () => {
      try {
        // 実際のアプリでは以下のようなAPIコールを行う
        // const response = await fetch('/api/blogs');
        // const data = await response.json();
        // setBlogs(data);

        // サンプルデータを使用
        setTimeout(() => {
          setBlogs(sampleBlogs);
          setFilteredBlogs(sampleBlogs);
          setLoading(false);
        }, 800); // ローディング状態をシミュレート
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // 検索機能
  useEffect(() => {
    if (searchTerm) {
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredBlogs(filtered);
      setPage(1); // 検索時にページを1に戻す
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchTerm, blogs]);

  // ページネーション用の現在のページのブログを取得
  const currentBlogs = filteredBlogs.slice(
    (page - 1) * blogsPerPage,
    page * blogsPerPage
  );

  // 日付をフォーマットする関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // コンテンツの一部を表示する関数（長すぎる場合は省略）
  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  // ブログ削除のハンドラー（実際のアプリではAPIを呼び出す）
  const handleDeleteBlog = (id: string) => {
    if (window.confirm("このブログを削除してもよろしいですか？")) {
      // 実際のアプリでは以下のようなAPIコールを行う
      // await fetch(`/api/blogs/${id}`, { method: 'DELETE' });

      // フロントエンドの状態を更新
      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs(updatedBlogs);
      setFilteredBlogs(updatedBlogs);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          ブログ一覧
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/create-blog"
        >
          新規ブログ作成
        </Button>
      </Box>

      {/* 検索フィールド */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="タイトル、内容、タグで検索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaSearch />
            </InputAdornment>
          ),
        }}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredBlogs.length === 0 ? (
        <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography variant="h6">ブログが見つかりませんでした。</Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            {currentBlogs.map((blog) => (
              <Grid item xs={12} sm={6} md={6} key={blog.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={blog.featuredImage}
                    alt={blog.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {formatDate(blog.createdAt)}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {truncateContent(blog.content)}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                    >
                      {blog.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Button
                        startIcon={<FaEye />}
                        variant="outlined"
                        size="small"
                        component={RouterLink}
                        to={`/blogs/${blog.id}`}
                      >
                        詳細を見る
                      </Button>
                      <Box>
                        <Button
                          startIcon={<FaEdit />}
                          variant="outlined"
                          size="small"
                          sx={{ mr: 1 }}
                          component={RouterLink}
                          to={`/edit-blog/${blog.id}`}
                        >
                          編集
                        </Button>
                        <Button
                          startIcon={<FaTrash />}
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDeleteBlog(blog.id)}
                        >
                          削除
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* ページネーション */}
          {filteredBlogs.length > blogsPerPage && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={Math.ceil(filteredBlogs.length / blogsPerPage)}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
