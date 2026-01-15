import { HttpException } from './http.exception.js';

export class UsernameExistException extends HttpException {
  constructor() {
    super('username already in use', 409);
  }
}
