export interface HttpResponse<T> {
  data: { result: T };
}

export interface LoginResponse {
  id: string;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
}

export interface TextFieldData {
  id: string;
  text?: string;
  label: string;
  type: string;
  placeholder?: string;
  name?: string;
  required: boolean;
}

export interface ValidateRule {
  rule: string | RegExp;
  match: boolean;
  test?: (text: string) => boolean;
  message: string;
}
