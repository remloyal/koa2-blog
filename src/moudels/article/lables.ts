import sequelize from '../../entity/db';
import { Model, DataTypes } from 'sequelize';
import dayjs from 'dayjs';
import { randomStr } from '../../utils/util';
import Article from './article';

const { STRING, INTEGER } = DataTypes;

export const Lable = sequelize.define(
  'rem_lable',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    //   标签id
    lable_id: { type: DataTypes.STRING, defaultValue: () => randomStr(), allowNull: true },
    //   文章id
    acticle_id: { type: STRING, allowNull: false },
    label_name: { type: STRING, allowNull: false },
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

export const Tag = sequelize.define(
  'rem_tag',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tag_id: { type: DataTypes.STRING, defaultValue: () => randomStr(), allowNull: true },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '标签名称',
    },
    tag_describe: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '一个简单的标签',
      comment: '标签描述',
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

Article.belongsToMany(Lable, { through: 'rem_article_categories' });
Lable.belongsToMany(Article, { through: 'rem_article_categories' });
