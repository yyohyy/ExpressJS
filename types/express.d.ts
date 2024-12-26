import { Request } from 'express';
import { CustomUser } from './custom';

export {};

declare global {
  namespace Express {

    export interface User {
      id: string
      role: string
      password: string
    }
    export interface Request {
      user?: CustomUser; 
    }
  }
}




