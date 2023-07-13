import { Context } from 'koa';
import Router from 'koa-router';
import ArticleController from '../controllers/article/article';
import * as ArticleLableController from '../controllers/article/articleTag';
import ArticleSortController from '../controllers/article/articleSort';

export const articleRouter = (router: Router,privateRouter:Router) => {
  // const { controller, router } = app;

  /**
   * @openapi
   * /allArticle:
   *   get:
   *     description: Welcome to swagger-jsdoc!
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  router.get('/allArticle', ArticleController.allArticle);

  /**
   * @openapi
   * /getArticle:
   *   get:
   *     description: Welcome to swagger-jsdoc!
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  router.get('/getArticle', ArticleController.getArticle);
  router.post('/createArticle', ArticleController.createArticle);
  router.get('/deleteArticle', ArticleController.deleteArticle);
  router.post('/updateArticle', ArticleController.updateArticle);
  router.post('/getArticlePage', ArticleController.getArticlePage);

  // 文章分类
  router.get('/allSort', ArticleSortController.allSort);
  router.post('/create', ArticleSortController.createSort);
  router.get('/deleteSort', ArticleSortController.deleteSort);
  router.post('/updateSort', ArticleSortController.updateSort);

  // 文章标签
  router.get('/allTag', ArticleLableController.allTag);
  router.post('/addTag', ArticleLableController.addTag);
  router.delete('/deleteTag', ArticleLableController.deleteTag);
};
