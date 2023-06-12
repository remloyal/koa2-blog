import log4js from 'log4js';
import path from 'path';
import { Context } from 'koa';

const levels = {
  trace: log4js.levels.TRACE,
  debug: log4js.levels.DEBUG,
  info: log4js.levels.INFO,
  warn: log4js.levels.WARN,
  error: log4js.levels.ERROR,
  fatal: log4js.levels.FATAL,
};

log4js.addLayout('json', function (config) {
  return function (logEvent) {
    return JSON.stringify(logEvent) + config.separator;
  };
});

log4js.configure({
  appenders: {
    console: { type: 'console' },
    info: {
      type: 'dateFile',
      filename: path.join('logs/', 'info/info'),
      encoding: 'utf-8',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      layout: { type: 'json', separator: ',' },
      maxLogSize: 104800,
      backups: 100,
    },
    error: {
      type: 'dateFile',
      filename: path.join('logs/', 'error/error'),
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true, // 设置文件名称为 filename + pattern
      layout: { type: 'json', separator: ',' },
      maxLogSize: 104800,
      backups: 100,
    },
    database: {
      type: 'dateFile',
      filename: path.join('logs/', 'database/db'),
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true, // 设置文件名称为 filename + pattern
      layout: { type: 'json', separator: ',' },
      maxLogSize: 104800,
      backups: 100,
    },
    application: {
      type: 'dateFile',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join('logs/', 'application/application'),
      layout: { type: 'json', separator: ',' },
      maxLogSize: 104800,
      backups: 100,
    },
    // 响应日志
    response: {
      type: 'dateFile',
      category: 'resLogger',
      filename: path.join('logs/', 'responses/response'),
      pattern: 'yyyy-MM-dd.log', //日志输出模式
      alwaysIncludePattern: true,
      maxLogSize: 104800,
      backups: 100,
      layout: { type: 'json', separator: ',' },
    },
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'debug',
    },
    info: {
      appenders: ['info', 'console'],
      level: 'info',
    },
    error: {
      appenders: ['error', 'console'],
      level: 'error',
    },
    database: {
      appenders: ['database', 'console'],
      level: 'info',
    },
    response: {
      appenders: ['response', 'console'],
      level: 'info',
    },
    application: {
      appenders: ['application'],
      level: 'all',
    },
  },
});

/**
 * 日志输出 level为bug
 * @param { string } content
 */
export const debug = (content: string) => {
  let logger = log4js.getLogger('debug');
  logger.level = levels.debug;
  logger.debug(content);
};

/**
 * 日志输出 level为info
 * @param { string } content
 */
export const info = (content: string) => {
  let logger = log4js.getLogger('info');
  logger.level = levels.info;
  logger.info(content);
};

/**
 * 日志输出 数据库
 * @param { string } content
 */
 export const db = (content: string) => {
  let logger = log4js.getLogger('database');
  logger.level = levels.info;
  logger.info(content);
};


/**
 * 日志输出 level为error
 * @param { string } content
 */
export const error = (content: string) => {
  let logger = log4js.getLogger('error');
  logger.level = levels.error;
  logger.error(content);
};

export { log4js };

const formatError = (ctx: { request?: any; state?: any; method?: any; url?: any }, err: any) => {
  const { method, url } = ctx;
  let body = ctx.request.body;
  const user = ctx.state.user;
  return { method, url, body, user, err };
};

const formatRes = (ctx: { request: any; state?: any; method?: any; url?: any; response?: any }, costTime: any) => {
  const {
    method,
    url,
    response: {
      status,
      message,

      // body: { success },
    },
    request: {
      header: { authorization },
    },
  } = ctx;
  let body = ctx.request.body;
  const user = ctx.state.user;
  return { method, url, user, body, costTime, authorization, response: { status, message } };
};

let errorLogger = log4js.getLogger('error');
let resLogger = log4js.getLogger('response');

export const loggers = {
  // 封装错误日志
  errLogger: (ctx: Context, error: any) => {
    if (ctx && error) {
      errorLogger.error(formatError(ctx, error));
    }
  },
  // 封装响应日志
  resLogger: (ctx: Context, resTime: any) => {
    if (ctx) {
      resLogger.info(formatRes(ctx, resTime));
    }
  },
};
