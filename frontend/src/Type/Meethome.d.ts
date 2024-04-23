export interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  writer: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: Article[] | null;
}

export interface ApiResponseContextType {
  feedData: ApiResponse;
  setFeedData: React.Dispatch<React.SetStateAction<ApiResponse>>;
}
