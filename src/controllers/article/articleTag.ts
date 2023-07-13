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
  const id = ctx.query.id;
  try {
    const data = await Tag.findOne({
      where: {
        tag_id: id,
      },
    });
    if (data) {
      data.destroy();
      await t.commit();
      ctx.success(null, '数据删除成功');
    } else {
      await t.rollback();
      ctx.fail('数据删除失败');
    }
  } catch (error) {
    await t.rollback();
    ctx.error(error);
  }
};
