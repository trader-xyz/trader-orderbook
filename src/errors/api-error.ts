export interface IAPIError {
  errorCode: string
  errorMessage: string
}

const createApiError = (code: unknown, message: string): IAPIError => ({
  errorCode: code as string,
  errorMessage: message,
})

export { createApiError }
