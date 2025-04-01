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

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export type UserList = User[];

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  tags: string[];
  featuredImage: string;
  createdAt: string;
}

export type BlogPosts = BlogPost[];
