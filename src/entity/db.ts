import { Sequelize } from 'sequelize';

import * as log4js from '../utils/log';

const sequelize = new Sequelize('mysql://root:d8K9vFR7ll5LqGBINwaF@containers-us-west-82.railway.app:7500/railway', {
  timezone: '+08:00',
  logging: (manage) => {
    log4js.db(manage);
  },
});

// 测试数据库链接
export const dbtest = () => {
  sequelize
    .authenticate()
    .then(() => {
      log4js.db('数据库连接成功');
      // 创建模型
      sequelize.sync({ force: false, alter: true });
      // console.log('数据库连接成功');
    })
    .catch((err: any) => {
      // 数据库连接失败时打印输出
      log4js.db(err);
      console.error('数据库连接失败====>', err);
      throw err;
    });
};

export default sequelize;
