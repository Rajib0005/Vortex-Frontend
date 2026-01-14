import apiClient from "@/lib/axios";

export interface BaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
}

const responseBody = <T>(response: { data: BaseResponse<T> }) => response.data;

export const api = {
  get: <T>(url: string) => apiClient.get<BaseResponse<T>>(url).then(responseBody),
  post: <T>(url: string, body: {}) => apiClient.post<BaseResponse<T>>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => apiClient.put<BaseResponse<T>>(url, body).then(responseBody),
  delete: <T>(url: string) => apiClient.delete<BaseResponse<T>>(url).then(responseBody),
};