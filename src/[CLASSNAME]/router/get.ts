import Router from 'ette-router';
[SUBCOMP_START]
import { getInnerAppsMiddleware } from 'ide-lib-base-component';
[SUBCOMP_END]

import { IContext } from './helper';

export const router = new Router();

// 可以通过 filter 返回指定的属性值
// 比如 /nodes?filter=name,screenId ，返回的集合只有这两个属性
router.get('model', '/model', function (ctx: IContext) {
  const { stores, request } = ctx;
  const { query } = request;
  const filterArray = query && query.filter && query.filter.trim().split(',');
  ctx.response.body = {
    attributes: stores.model.allAttibuteWithFilter(filterArray)
  };
  ctx.response.status = 200;
});

[SUBCOMP_START]
// 返回某个 client 对象
router.get('clients', '/innerApps/:name', getInnerAppsMiddleware);
[SUBCOMP_END]
