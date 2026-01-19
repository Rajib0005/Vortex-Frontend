// A placeholder for the login request payload
export interface LoginRequest {
  email?: string;
  password?: string;
}

// A placeholder for the login response data
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
