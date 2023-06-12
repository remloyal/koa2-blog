import Koa from 'koa';
import { koaBody } from 'koa-body';
import { FIXED_KEY } from './config/config';
import { publicRouter, privateRouter } from './router/index';
import * as log4js from './utils/log';
import { getIpAddress, getClientIp } from './utils/util';
import http from 'http';
import https from 'https';
import { dbtest } from './entity/db';

// 创建koa实例
const app = new Koa();

app.context.log4js = log4js;
app.use(koaBody());
// logger  中间件
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  // log4js.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
  // const ip = getClientIp(ctx);
  log4js.loggers.resLogger(ctx, ms);
});

app.on('error', (err, ctx) => {
  log4js.loggers.errLogger(err, ctx);
  log4js.error(`server error ${err} ${ctx}`);
});

app.on('close', (err, ctx) => {
  log4js.loggers.errLogger(err, ctx);
  log4js.error(`close ${err} ${ctx}`);
});

app.use(publicRouter.routes()).use(publicRouter.allowedMethods()); // 公共路由
app.use(privateRouter.routes()).use(privateRouter.allowedMethods()); // 私有路由

// 创建服务器
const server: http.Server = new http.Server(app.callback());
server.listen(FIXED_KEY.port, () => {
  const ip = getIpAddress();
  const address = `http://${ip}:${FIXED_KEY.port}`;
  const localAddress = `http://localhost:${FIXED_KEY.port}`;
  dbtest();
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
