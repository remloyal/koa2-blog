import { Context } from 'koa';
import Router from 'koa-router';
import UserController from '../controllers/user';

// -------------公共路由(无需token校验)-----------------------
const publicRouter = new Router();
publicRouter.prefix('/');
publicRouter.get('/', (ctx: Context) => {
  ctx.body = 'This is home';
});

require('./articleRouter')(publicRouter);
require('./articleSortRouter')(publicRouter);

// --------------私有路由(需token校验)----------------------
const privateRouter = new Router();
privateRouter.prefix('/private');
privateRouter.get('/', (ctx: Context) => {
  ctx.body = 'This is private';
});

export { publicRouter, privateRouter };
