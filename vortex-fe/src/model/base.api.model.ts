import { apiService } from "@/lib/axios";

export interface BaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
}

export const api = {
  get: <T>(url: string) => apiService.get<T>(url),
  post: <T>(url: string, body: {}) => apiService.post<T>(url, body),
  put: <T>(url: string, body: {}) => apiService.put<T>(url, body),
  delete: <T>(url: string) => apiService.delete<T>(url),
};