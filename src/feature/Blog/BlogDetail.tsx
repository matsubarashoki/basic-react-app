import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaClock, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

// ブログの型定義
interface BlogPost {
  id: string;
  title: string;
  content: string;
  tags: string[];
  featuredImage: string;
  createdAt: string;
  author?: {
    name: string;
    avatar: string;
  };
}

// サンプルデータ
const sampleBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Reactの基本について",
    content:
      "Reactは、Facebookが開発したJavaScriptライブラリです。ユーザーインターフェイスを構築するために使用され、特に単一ページアプリケーションの開発に適しています。コンポーネントベースのアプローチを採用しており、再利用可能なUIパーツを作成できます。\n\nReactの主な特徴は以下の通りです：\n\n1. **仮想DOM**: Reactは仮想DOMを使用して、実際のDOMの更新を最小限に抑えます。これにより、パフォーマンスが向上します。\n\n2. **コンポーネントベース**: UIを小さな、再利用可能なコンポーネントに分割できます。\n\n3. **単方向データフロー**: データは親コンポーネントから子コンポーネントへと流れます。\n\n4. **JSX**: JavaScriptの拡張構文で、HTMLのようなコードをJavaScript内に記述できます。\n\nReactを学ぶことで、モダンなWebアプリケーション開発のスキルを身につけることができます。",
    tags: ["React", "JavaScript", "フロントエンド"],
    featuredImage: "/placeholder.svg?height=400&width=800",
    createdAt: "2023-04-15T10:30:00Z",
    author: {
      name: "田中太郎",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  },
  {
    id: "2",
    title: "Material-UIを使ったデザイン",
    content:
      "Material-UI（MUI）は、GoogleのMaterial Designを実装したReactコンポーネントライブラリです。美しく、レスポンシブなUIを簡単に構築できます。豊富なコンポーネントが用意されており、カスタマイズも容易です。\n\nMUIを使用する主なメリットは以下の通りです：\n\n1. **豊富なコンポーネント**: ボタン、フォーム、ナビゲーション、データ表示など、多くのコンポーネントが用意されています。\n\n2. **レスポンシブデザイン**: モバイルファーストのアプローチで、様々な画面サイズに対応できます。\n\n3. **テーマカスタマイズ**: 色、フォント、間隔などを簡単にカスタマイズできます。\n\n4. **アクセシビリティ**: WAI-ARIAの標準に準拠しており、アクセシブルなUIを構築できます。\n\nMUIを使うことで、プロフェッショナルなUIを短時間で構築することができます。",
    tags: ["MUI", "デザイン", "React"],
    featuredImage: "/placeholder.svg?height=400&width=800",
    createdAt: "2023-04-20T14:45:00Z",
    author: {
      name: "佐藤花子",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  },
  {
    id: "3",
    title: "Zodを使ったフォームバリデーション",
    content:
      "Zodは、TypeScriptファーストのスキーマ宣言と検証ライブラリです。フォームのバリデーションに使用すると、型安全性を確保しながら、ユーザー入力を検証できます。react-hook-formと組み合わせると、より強力なフォーム処理が可能になります。\n\nZodの主な特徴は以下の通りです：\n\n1. **型推論**: スキーマから自動的にTypeScriptの型が生成されます。\n\n2. **豊富なバリデーション**: 文字列、数値、オブジェクト、配列など、様々な型のバリデーションが可能です。\n\n3. **エラーメッセージのカスタマイズ**: バリデーションエラーメッセージをカスタマイズできます。\n\n4. **スキーマの合成**: 複数のスキーマを組み合わせて、複雑なバリデーションルールを作成できます。\n\nZodを使うことで、型安全なフォームバリデーションを実現し、ユーザー入力に関するバグを減らすことができます。",
    tags: ["Zod", "TypeScript", "バリデーション"],
    featuredImage: "/placeholder.svg?height=400&width=800",
    createdAt: "2023-05-05T09:15:00Z",
    author: {
      name: "鈴木一郎",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  },
  {
    id: "4",
    title: "Next.jsでのルーティング",
    content:
      "Next.jsは、Reactフレームワークで、ファイルベースのルーティングを提供します。App Routerを使用すると、ディレクトリ構造に基づいてルートが自動的に生成されます。これにより、複雑なルーティング設定を簡素化できます。\n\nNext.jsのルーティングの主な特徴は以下の通りです：\n\n1. **ファイルベースのルーティング**: ファイル構造がそのままURLパスになります。\n\n2. **動的ルーティング**: `[id]`のような動的セグメントを使用して、動的なルートを作成できます。\n\n3. **ネストされたルーティング**: フォルダ構造を使って、ネストされたルートを作成できます。\n\n4. **レイアウト**: 共通のレイアウトを複数のページで共有できます。\n\nNext.jsのルーティングを使うことで、シンプルかつ直感的なルーティング構造を実現できます。",
    tags: ["Next.js", "ルーティング", "React"],
    featuredImage: "/placeholder.svg?height=400&width=800",
    createdAt: "2023-05-10T16:20:00Z",
    author: {
      name: "山田健太",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  },
  {
    id: "5",
    title: "react-iconsの使い方",
    content:
      "react-iconsは、さまざまなアイコンライブラリをReactコンポーネントとして使用できるパッケージです。Font Awesome、Material Design、Featherなど、多くのアイコンセットが含まれています。使い方は非常に簡単で、必要なアイコンをインポートするだけです。\n\nreact-iconsの主な特徴は以下の通りです：\n\n1. **多様なアイコンセット**: Font Awesome、Material Design、Feather、Ioniconsなど、多くのアイコンセットが含まれています。\n\n2. **簡単な使用方法**: 必要なアイコンをインポートして、コンポーネントとして使用するだけです。\n\n3. **カスタマイズ**: サイズ、色、スタイルなどを簡単にカスタマイズできます。\n\n4. **軽量**: 必要なアイコンだけをインポートできるため、バンドルサイズを小さく保つことができます。\n\nreact-iconsを使うことで、アプリケーションに美しいアイコンを簡単に追加することができます。",
    tags: ["react-icons", "UI", "アイコン"],
    featuredImage: "/placeholder.svg?height=400&width=800",
    createdAt: "2023-05-15T11:30:00Z",
    author: {
      name: "伊藤美咲",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  },
];

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // APIからデータを取得する代わりにサンプルデータを使用
    const fetchBlog = async () => {
      try {
        // 実際のアプリでは以下のようなAPIコールを行う
        // const response = await fetch(`/api/blogs/${id}`);
        // const data = await response.json();
        // setBlog(data);

        // サンプルデータから該当するブログを検索
        const foundBlog = sampleBlogs.find((blog) => blog.id === id);

        setTimeout(() => {
          if (foundBlog) {
            setBlog(foundBlog);
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
  }, [id]);

  // 日付をフォーマットする関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // ブログ削除のハンドラー（実際のアプリではAPIを呼び出す）
  const handleDeleteBlog = async () => {
    if (window.confirm("このブログを削除してもよろしいですか？")) {
      try {
        // 実際のアプリでは以下のようなAPIコールを行う
        // await fetch(`/api/blogs/${id}`, { method: 'DELETE' });

        // 削除後にブログ一覧ページにリダイレクト
        navigate("/blogs");
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("ブログの削除中にエラーが発生しました。");
      }
    }
  };

  // コンテンツの改行を保持して表示
  const renderContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => (
      <Typography key={index} variant="body1" paragraph>
        {paragraph}
      </Typography>
    ));
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
          <Button
            startIcon={<FaArrowLeft />}
            variant="contained"
            component={RouterLink}
            to="/blogs"
          >
            ブログ一覧に戻る
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      {/* パンくずリスト */}
      <Breadcrumbs sx={{ mb: 4 }}>
        <Typography
          color="inherit"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none" }}
        >
          ホーム
        </Typography>
        <Typography
          color="inherit"
          component={RouterLink}
          to="/blogs"
          sx={{ textDecoration: "none" }}
        >
          ブログ一覧
        </Typography>
        <Typography color="text.primary">{blog.title}</Typography>
      </Breadcrumbs>

      <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {blog.title}
        </Typography>

        {/* メタ情報 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {blog.author && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={blog.author.avatar}
                alt={blog.author.name}
                sx={{ mr: 1, width: 24, height: 24 }}
              >
                <FaUser />
              </Avatar>
              <Typography variant="body2">{blog.author.name}</Typography>
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FaClock style={{ marginRight: "4px", fontSize: "14px" }} />
            <Typography variant="body2">
              {formatDate(blog.createdAt)}
            </Typography>
          </Box>
        </Box>

        {/* タグ */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
          {blog.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>

        {/* アイ  => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>

        {/* アイキャッチ画像 */}
        <Box
          sx={{ mb: 4, width: "100%", height: "auto", position: "relative" }}
        >
          <img
            src={blog.featuredImage || "/placeholder.svg"}
            alt={blog.title}
            style={{ width: "100%", height: "auto", borderRadius: "4px" }}
          />
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* ブログ本文 */}
        <Box sx={{ mb: 4 }}>{renderContent(blog.content)}</Box>

        <Divider sx={{ mb: 4 }} />

        {/* アクションボタン */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            startIcon={<FaArrowLeft />}
            variant="outlined"
            component={RouterLink}
            to="/blogs"
          >
            ブログ一覧に戻る
          </Button>
          <Box>
            <Button
              startIcon={<FaEdit />}
              variant="outlined"
              sx={{ mr: 2 }}
              component={RouterLink}
              to={`/edit-blog/${blog.id}`}
            >
              編集
            </Button>
            <Button
              startIcon={<FaTrash />}
              variant="outlined"
              color="error"
              onClick={handleDeleteBlog}
            >
              削除
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
