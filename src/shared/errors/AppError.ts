export class AppError implements Error {
  constructor(public name: string, public message: string, public statusCode: number) {
    this.name = name
    this.message = message
    this.statusCode = statusCode
  }
}