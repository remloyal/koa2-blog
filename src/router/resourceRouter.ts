// 资源管理

import Router from 'koa-router';
import { ResourceController,  } from '../controllers/resource';

module.exports = (router: Router) => {
  router.post('/upload', ResourceController.upload);
};
