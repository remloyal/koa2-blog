import sequelize from '../../entity/db';
import { Model, DataTypes } from 'sequelize';
import dayjs from 'dayjs';

const { STRING, INTEGER } = DataTypes;

const Lables = sequelize.define(
  'rem_lable',
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    //   文章id
    acticle_id: { type: STRING, allowNull: false },
    //   标签id
    label_id: { type: STRING, allowNull: false },
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

export default Lables;
