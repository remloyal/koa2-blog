import sequelize from '../../entity/db';
import { Model, DataTypes } from 'sequelize';
import { randomStr } from '../../utils/util';
import dayjs from 'dayjs';

const Tag = sequelize.define(
  'rem_tag',
  {
    tag_id: { type: DataTypes.STRING, defaultValue: () => randomStr(), allowNull: true },
    tag_name: {
      type: DataTypes.STRING(55),
      allowNull: false,
      unique: true,
      comment: '标签名称 唯一',
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

// Tag.sync({ alter: true }) // 同步数据库表

module.exports = Tag;
