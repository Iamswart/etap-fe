import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    },
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

class APIClient {
  endpoint: string;
  axiosInstance: AxiosInstance;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.axiosInstance = createAxiosInstance();
  }

  getAll<R = any>(config?: AxiosRequestConfig) {
    return this.axiosInstance
      .get<R>(this.endpoint, config)
      .then((res) => res.data);
  }

  get<R = any>(id: number | string, config?: AxiosRequestConfig) {
    return this.axiosInstance
      .get<R>(`${this.endpoint}/${id}`, config)
      .then((res) => res.data);
  }

  getWithQuery<R = any>(
    query: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance
      .get<R>(`${this.endpoint}?${query}`, config)
      .then((res) => res.data);
  }

  post<T, R = T>(data: T, config?: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance
      .post<R>(this.endpoint, data, config)
      .then((res) => res.data);
  }

  put<T, R = T>(id: number | string, data: T, config?: AxiosRequestConfig) {
    return this.axiosInstance
      .put<R>(`${this.endpoint}/${id}`, data, config)
      .then((res) => res.data);
  }

  patch<T, R = T>(data: T, config?: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance
      .patch<R>(this.endpoint, data, config)
      .then((res) => res.data);
  }

  delete<R = any>(id: number | string, config?: AxiosRequestConfig) {
    return this.axiosInstance
      .delete<R>(`${this.endpoint}/${id}`, config)
      .then((res) => res.data);
  }
}

export default APIClient;
