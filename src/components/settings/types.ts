export interface ProfileFormData {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  role: string;
}

export interface ProfileFormProps {
  userId: string;
  initialData?: {
    full_name?: string;
    phone_number?: string;
    email?: string;
    role?: string;
  };
  onUpdate?: (data: ProfileFormData) => void;
}