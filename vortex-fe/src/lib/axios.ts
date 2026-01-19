import axios, { type AxiosResponse, AxiosError } from 'axios';
import type { BaseResponse } from '@/model/base.api.model';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5180';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<BaseResponse<any>>) => {
    // The interceptor now unwraps the `data` property from the successful response
    if (response.data.success) {
      return response.data.data;
    } else {
      return Promise.reject({
        isBusinessError: true,
        message: response.data.message,
        errors: response.data.errors,
      });
    }
  },
  (error: AxiosError) => {

    if (error.response && error.response.data) {
        const errorData = error.response.data as BaseResponse<null>;
        return Promise.reject({
            isBusinessError: true,
            message: errorData.message || 'An error occurred',
            errors: errorData.errors,
            statusCode: error.response.status
        });
    }
    // Handle network errors or other issues
    return Promise.reject({
      isBusinessError: false,
      message: error.message || 'An unexpected network error occurred',
      statusCode: error.response?.status,
    });
  }
);

export const apiService = {
  get: <T>(url: string, params?: object) => axiosInstance.get<T>(url, { params }),
  post: <T>(url: string, data: any) => axiosInstance.post<T>(url, data),
  put: <T>(url: string, data: any) => axiosInstance.put<T>(url, data),
  patch: <T>(url: string, data: any) => axiosInstance.patch<T>(url, data),
  delete: <T>(url: string) => axiosInstance.delete<T>(url),
};