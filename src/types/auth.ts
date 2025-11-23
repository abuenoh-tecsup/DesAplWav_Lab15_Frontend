export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  name?: string;
}

export interface SignUpResponse {
  id: number;
  email: string;
  name?: string;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  roles: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
