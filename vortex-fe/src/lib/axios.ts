import axios, { type AxiosResponse, AxiosError } from 'axios';
import type { BaseResponse } from '@/model/base.api.model';
import { toast } from 'sonner';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:5180';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<BaseResponse<any>>) => {
    // The interceptor now returns the full BaseResponse object
    if (response.data.success) {
      if (response.config.method !== 'get' && response.data.message) {
        toast.success(response.data.message);
      }
      return response.data as any;
    } else {
      const message = response.data.message || 'Operation failed';
      toast.error(message);
      return Promise.reject({
        isBusinessError: true,
        message: message,
        errors: response.data.errors,
      });
    }
  },
  (error: AxiosError) => {
    let message = 'An unexpected error occurred';
    let errors: string[] | undefined;
    let isBusinessError = false;

    if (error.response && error.response.data) {
      const errorData = error.response.data as BaseResponse<null>;
      message = errorData.message || 'An error occurred';
      errors = errorData.errors;
      isBusinessError = true;
    } else {
      message = error.message || 'An unexpected network error occurred';
    }

    toast.error(message);

    return Promise.reject({
      isBusinessError,
      message,
      errors,
      statusCode: error.response?.status
    });
  }
);

export const apiService = {
  get: <T>(url: string, params?: object) =>
    axiosInstance.get<BaseResponse<T>>(url, { params }) as unknown as Promise<BaseResponse<T>>,
  post: <T>(url: string, data: any) =>
    axiosInstance.post<BaseResponse<T>>(url, data) as unknown as Promise<BaseResponse<T>>,
  put: <T>(url: string, data: any) =>
    axiosInstance.put<BaseResponse<T>>(url, data) as unknown as Promise<BaseResponse<T>>,
  patch: <T>(url: string, data: any) =>
    axiosInstance.patch<BaseResponse<T>>(url, data) as unknown as Promise<BaseResponse<T>>,
  delete: <T>(url: string) =>
    axiosInstance.delete<BaseResponse<T>>(url) as unknown as Promise<BaseResponse<T>>,
};