import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/CourseAll.vue'),
    },
    {
      path: '/course/:id',
      component: () => import('@/views/CourseDetails.vue'),
    },
    {
      path: '/teacher',
      component: () => import('@/views/TeacherAll.vue'),
    },
    {
      path: '/teacher/:id',
      component: () => import('@/views/TeacherDetails.vue'),
    },
    {
      path: '/user/:id',
      component: () => import('@/views/User.vue'),
    },
    {
      path: '/active',
      component: () => import('@/views/Active.vue'),
    },
    {
      path: '/reset_password_active',
      component: () => import('@/views/ResetPasswordActive.vue'),
    },
    {
      path: '/about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/activities',
      component: () => import('@/views/ActivityPoster.vue'),
    },
    {
      path: '/oauth/casdoor',
      component: () => import('@/views/CasdoorCallback.vue'),
    },
    {
      path: '*',
      component: () => import('@/views/NotFound.vue'),
    },
    {
      path: '/recent',
      component: () => import('@/views/Recent.vue'),
    },
    {
      path: '/ranking',
      component: () => import('@/views/Ranking.vue'),
    },
  ],
});
