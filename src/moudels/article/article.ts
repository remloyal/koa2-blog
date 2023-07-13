import sequelize from '../../entity/db';
import { Model, DataTypes } from 'sequelize';
import { randomStr } from '../../utils/util';
import dayjs from 'dayjs';

const Article = sequelize.define(
  'rem_article',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    article_id: { type: DataTypes.STRING, defaultValue: () => randomStr(), allowNull: true },
    //   标题
    article_title: { type: DataTypes.STRING, allowNull: false, comment: '文章标题 不能为空' },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '分类id 不能为空',
    },
    article_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '文章内容',
    },
    article_description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '文章描述',
    },

    article_cover: {
      type: DataTypes.STRING(1234),
      allowNull: true,
      defaultValue: '	https://mrzym.gitee.io/blogimg/html/rabbit.png',
      comment: '文章缩略图',
    },
    is_top: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
      comment: '是否置顶 1 置顶 2 取消置顶',
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '文章状态  1 公开 2 私密 3 草稿箱',
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '文章类型 1 原创 2 转载 3 翻译',
    },
    view_times: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '文章访问次数',
    },
    thumbs_up_times: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '文章点赞次数',
    },
    reading_duration: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      comment: '文章阅读时长',
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '文章路径',
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return dayjs(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return dayjs(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  },
  {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: true,
  }
);

export default Article;
