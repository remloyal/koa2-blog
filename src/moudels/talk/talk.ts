import { sequelize } from '../../entity/db';
import { Model, DataTypes } from 'sequelize';
import { randomStr } from '../../utils/util';
import dayjs from 'dayjs';

const Talk = sequelize.define(
  'blog_talk',
  {
    talk_id: { type: DataTypes.STRING, defaultValue: () => randomStr(), allowNull: true },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '说说内容',
    },
    nick_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '发说说的人',
    },
    avatar: {
      type: DataTypes.STRING(555),
      allowNull: true,
      comment: '头像',
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      comment: '说说状态 1 公开 2 私密 3 回收站',
    },
    is_top: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2,
      comment: '是否置顶 1 置顶 2 不置顶',
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

// Talk.sync({ alter: true }) // 同步数据库表

module.exports = Talk;
