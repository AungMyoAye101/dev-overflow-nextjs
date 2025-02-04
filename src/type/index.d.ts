import { Bagde_Counts } from "../lib/utils";

export interface ThemeContextProps {
  mode: string;
  setMode: (mode: string) => void;
}

export interface UserProps {
  _id?: string;
  clerkId: string;
  name: string;
  email?: string;
  questions?: any;
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
    name?: string;
    email?: string;
    password?: string;
    picture?: string;
  };
  path?: string;
}

export interface ClerkIdProp {
  clerkId: string;
}

export interface ProfileCardProps {
  link: string;
  username: string;
  picture?: string;
  email?: string;
  tags?: string[];
}

export interface TagProps {
  _id: string;
  name: string;
  description?: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

export interface QuestionProps {
  _id?: string;
  title: string;
  content: string;
  tags: TagProps[];
  answers?: string[];
  views?: number;
  upvotes?: string[];
  downvotes?: string[];
  author: UserProps;
  createdAt: Date;
}

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  path: string;
  userId: string;
}

export interface DeleteQuestionParams {
  questionId: string;
  path: string;
}

export interface AnswerTypes {
  _id: string;
  content: string;
  question: string;
  upvotes: string[];
  downvotes: string[];
  author: UserProps;
  createdAt: Date;
}
export interface AnswerProps {
  content: string;
  questionId: string;
  userId: string;
  path: string;
}
export interface AllAnswerParams {
  questionId: string;
  sortQuery: string;
  page?: number;
}
export interface DeleteAnswerPaams {
  answerId: string;
  path: string;
}

export interface VotesProps {
  itemId: string;
  userId: string;
  upVotes: number;
  downVotes: number;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  hasSaved: boolean;
  type: string;
}

export interface VotesParams {
  itemId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
}

export interface ViewQuestionsParams {
  itemId: string;
  userId: string;
  path: string;
}
export interface SavedParams {
  userId: string;
  questionId: string;
  hasSaved: boolean;
  path: string;
}

export interface EmptyProps {
  title: string;
  desecription: string;
  link: string;
  btn: string;
}

export interface TagsPrams {
  tagId: string;
}

export interface TagsDetailProps {
  name: string;
  questions: QuestionProps[];
}

export interface StatsProps {
  totalQuestion: number;
  totalAnswer: number;
  badges: Bagde_Counts;
}

export interface TopTagsType {
  _id: string;
  name: string;
  numberOfQuestions: number;
}

export interface SearchParamsProps {
  searchParams: Promise<{ q: string; filter: string; page?: number }>;
}

export interface FilterProps {
  filterArray: string[];
}

export interface SearchFilterQueryParams {
  searchQuery?: string;
  sortQuery?: string;
  page?: number;
  pageSize?: number;
}

export interface GlobalSearchParams {
  global?: string | null;
  type?: string | null;
}
