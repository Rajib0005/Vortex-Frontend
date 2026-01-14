import axios, { type AxiosResponse, AxiosError } from 'axios';
import type { BaseResponse } from '@/model/base.api.model';

const baseURL = import.meta.env.BASE_URL || 'http://localhost:5180';

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse<BaseResponse<any>>) => {

    const apiResponse = response.data;

    if (apiResponse.success) {
      return response;
    } else {
      return Promise.reject({
        isBusinessError: true,
        message: apiResponse.message,
        errors: apiResponse.errors,
      });
    }
  },
  (error: AxiosError) => {
    return Promise.reject({
      isBusinessError: false,
      message: error.message || 'An unexpected error occurred',
      statusCode: error.response?.status,
    });
  }
);

export default apiClient;