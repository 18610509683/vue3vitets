import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from "vue-router";
import { ElLoading } from "element-plus";

function Sroutes(url, options) {
  const files = import.meta.glob('/src/views/**/*.vue');
  let route = [
    {
      path: "/:pathMatch(.*)",
      redirect: {
        path: "/test",
      },
    },
  ];
  for (const key in files) {
    var fileName = key.replace(new RegExp(url, 'g'), "/").replace(/(\.\/|\.vue)/g, "").replace(new RegExp('/src', 'g'), "").replace(new RegExp('/views', 'g'), "").replace(new RegExp('/components', 'g'), "");
    const fileName2 = key.replace(/(\.\/|\.vue)/g, "").replace(new RegExp('/src', 'g'), "");
    fileName = fileName.replace(/\/index$/g, '')
    if (fileName !== '/App') {
      if (fileName == '//') {
        route.push({
          path: '/',
          name: url,
          meta: options,
          component: () => import(`..${url}.vue`)
        })
      } else {
        route.push({
          path: fileName,
          name: fileName,
          meta: options,
          component: () => import(`..${fileName2}.vue`)
        })
      };
    };
  };
  return route;
};
const autoRoute = Sroutes('/views/index', { header: true, footer: true });
console.log('最终文件数据', Sroutes('/views/index', { header: true, footer: true }))
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: autoRoute
});

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.title) {
    document.title = '机器人巡检__' + to.meta.title
  }
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