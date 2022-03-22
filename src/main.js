import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router/index'
import VueCompositionAPI from '@vue/composition-api'
import NProgress from 'nprogress'
import { VueQueryPlugin } from "vue-query"
import 'nprogress/nprogress.css'
import '@/styles/markdown.css'
import '@/styles/prism.css'

import '@fontsource/roboto/latin-100.css'
import '@fontsource/roboto/latin-300.css'
import '@fontsource/roboto/latin-400.css'
import '@fontsource/roboto/latin-500.css'
import '@fontsource/roboto/latin-700.css'
import '@fontsource/roboto/latin-900.css'

const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false
      }
    }
  }
}

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)
Vue.use(VueQueryPlugin, vueQueryPluginOptions)

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  document.documentElement.scrollTop = 0
  NProgress.done()
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
