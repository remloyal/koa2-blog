import { FIXED_KEY } from './config';

export const apps = [
  {
    name: 'formal', //需与package.json里--only 后缀名相同
    script: './src/app.ts',
    args: 'one two',
    instances: 1,
    cron_restart: '0 03 * * *',
    autorestart: true,
    watch: true,
    ignore_watch: [
      // 不用监听的文件
      'node_modules',
      'log',
    ],
    max_memory_restart: '300M',
    env: {
      NODE_ENV: process.env.NODE_ENV, //process.env.NODE_ENV值
    },
  },
  {
    name: 'test', //需与package.json里--only 后缀名相同
    script: './src/app.ts',
    args: 'one two',
    instances: 1,
    cron_restart: '0 03 * * *',
    autorestart: true,
    watch: true,
    ignore_watch: [
      // 不用监听的文件
      'node_modules',
      'log',
    ],
    max_memory_restart: '300M',
    env: {
      NODE_ENV: process.env.NODE_ENV, //process.env.NODE_ENV值
    },
  },
];
