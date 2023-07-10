import sequelize from '../../entity/db';
import { Model, DataTypes } from 'sequelize';
import { randomStr } from '../../utils/util';
import dayjs from 'dayjs';

const Links = sequelize.define(
  "rem_links",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键ID',
    },
    link_id: {
      type: DataTypes.STRING,
      defaultValue: function () {
        return randomStr();
      },
      allowNull: true,
      comment: '唯一id',
    },
    site_name: {
      type: DataTypes.STRING(55),
      comment: "网站名称",
    },
    site_desc: {
      type: DataTypes.STRING, // STRING 默认255
      comment: "网站描述",
    },
    site_avatar: {
      type: DataTypes.STRING(555), // STRING 默认255
      comment: "网站头像",
    },
    url: {
      type: DataTypes.STRING, // STRING 默认255
      comment: "网站地址",
    },
    status: {
      type: DataTypes.INTEGER, // STRING 默认255
      comment: "友链状态 1 待审核 2 审核通过",
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return dayjs(this.getDataValue("createdAt")).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return dayjs(this.getDataValue("updatedAt")).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  },
  {
    freezeTableName: true, // 强制表名不转复数
  }
);
