import { CleanFrameworkBootstrap, Route } from '@clean/framework';

// TODO: Redirect::route('locations.index');
// TODO: Route::redirect('/here', '/there');
// TODO: Route::redirect('/here', '/there', 301);
// CLI
// TODO: clean run route:list

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

Route.get(
  '/articles/:year/:month/:day/:slug',
  (req, res: any, year, month, day, slug) => {
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Article Date: ${year}/${month}/${day}, Slug: ${slug}`);
  }
);

// router.handleRoute('/users/123'); // Output: User ID: 123
// router.handleRoute('/articles/2023/02/04/mi-articulo'); // Output: Article Date: 2023/02/04, Slug: mi-articulo

CleanFrameworkBootstrap.start({
  port: process.env.PORT || 3000,
});
