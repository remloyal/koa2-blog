import { Context } from 'koa';
import sequelize from '../../entity/db';
import { Lable, Tag } from '../../moudels/article/lables';

// 文章标签

// 获取全部
export const allTag = async (ctx: Context) => {
  const data = await Lable.findAll();
  await ctx.success(data);
};

// 添加标签
export const addTag = async (ctx: Context) => {
  const t = await sequelize.transaction();
  try {
    const record: { tag_name: string; tag_describe?: string } = ctx.request.body;

    const data = await Tag.create({
      tag_name: record.tag_name,
      tag_describe: record.tag_describe || '一个简单的标签',
    });

    await t.commit();
    await ctx.success(data);
  } catch (error) {
    await t.rollback();
    ctx.error(error);
  }
};

// 根据id删除标签
export const deleteTag = async (ctx: Context) => {
  const t = await sequelize.transaction();
  const id: string = ctx.query.id as string;
  try {
    const ids = id.split(',');
    const data = await Tag.destroy({
      where: {
        tag_id: ids,
      },
    });
    if (data > 0) {
      await t.commit();
      ctx.success(null, '数据删除成功');
    } else {
      await t.rollback();
      ctx.absent();
    }
  } catch (error) {
    await t.rollback();
    ctx.error(error);
  }
};

// 分页查询标签
export const queryTags = async (ctx: Context) => {
  const record: { page: number; size: number } = ctx.request.body;
  try {
    const { count, rows } = await Tag.findAndCountAll({
      // where: {
      //   article_id: id,
      // },
      offset: ( Number(record.page) - 1) * Number(record.size),
      limit: Number(record.size),
      attributes: {
        exclude: ['id'], // 排除的字段名
      },
      // order: [['id']],
    });
    await ctx.list(count, rows, record.size, record.page);
  } catch (error) {
    ctx.error(error);
  }
};

// 更新单个标签
export const updateTag = async (ctx: Context) => {
  const record: { tag_name: string; tag_describe?: string; id: string } = ctx.request.body;
  try {
    const data = await Tag.findOne({
      where: {
        tag_id: record.id,
      },
    });

    if (!data) {
      return await ctx.absent('数据不存在');
    }
    const updateObject: any = {
      tag_name: record.tag_name,
    };
    if (record.tag_describe) {
      updateObject.tag_describe = record.tag_describe;
    }
    let numAffectedRows, affectedRows;
    try {
      const t = await sequelize.transaction();
      [numAffectedRows, affectedRows] = await Tag.update(updateObject, {
        where: {
          tag_id: record.id,
        },
        returning: true, // 返回被更新的记录
        transaction: t,
      });
      await t.commit();
    } catch (error) {
      return await ctx.absent('数据更新失败');
    }
    if (numAffectedRows === 0 || !affectedRows) {
      return await ctx.absent('数据更新失败');
    }

    await ctx.success(null, '数据更新成功');
  } catch (error) {
    ctx.error(error);
  }
};