import { Context, Next } from 'koa';

/**
 * responseBody.js
 * @description 统一接口返回格式
 * @param {*} option
 */
export const reponseBody = (option = {}) => {
  return async (ctx: Context, next: Next) => {
    ctx.success = (data: any, message?: string) => {
      ctx.status = 200;
      ctx.body = {
        data: data ?? null,
        code: 200,
        msg: message || '数据请求成功',
      };
    };

    ctx.fail = (message?: string) => {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        msg: message || '数据请求失败',
      };
    };

    ctx.error = (message?: string) => {
      ctx.status = 500;
      ctx.body = {
        code: 500,
        msg: message || '服务器异常',
      };
    };

    ctx.absent = (message?: string) =>{
      ctx.status = 200;
      ctx.body = {
        code: 403,
        msg: message || '数据不存在或更新失败',
      };
    }
    ctx.list = (count: number, row: any, size: number, page: any) => {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '数据请求成功',
        data: {
          current: page,
          pages: Math.ceil(count / size),
          size: size,
          total: count,
          records: row,
        },
      };
    };

    ctx.errorList = (count: number, row: any, size: number, page: any) => {
      ctx.status = 403;
      ctx.body = {
        code: 403,
        msg: '成功',
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
