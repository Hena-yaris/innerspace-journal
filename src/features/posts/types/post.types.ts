export type NewPostFormProps = {
  categories: string[];
  action: (formData: FormData) => void;
  post?: any;
};

export type SubmitButtonProps = {
  isDraft: boolean;
  isEditing: boolean;
};
