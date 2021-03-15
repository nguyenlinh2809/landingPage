export class ResponseModel<T> {
  constructor(public data: T[] | T, public status: string, public message: string) {}
}
