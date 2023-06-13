import { Sequelize } from 'sequelize';

import * as log4js from '../utils/log';
import { FIXED_KEY } from '../config/config';

const sqlUrl = FIXED_KEY.sql.sqlUrl != '' || null ? FIXED_KEY.sql.sqlUrl : `${FIXED_KEY.sql.type}://${FIXED_KEY.sql.username}:${FIXED_KEY.sql.password}@${FIXED_KEY.sql.host}:${FIXED_KEY.sql.port}/${FIXED_KEY.sql.database}`
console.log(sqlUrl);

const sequelize = new Sequelize(sqlUrl, {
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
      console.log('数据库连接成功');
    })
    .catch((err: any) => {
      // 数据库连接失败时打印输出
      log4js.db(`数据库连接失败====> ${err}`);
      console.error('数据库连接失败====>', err);
      throw err;
    });
};

export default sequelize;
