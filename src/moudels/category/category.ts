import { sequelize } from '../../entity/db';
import { Model, DataTypes } from 'sequelize';
import { randomStr } from '../../utils/util';
import dayjs from 'dayjs';

const Category = sequelize.define(
  'rem_category',
  {
    category_id: { type: DataTypes.STRING, defaultValue: () => randomStr(), allowNull: true },
    category_name: {
      type: DataTypes.STRING(55),
      allowNull: false,
      unique: true,
      comment: '分类名称 唯一',
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
    freezeTableName: true, // 强制表名不转复数
  }
);

// Category.sync({ alter: true }) //同步数据表

module.exports = Category;
