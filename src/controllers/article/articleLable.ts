import { Context } from 'koa';
import Lable from '../../moudels/article/lables';

// 文章标签
export default class ArticleLableController {
  // 获取全部
  public static async allLable(ctx: Context) {
    const data = await Lable.findAll();
    await ctx.success(data);
  }
  
}
