import { Sequelize } from 'sequelize';

import * as log4js from '../utils/log';
import { FIXED_KEY } from '../config/config';

const sqlUrl =
  FIXED_KEY.sql.sqlUrl != '' || null
    ? FIXED_KEY.sql.sqlUrl
    : `${FIXED_KEY.sql.type}://${FIXED_KEY.sql.username}:${FIXED_KEY.sql.password}@${FIXED_KEY.sql.host}:${FIXED_KEY.sql.port}/${FIXED_KEY.sql.database}`;
console.log(sqlUrl);

const sequelize = new Sequelize(sqlUrl, {
  timezone: '+08:00',
  logging: (manage) => {
    log4js.db(manage);
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const MAX_RETRIES = 20;  // 最大重试次数
const RETRY_DELAY = 10000;  // 重试延迟时间（单位：毫秒）
let retryCount = 0;
const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

// 测试数据库链接
export const dbtest = () => {
  sequelize
    .authenticate()
    .then(() => {
      log4js.db('数据库连接成功');
      // 创建模型
      sequelize
        .sync({ force: false, alter: true })
        .then(() => {
          console.log('数据库同步成功');
        })
        .catch((err) => {
          log4js.db(`数据库同步成功====> ${err}`);
          console.error('数据库同步失败====>', err);
        });
      console.log('数据库连接成功');
    })
    .catch(async (err: any) => {
      // 数据库连接失败时打印输出
      log4js.db(`数据库连接失败====> ${err}`);
      console.error('数据库连接失败====>', err);
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        console.log('等待重试...');
        await delay(RETRY_DELAY);
        console.log(`第 ${retryCount} 次重试`);
        await dbtest();  // 递归调用进行重连
      } else {
        throw new Error('达到最大重试次数，无法连接数据库');
      }
    });
};

export default sequelize;
