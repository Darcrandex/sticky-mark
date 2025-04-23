declare namespace API {
  type NextContext<T extends Record<string, string> = any> = { params: Promise<T> }

  interface Result<T = any> {
    message: string
    data: T
  }
}
