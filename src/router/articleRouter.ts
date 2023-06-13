import { Context } from 'koa';
import Router from 'koa-router';
import ArticleController from '../controllers/article';
import Product from '../moudels/Product';

module.exports = (router: Router) => {
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
   router.get("/allArticle", ArticleController.allArticle);
   
   /**
   * @openapi
   * /getArticle:
   *   get:
   *     description: Welcome to swagger-jsdoc!
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
   router.get("/getArticle", ArticleController.getArticle);
   router.post("/createArticle", ArticleController.createArticle);
   router.get("/deleteArticle", ArticleController.deleteArticle);
   router.post("/updateArticle", ArticleController.updateArticle);
   router.post("/getArticlePage", ArticleController.getArticlePage);
}
