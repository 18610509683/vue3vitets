import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from "vue-router";
import { ElLoading } from "element-plus";
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)",
      redirect: {
        path: "/",
      },
    },
    {
      path: "/ademo",
      name: "ademo",
      title: "vue+ts文件demo",
      meta: {
        keepalive: true,
      },
      component: async () => await import("@/views/ademo/index.vue")
    },    
    {
      path: "/",
      name: "index",
      title: "远程遥控",
      meta: {
        keepalive: false,
      },
      component: async () => await import("@/views/remote/index.vue")
    },
    {
      path: "/task",
      name: "task",
      title: "巡检任务",
      meta: {
        keepalive: true,
      },
      component: async () => await import("@/views/task/index.vue")
    },
  ]
})
router.beforeEach((to, from, next) => {
  const loadingInstance = ElLoading.service({
    lock: true,
    text: "加载中……",
    background: 'rgba(0, 0, 0, .3)'
  });
  window.loading = loadingInstance;
  next();
  setTimeout(() => {
    window.loading.close()
  }, 500);
})
export default router;