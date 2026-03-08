export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface UserDetails {
  id: string;
  fullName: string | null;
  email: string | null;
  userName: string | null;
  isActive: boolean;
  isEmailConfirmed: boolean;
  roleId: string;
  roleName: string;
}

export interface UserToInvite {
  userId: string;
  userEmail: string;
}
