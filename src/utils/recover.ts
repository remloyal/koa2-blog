import { Context, Next } from 'koa';

/**
 * responseBody.js
 * @description 统一接口返回格式
 * @param {*} option
 */
export const reponseBody = (option = {}) => {
  return async (ctx: Context, next: Next) => {
    ctx.success = (data: any, message?: string) => {
      ctx.body = {
        data: data ?? null,
        code: 200,
        message: message || '数据请求成功',
      };
    };

    ctx.fail = (message?: string) => {
      ctx.body = {
        code: 400,
        message: message || '数据请求失败',
      };
    };

    ctx.error = (message?: string) => {
      ctx.body = {
        code: 500,
        message: message || '服务器异常',
      };
    };

    ctx.error = (count: number, row: any, size: number, page: any) => {
      ctx.body = {
        code: 200,
        message: '成功',
        data: {
          current: page,
          pages: Math.ceil(count / size),
          size: size,
          total: count,
          records: row,
        },
      };
    };

    await next();
  };
};