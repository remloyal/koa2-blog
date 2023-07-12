import { Context } from 'koa';
import sequelize from '../../entity/db';
import Article from '../../moudels/article/article';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { dateFormart, randomStr } from '../../utils/util';

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
    const t = await sequelize.transaction();
    try {
      const record = ctx.request.body;
      // 创建本地md文件
      const yyyyMM = dateFormart('yyyyMM'); // 目录： 年月日
      const lastDir = path.join(__dirname, '../..', `public/markdown/${yyyyMM}`);
      await checkDirExist(lastDir); //code 检查文件夹是否存在如果不存在则新建文件夹
      const route = `/markdown/${yyyyMM}/` + record.name + '.md';

      const filePath = path.join(__dirname, '../..', `public${route}`);
      const state = await createMd(filePath, JSON.parse(record.content));
      if (state == true) {
        const data = await Article.create({
          article_title: record.title,
          article_content: record.content,
          category_id: record.category,
          file_path: route,
        });
        await t.commit();
        ctx.success(data);
      } else {
        await t.rollback();
        ctx.error('文件添加失败');
      }
    } catch (error) {
      await t.rollback();
      ctx.error(error);
    }
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

/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹
 */
function checkDirExist(p: string) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true }); // 递归创建子文件夹
  }
}
/**
 * @description 创建md文件
 */

async function createMd(filePath: fs.PathOrFileDescriptor, content: string | NodeJS.ArrayBufferView) {
  try {
    const data = await createFile(filePath, content);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function createFile(filePath: fs.PathOrFileDescriptor, content: string | NodeJS.ArrayBufferView) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(true);
    });
  });
}
