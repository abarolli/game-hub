import { AxiosInstance } from "axios";

export default class HTTPService<T> {
  private url: string;
  protected apiClient: AxiosInstance;

  constructor(url: string) {
    this.url = url;
  }

  getAll<ResultType = T>(): Promise<ResultType[]> {
    return this.apiClient
      .get<{ results: ResultType[] }>(this.url)
      .then(({ data }) => data.results);
  }
}
