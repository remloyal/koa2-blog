import sequelize from '../../entity/db';
import { Model, DataTypes } from 'sequelize';
import { randomStr } from '../../utils/util';
import dayjs from 'dayjs';

// 评论表
const Comment = sequelize.define(
  'rem_comment',
  {
    comment_id: { type: DataTypes.STRING, defaultValue: () => randomStr(), allowNull: true },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '评论父级id',
    },
    talk_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '评论的说说id',
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '评论的文章id',
    },
    from_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '评论人id',
    },
    from_name: {
      type: DataTypes.STRING, // STRING 默认255
      allowNull: false,
      comment: '评论人昵称',
    },
    from_avatar: {
      type: DataTypes.STRING(555), // STRING 默认255
      allowNull: false,
      comment: '评论人头像',
    },
    to_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '被回复的人id',
    },
    to_name: {
      type: DataTypes.STRING, // STRING 默认255
      allowNull: false,
      comment: '被回复人的昵称',
    },
    to_avatar: {
      type: DataTypes.STRING(555), // STRING 默认255
      allowNull: false,
      comment: '被回复人的头像',
    },
    content: {
      type: DataTypes.STRING(555), // STRING 默认255
      allowNull: true,
      comment: '评论内容',
    },
    thumbs_up: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '评论点赞数',
    },
    ip: {
      type: DataTypes.STRING, // STRING 默认255
      allowNull: false,
      comment: 'ip地址',
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

module.exports = Comment;
