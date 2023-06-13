import { Context } from 'koa';


export default class UserController {
  
  public static async listUsers(ctx: Context) {
    ctx.body = 'This is listUsers';
  }
}
