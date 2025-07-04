import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.get(url, config);
  return response.data;
};

const post = async <T, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.post(
    url,
    data,
    config
  );
  return response.data;
};

const put = async <T, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.put(url, data, config);
  return response.data;
};

const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.delete(url, config);
  return response.data;
};

const api = {
  get,
  post,
  put,
  delete: del,
  instance: axiosInstance,
};

export default api;
