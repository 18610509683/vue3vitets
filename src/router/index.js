import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { ElLoading } from "element-plus";
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)",
      redirect: {
        path: "/remote",
      },
    },
    {
      path: "/ademo",
      name: "ademo",
      meta: {
        title: "vue+ts文件demo",
        keepalive: true,
      },
      component: async () => await import("@/views/ademo/index.vue"),
    },
    {
      path: "/test",
      name: "test",
      meta: {
        title: "fabric测试",
        keepalive: true,
      },
      component: async () => await import("@/views/test/index.vue"),
    },
    {
      path: "/remoteControl",
      name: "remoteContrl",
      meta: {
        title: "远程监控",
        keepalive: false,
      },
      component: async () => await import("@/views/remoteControl/index.vue"),
    },
    {
      path: "/remote",
      name: "remote",
      meta: {
        title: "远程遥控",
        keepalive: false,
      },
      component: async () => await import("@/views/remote/remote.vue"),
    },
    {
      path: "/remote/addpatrolpoint",
      name: "addpatrolpoint",
      meta: {
        title: "采集巡检点",
        keepalive: false,
      },
      component: async () => await import("@/views/remote/AddPatrolPoint.vue"),
    },
    {
      path: "/task",
      name: "task",
      meta: {
        title: "巡检任务",
        keepalive: true,
      },
      component: async () => await import("@/views/task/index.vue"),
    },
    {
      path: "/createTask",
      name: "createTask",
      meta: {
        title: "创建巡检任务",
        keepalive: true,
      },
      component: async () => await import("@/views/createTask/index.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.meta.title) {
    document.title = "机器人巡检__" + to.meta.title;
  }
  const loadingInstance = ElLoading.service({
    lock: true,
    text: "加载中……",
    background: "rgba(0, 0, 0, .3)",
  });
  window.loading = loadingInstance;
  next();
  setTimeout(() => {
    window.loading.close();
  }, 500);
});
export default router;
