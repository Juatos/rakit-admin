export interface SetupHttpOptions {
  baseURL: string
  timeout: number
  formatHeaders: (headers: any) => any
  formatResponse: (response: any) => any
}
