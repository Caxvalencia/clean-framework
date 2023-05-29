import { HttpMethod, Router } from '../src';

describe('@clean/router: Router', () => {
  const router = new Router();

  describe('Http method GET', () => {
    it('should to be null', () => {
      const callback = () => {};

      router.add(HttpMethod.PUT, 'test', callback);

      expect(router.routes.has(HttpMethod.GET)).toBeFalsy();
    });

    it('should work', () => {
      const callback = () => {};

      router.add(HttpMethod.GET, 'test', callback);

      expect(router.routes.has(HttpMethod.GET)).toBeTruthy();
    });
  });
});
