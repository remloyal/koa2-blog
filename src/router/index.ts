import { Context } from 'koa';
import Router from 'koa-router';
import { articleRouter } from './articleRouter';
import { resourceRouter } from './resourceRouter';

// -------------公共路由(无需token校验)-----------------------

const publicRouter = new Router();
publicRouter.prefix('/');
publicRouter.get('/', (ctx: Context) => {
  ctx.body = 'This is home';
});

const routers = [articleRouter, resourceRouter];

// --------------私有路由(需token校验)----------------------
const privateRouter = new Router();
privateRouter.prefix('/private');
privateRouter.get('/', (ctx: Context) => {
  ctx.body = 'This is private';
});

for (let index = 0; index < routers.length; index++) {
  routers[index](publicRouter, privateRouter);
}

export { publicRouter, privateRouter };
