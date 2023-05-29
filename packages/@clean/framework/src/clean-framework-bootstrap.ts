import * as dotenv from 'dotenv';
import * as http from 'http';

import { Request } from '@clean/router';

import { Route } from './facades/route.facade';

dotenv.config();

export class CleanFrameworkBootstrap {
  public static start(setup) {
    const { port } = setup;

    const server = http.createServer(
      (request: http.IncomingMessage, response: http.ServerResponse) => {
        try {
          Route.handle(request as Request, response);
        } catch (error) {
          response.writeHead(404);
          response.end('Ruta no encontrada');
        }
      }
    );

    server.listen(port, () => {
      console.log('Servidor iniciado en el puerto ' + port);

      // console.log('http.METHODS', http.METHODS);
      // console.log('http.STATUS_CODES', http.STATUS_CODES);
      console.log(Route.list());
    });
  }
}
