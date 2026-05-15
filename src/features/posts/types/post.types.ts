export interface Post {
  _id: string;
  title: string;
  slug: string;
  category: string;
  content: any;
  isDraft: boolean;
  createdAt: string;
}





export type NewPostFormProps = {
  categories: string[];
  action: (formData: FormData) => void;
  post?: Post;
};

export type SubmitButtonProps = {
  isDraft: boolean;
  isEditing: boolean;
};
