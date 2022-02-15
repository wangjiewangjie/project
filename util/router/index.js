// router.js
import { RouterMount, createRouter } from 'uni-simple-router';

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [...ROUTES],
});
//全局路由前置守卫
router.beforeEach((_to, _from, next) => {
  next();
});
// 全局路由后置守卫
router.afterEach(() => {});

export { router, RouterMount };
