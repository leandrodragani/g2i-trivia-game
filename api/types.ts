enum ResponseCode {
  SUCCESS = 0,
  NO_RESULTS = 1,
  INVALID_PARAMETER = 2,
  TOKEN_NOT_FOUND = 3,
  TOKEN_EMPTY = 4,
}

export type Difficulty = "easy" | "medium" | "hard";

export type GameType = "boolean" | "multiple";

export interface Result {
  category: string;
  correct_answer: string;
  difficulty: Difficulty;
  incorrect_answers: string[];
  question: string;
  type: GameType;
}

export interface Category {
  id: number;
  name: string;
}

export interface CategoryCount {
  category_id: number;
  category_question_count: {
    total_question_count: number;
    total_easy_question_count: number;
    total_medium_question_count: number;
    total_hard_question_count: number;
  };
}

export interface CategoryResponse {
  trivia_categories: Category[];
}

export interface Response<T> {
  response_code: ResponseCode;
  results: T[];
}
