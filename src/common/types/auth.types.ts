export interface AuthData {
  token: string;
}

export interface AuthResponse {
  status: boolean;
  data: AuthData;
}

export interface RegisterResponse {
  status: boolean;
  data: AuthData;
}

export type SignInState = {
  isLoading: boolean;
  hasSignInError: boolean;
};

export type RegisterState = {
  isLoading: boolean;
  hasSignInError: boolean;
};
