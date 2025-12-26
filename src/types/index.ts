export interface User {
  id: string;
  username: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  posts: number;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  images: string[];
  tags: string[];
  likes: number;
  comments: number;
  timestamp: Date;
  liked: boolean;
  saved: boolean;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
  liked: boolean;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  avatar: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}