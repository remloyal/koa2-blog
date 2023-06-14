import Router from 'koa-router';
import ArticleSortController from '../controllers/articleSort';

export const articleSortRouter = (router: Router) => {
  /**
   * @openapi
   * /private/allSort:
   *   get:
   *     description: Welcome to swagger-jsdoc!
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  router.get('/allSort', ArticleSortController.allSort);
  router.post('/create', ArticleSortController.createSort);
  router.get('/deleteSort', ArticleSortController.deleteSort);
  router.post('/updateSort', ArticleSortController.updateSort);
};
