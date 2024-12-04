export interface Progress {
  _id?: string;
  resource_id?: string;
  user_id?: string;
  is_completed: boolean;
  is_unlocked: boolean;
  score: number;
  time_spent: number;
}
export interface Resource {
  _id?: string;
  title: string;
  type: string;
  url: string;
  duration: number;
  description: string;
  resource_type: string;
  progress: Progress;
  isActive: boolean;
}
export interface Module {
  _id?: string;
  title: string;
  resources: Resource[];
  isActive: boolean;
}
export interface Course {
  _id: string;
  title: string;
  user_id?: string;
  learning_path_id?: string;
  description: string;
  learning_outcomes: string[];
  level: 'easy' | 'medium' | 'high';
  modules: Module[];
  original_price: string;
  sale_price: string;
  thumbnail: File | null;
  has_certificate: boolean;
  isActive: boolean;
  isFree: boolean;
}
