import sequelize from '../../entity/db';
import { Model, DataTypes } from 'sequelize';

const { STRING, INTEGER } = DataTypes;

const Lables = sequelize.define(
  'rem_lables',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    //   文章id
    acticle_id: { type: STRING, allowNull: false },
    //   标签id
    label_id: { type: STRING, allowNull: false },
  },
  {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: true,
  }
);

export default Lables;
