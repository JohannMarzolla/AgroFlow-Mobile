import { api } from "./APIConfig";

export class HttpClient {
  static async post<TRequest extends any, TResponse = any>(
    method: string,
    body?: TRequest
  ): Promise<TResponse> {
    try {
      const response = await api.post<TResponse>(method, body, {
        timeout: 15000,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async get<TResponse = any>(endpoint: string): Promise<TResponse> {
    try {
      console.log(`GET: ${endpoint}`);
      const response = await api.get<TResponse>(endpoint, { timeout: 15000 });
      return response.data;
    } catch (error) {
      console.error(`GET Error (${endpoint}):`, error);
      throw error;
    }
  }
}
