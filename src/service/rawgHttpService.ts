import { AxiosInstance } from "axios";
import HTTPService from "./httpService";

export default class RawgHTTPService<T> extends HTTPService<T> {
  constructor(url: string, apiClient: AxiosInstance) {
    super(url);
    this.apiClient = apiClient;
  }
}
