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
      .then(({ data }) => {
        console.log(data);
        return data.results;
      });
  }

  find<ResultType = T>(queryParams: any) {
    return this.apiClient
      .get<{ results: ResultType[] }>(this.url, { params: queryParams })
      .then(({ data }) => {
        console.log(data);
        return data.results;
      });
  }
}
