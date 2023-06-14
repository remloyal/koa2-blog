import Koa from 'koa';
import { koaBody } from 'koa-body';
import { FIXED_KEY } from './config/config';
import { publicRouter, privateRouter } from './router/swagger';
import * as log4js from './utils/log';
import { getIpAddress, getClientIp } from './utils/util';
import http from 'http';
import https from 'https';
import staticState from 'koa-static';
import path from 'path';
import cors from 'koa2-cors';

import { dbtest } from './entity/db';

import { koaSwagger } from 'koa2-swagger-ui';
import { reponseBody } from './utils/recover';

// 创建koa实例
const app = new Koa();

app.context.log4js = log4js;

// 注册koa-static中间件
app.use(staticState(path.join(__dirname, '../public')));

app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 2000 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    },
  })
);

app.use(
  reponseBody({
    multipart: true, // 支持文件上传
    encoding: 'gzip',
    formidable: {
      uploadDir: path.join(__dirname, 'public/upload'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 20 * 1024 * 1024, // 文件上传大小
      // onFileBegin: (name: any, file: any) => {
      //   // 文件上传前的设置
      //   console.log(`name: ${name}`);
      //   console.log(file);
      // },
    },
  })
);
app.use(cors());
// logger  中间件
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  // const ip = getClientIp(ctx);
  log4js.loggers.resLogger(ctx, ms);
});

app.on('error', (err, ctx) => {
  log4js.loggers.errLogger(err, ctx);
});

app.on('close', (err, ctx) => {
  log4js.loggers.errLogger(err, ctx);
});

app.use(publicRouter.routes()).use(publicRouter.allowedMethods()); // 公共路由
app.use(privateRouter.routes()).use(privateRouter.allowedMethods()); // 私有路由

app.use(
  koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: {
      url: '/swagger.json', // example path to json 其实就是之后swagger-jsdoc生成的文档地址
    },
  })
);

// 创建服务器
const server: http.Server = new http.Server(app.callback());
server.listen(FIXED_KEY.port, async () => {
  const ip = getIpAddress();
  const address = `http://${ip}:${FIXED_KEY.port}`;
  const localAddress = `http://localhost:${FIXED_KEY.port}`;
  await dbtest();
  log4js.info(`app started at address \n\n${localAddress}\n\n${address}`);
});

// https
// const servers: https.Server = new https.Server(app.callback());
// servers.listen(FIXED_KEY.httpsPort, () => {
//   const ip = getIpAddress();
//   const address = `https://${ip}:${FIXED_KEY.httpsPort}`;
//   const localAddress = `https://localhost:${FIXED_KEY.httpsPort}`;
//   log4js.info(`app started at address \n\n${localAddress}\n\n${address}`);
// });

module.exports = app;
