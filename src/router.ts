import { HttpMethod } from './constants/http-method';
import { Request } from './interfaces/request';

type RouteProvider = {
  regex: RegExp;
  callback: Function;
  duplicated: boolean;
};

type RouteMap = Map<HttpMethod, RouteProvider[]>;

export class Router {
  routes: RouteMap;

  constructor() {
    this.routes = new Map<HttpMethod, RouteProvider[]>();
  }

  public add(method: HttpMethod = HttpMethod.GET, path: string, callback: (req: any, res: any, ...args: any) => void) {
    const regex = new RegExp(`^${path.replace(/:\w+/g, '([a-zA-Z0-9\\-]+)')}$`);
    const route = { regex, callback, duplicated: false };

    if (!this.routes.has(method)) {
      this.routes.set(method, [route]);

      return;
    }

    const routes = this.routes.get(method)!;
    const routeIndexFound = routes.findIndex((route) => route.regex.toString() === regex.toString());

    if (routeIndexFound !== -1) {
      route.duplicated = true;
      routes[routeIndexFound] = route;

      return;
    }

    routes.push(route);
  }

  public handle(request: Request, response: any) {
    const method = HttpMethod[request.method];
    const path = request.url;
    let params: unknown[] | undefined;

    const route = this.routes.get(method)?.find((route) => {
      const matches = path.match(route.regex);

      if (!matches) {
        return false;
      }

      params = matches.slice(1);

      return true;
    });

    console.log(route, path, params);

    if (route) {
      response.setHeader('X-Powered-By', 'Cax');

      return route.callback(request, response, ...params!);
    }

    throw new Error('Route not found');
  }
}
