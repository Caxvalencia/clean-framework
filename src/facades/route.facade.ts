import { HttpMethod } from '../constants/http-method';
import { Request } from '../interfaces/request';
import { Router } from '../router';

const router = new Router();

export abstract class Route {
  public static get(path: string, callback: (req: Request, res: Response, ...args: any) => void) {
    router.add(HttpMethod.GET, path, callback);
  }
  
  public static put(path: string, callback: (req: Request, res: Response, ...args: any) => void) {
    router.add(HttpMethod.PUT, path, callback);
  }

  public static handle(request: Request, response: any) {
    router.handle(request, response);
  }

  public static list() {
    return router.routes;
  }
}
