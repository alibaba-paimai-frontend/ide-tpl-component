import Router from 'ette-router';
import { IContext } from './helper';

export const router = new Router();

// 移除整棵树
(router as any).del('nodes', '/nodes', function (ctx: IContext) {
  const { stores } = ctx;
  ctx.response.body = {
    node: stores.resetToEmpty()
  };
  ctx.response.status = 200;
});
