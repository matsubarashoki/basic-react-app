// ニュース記事の型定義
export interface NewsArticle {
  id: number;
  title: string;
  description: string;
  content?: string;
  image: string;
  category: string;
  date: string;
  featured: boolean;
  tags?: string[];
  likes?: number;
}

export default NewsArticle;
