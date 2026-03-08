import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  nameid?: string;
  email?: string;
  unique_name?: string;
  role?: string | string[];
  nbf?: number;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const getUserRole = (userRole: string | string[] | null): string | string[] | null => {
  if (!userRole) return null;
  const roles = userRole;

  if (Array.isArray(roles)) {
    const uniqueRoles = Array.from(new Set(roles));
    return uniqueRoles.length === 1 ? uniqueRoles[0] : uniqueRoles;
  }

  return roles;
};
