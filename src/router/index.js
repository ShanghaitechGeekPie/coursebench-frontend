import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/CourseAll.vue')
    },
    {
      path: '/course/:id',
      component: () => import('@/views/CourseDetails.vue')
    },
    {
      path: '/teacher',
      component: () => import('@/views/TeacherAll.vue')
    },
    {
      path: '/teacher/:id',
      component: () => import('@/views/TeacherDetails.vue')
    },
    {
      path: '/user',
      component: () => import('@/views/User.vue')
    },
    {
      path: '/verify', 
      component: () => import('@/views/Verify.vue')
    }, 
    {
      path: '*',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})