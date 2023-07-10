import { Context } from 'koa';
import Article from '../moudels/article/article';

// 文章分类
export default class ArticleController {
  // 获取全部
  public static async allArticle(ctx: Context) {
    const data = await Article.findAll();
    await ctx.success(data);
  }

  // 单个获取详情
  public static async getArticle(ctx: Context) {
    const id = ctx.query.id;
    const data = await Article.findOne({
      where: {
        article_id: id,
      },
    });
    await ctx.success(data);
  }

  // 分页查询
  public static async getArticlePage(ctx: Context) {
    // const id = ctx.query.id;
    const record: { page: number; size: number } = ctx.request.body;

    const { count, rows } = await Article.findAndCountAll({
      // where: {
      //   article_id: id,
      // },
      offset: (record.page - 1) * record.size,
      limit: record.size,
      // order: [['id']],
    });
    await ctx.list(count, rows, record.size, record.page);
  }

  //添加
  public static async createArticle(ctx: Context) {
    const record = ctx.request.body;

    const data = await Article.create({
      article_title:record.title,
      article_content:record.content,
      category_id:record.category,
    });

    

    ctx.success(data);
  }

  // 删除
  public static async deleteArticle(ctx: Context) {
    const id = ctx.query.id;
    const data = await Article.findOne({
      where: {
        article_id: id,
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
  public static async updateArticle(ctx: Context) {
    const record = ctx.request.body;
    const data = await Article.findOne({
      where: {
        article_id: record.article_id,
      },
    });
    // record.updateAt = new Date();
    if (data) {
      await data.update({ ...record });
      await ctx.success(null, '数据更新成功');
    } else {
      await ctx.success(data, '数据更新失败');
    }
  }
}
