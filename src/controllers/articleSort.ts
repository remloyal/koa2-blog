import { Context } from 'koa';
import ArticleSort from '../moudels/article/article_sort';

// 文章分类
export default class ArticleSortController {
  // 获取全部
  public static async allSort(ctx: Context) {
    const data = await ArticleSort.findAll();
    await ctx.success(data);
  }

  //添加
  public static async createSort(ctx: Context) {
    const { lable_name, lable_alias, lable_description } = ctx.request.body;
    const data = await ArticleSort.create({
      lable_name,
      lable_alias,
      lable_description,
    });
    ctx.success(data, '数据添加成功');
  }

  // 删除
  public static async deleteSort(ctx: Context) {
    const id = ctx.query.id;
    const data = await ArticleSort.findOne({
      where: {
        lable_id: id,
      },
    });
    if (data) {
      data.destroy();
      ctx.success(null, '数据删除成功');
    } else {
      ctx.fail('数据删除失败');
    }
  }

  // 更新
  public static async updateSort(ctx: Context) {
    const record = ctx.request.body;
    const data = await ArticleSort.findOne({
      where: {
        lable_id: record.lable_id,
      },
    });
    if (data) {
      await data.update({ ...record });
      await ctx.success(data, '数据更新成功');
    } else {
      await ctx.success(data, '未查找到该标签');
    }
  }
}
