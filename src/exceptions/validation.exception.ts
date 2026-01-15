import { HttpException } from './http.exception.js';

export class ValidationException extends HttpException {
  constructor(details?: unknown) {
    super('validation error', 400, details);
  }
}
