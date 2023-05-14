export interface IBaseRespose<T> {
  code: number;
  message: string;
  data: T;
}

export class BasePage {
  public size = 4;
  public page = 1;
}

export interface IBaseList<T> {
  list: T[];
  pagination: {
    page: number;
    size: number;
    total: number;
  };
}
