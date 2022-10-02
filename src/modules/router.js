import routes from "~pages";
import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  routes,
  history: createWebHashHistory(), //这里之前使用的createWebHistory 就是个坑，dev页面正常，build之后console没报错，页面白屏。
});

export default (app) => app.use(router);
