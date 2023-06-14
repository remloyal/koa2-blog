import sequelize from '../../entity/db';
import { Model, DataTypes } from 'sequelize';
import { randomStr } from '../../utils/util';
const { STRING, INTEGER, UUIDV4 } = DataTypes; // 获取数据类型

// 资源管理表
const FileControl = sequelize.define(
  'rem_file_control',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键ID',
    },
    file_id: {
      type: STRING,
      defaultValue: function () {
        return randomStr();
      },
      allowNull: true,
    },
    name: {
      type: STRING,
      comment: '资源名称',
    },
    type: {
      type: STRING,
      comment: '资源类型',
    },

    suffix_name: {
      type: STRING,
      comment: '后缀名',
    },

    flie_path: {
      type: DataTypes.STRING,
      comment: '资源路径',
    },
  },
  {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: true,
  }
);

export default FileControl;
