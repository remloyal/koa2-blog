import sequelize from '../../entity/db';
import { Model, DataTypes } from 'sequelize';

const ArticleSort = sequelize.define(
  'rem_article_sort',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lable_id: { type: DataTypes.STRING, defaultValue: DataTypes.UUIDV4, allowNull: true },
    lable_name: { type: DataTypes.STRING, allowNull: false },
    lable_alias: { type: DataTypes.STRING, allowNull: false },
    lable_description: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: true,
  }
);

export default ArticleSort;
