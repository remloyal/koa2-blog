// 资源管理

import Router from 'koa-router';
import { ResourceController } from '../controllers/resource';

export const resourceRouter = (router: Router, privateRouter: Router) => {
  router.post('/upload', ResourceController.upload);
  router.get('/resource', ResourceController.resource);
  router.get('/info', ResourceController.info);
};
