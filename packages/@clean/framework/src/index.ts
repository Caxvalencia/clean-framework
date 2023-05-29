import dotenv from 'dotenv';
import http from 'http';

import { Route } from './facades/route.facade';
import { Request } from '@clean/router';

dotenv.config();

const port = process.env.PORT || 3000;

// TODO: Redirect::route('locations.index');
// TODO: Route::redirect('/here', '/there');
// TODO: Route::redirect('/here', '/there', 301);
// CLI
// TODO: php artisan route:list

Route.get('/users/:id', (req, res, id) => {
  console.log(`User ID: ${id}`);
});

Route.get('/users/:id', (req, res, id) => {
  console.log(`User ID 2: ${id}`);
});

Route.put('/users/:id', (req, res: any, id) => {
  console.log(`User ID: ${id}`);
  res.end(id);
});

Route.get('/articles/:year/:month/:day/:slug', (req, res: any, year, month, day, slug) => {
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Article Date: ${year}/${month}/${day}, Slug: ${slug}`);
});

// router.handleRoute('/users/123'); // Output: User ID: 123
// router.handleRoute('/articles/2023/02/04/mi-articulo'); // Output: Article Date: 2023/02/04, Slug: mi-articulo

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
  try {
    Route.handle(request as Request, response);
  } catch (error) {
    response.writeHead(404);
    response.end('Ruta no encontrada');
  }
});

server.listen(port, () => {
  console.log('Servidor iniciado en el puerto ' + port);

  // console.log('http.METHODS', http.METHODS);
  // console.log('http.STATUS_CODES', http.STATUS_CODES);

  console.log(Route.list())
});
