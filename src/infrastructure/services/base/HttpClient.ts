import { api } from "./APIConfig";

export class HttpClient {
  static async post<TRequest extends object, TResponse = any>(
    method: string,
    body?: TRequest
  ): Promise<TResponse> {
    try {
      const response = await api.post<TResponse>(method, body, {
        timeout: 5000,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async get<TResponse = any>(method: string): Promise<TResponse> {
    try {
      const response = await api.get<TResponse>(method, { timeout: 5000 });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
