export interface ThemeContextProps {
  mode: string;
  setMode: (mode: string) => void;
}

export interface User {
  name?: string;
  username: string;
  email: string;
  picture?: string;
  createdAt?: string;
}

export interface CreateUser {
  clerkId: string;
  name: string;
  username: string | null;
  email?: string;
  password?: string;
  bio?: string;
  picture?: string;
  location?: string;
  protfolio?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}
