import { HttpException } from './http.exception.js';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('invalid credentials', 401);
  }
}
