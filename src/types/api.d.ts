declare namespace API {
  interface Result<T = any> {
    message: string
    data: T
  }
}
