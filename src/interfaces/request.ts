import { HttpMethod } from '../constants';

export interface Request {
  method: keyof typeof HttpMethod;
  url: string;
}
