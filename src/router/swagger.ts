const router = require('koa-router')(); //引入路由函数

import { Context } from 'koa';

import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { publicRouter, privateRouter } from './index';
import { FIXED_KEY } from '../config/config';

const swaggerDefinition = {
  info: {
    title: 'api接口',
    version: '1.0.0',
    description: 'API',
  },
  host: `localhost:${FIXED_KEY.port}`,
  basePath: '/', // Base path (optional)
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, './*.ts')], // 写有注解的router的存放地址, 最好path.join()
};

const swaggerSpec = swaggerJSDoc(options);

// 通过路由获取生成的注解文件
publicRouter.get('/swagger.json', async function (ctx: Context) {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerSpec;
});

privateRouter.get('/swagger.json', async function (ctx: Context) {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerSpec;
});

export {publicRouter, privateRouter}
