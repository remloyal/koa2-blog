import sequelize from '../../entity/db';
import { Model, DataTypes } from 'sequelize';
import { randomStr } from '../../utils/util';
import dayjs from 'dayjs';

const ArticleSort = sequelize.define(
  'rem_article_sort',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lable_id: { type: DataTypes.STRING, defaultValue: randomStr(), allowNull: true },
    lable_name: { type: DataTypes.STRING, allowNull: false },
    lable_alias: { type: DataTypes.STRING, allowNull: false },
    lable_description: { type: DataTypes.STRING, allowNull: false },
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

export default ArticleSort;
