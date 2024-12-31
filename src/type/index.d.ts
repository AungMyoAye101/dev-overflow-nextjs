export interface ThemeContextProps {
  mode: string;
  setMode: (mode: string) => void;
}

export interface UserProps {
  clerkId: string;
  name: string;
  username: string | null;
  email?: string;
  password?: string;
  bio?: string;
  picture?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

export interface CreateUser {
  clerkId: string;
  name: string;
  username: string | null;
  email?: string;
  password?: string;
  picture?: string;
}

export interface UpdateUser {
  clerkId: string;
  updateData: {
    name: string;
    username: string | null;
    email?: string;
    password?: string;
    picture?: string;
  };
}

export interface ClerkIdProp {
  clerkId: string;
}
