import { reactive } from 'vue';
import router from '@/router/index';

const currentRoute = reactive({ ...router.currentRoute });

const useRoute = () => currentRoute;

const useRouter = () => router;

router.beforeEach((to, from, next) => {
  if (/^\/teacher\/\d*$/.test(to.path) && to.params.id === '100000001') {
    next(from);
  }
  next();
});

router.afterEach((to, from, next) => {
  Object.keys(to).forEach((key) => {
    currentRoute[key] = to[key];
  });
});

export { useRoute, useRouter };
