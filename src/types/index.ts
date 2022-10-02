export interface HttpResponse<T> {
  data: { result: T };
}

export interface LoginResponse {
  id: string;
  token: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface SignUpData {
  name: string;
  id: string;
  password: string;
  email: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
}

export interface FieldData {
  id: string;
  label: string;
  required?: boolean;
  text?: string;
}

export interface TextFieldData extends FieldData {
  type: string;
  placeholder?: string;
  name?: string;
}

export type AddressFieldData = FieldData;

export interface ValidateRule {
  rule: string | RegExp;
  match: boolean;
  test?: (text: string) => boolean;
  message: string;
}

export type DaumAddress = {
  roadAddress: string;
  sigunguCode: string;
};
