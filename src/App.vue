<template>
  <v-app>
    <Header :snackbar.sync="snackbar" />
    <v-main>
      <div>
        <InsiderBanner />
      </div>
      <div>
        <ActivityBanner :Enable=true>
          评论拿赏金功能上线啦！详情请看<a href="https://www.baidu.com/link?url=VZ8B58kyM3gTA1w7QLtmappBY36c06lFXGEjzaYUBNG&wd=&eqid=d5f4c163008c878200000005660fff04">这里</a>！
        </ActivityBanner>
      </div>
      
      <router-view :key="$route.path" />
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
        outlined
      >
        {{ snackbar.text }}
        <template #action="{ attrs }">
          <v-btn v-bind="attrs" @click="snackbar.show = false" icon>
            <v-icon :color="snackbar.color">
              {{ icons.mdiClose }}
            </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>
<script>
import Header from '@/components/global/Header';
import InsiderBanner from '@/components/global/InsiderBanner';
import ActivityBanner from '@/components/global/ActivityBanner';
import useSnackbar from '@/composables/global/useSnackbar';
import { getPreset } from '@/composables/global/useCookie';
import { provide, reactive } from 'vue';
import { mdiClose } from '@mdi/js';

export default {
  name: 'App',
  components: { Header, InsiderBanner, ActivityBanner },
  setup() {
    const { snackbar } = useSnackbar();
    const global = reactive({
      userProfile: getPreset(),
      isLogin:
        Object.getOwnPropertyNames(getPreset()).filter(
          (key) => key !== '__ob__',
        ).length !== 0,
    });
    const searchInput = reactive({
      isRegexp: false,
      keys: [''],
    });

    const savedCourseAllStatus = reactive({
      page: 1,
    });

    const savedCourseAllFilterStatus = reactive({
      selected: [],
      sortKey: '综合评分',
      order: '从高到低',
    });

    provide('global', global);
    provide('searchInput', searchInput);
    provide('savedCourseAllStatus', savedCourseAllStatus);
    provide('savedCourseAllFilterStatus', savedCourseAllFilterStatus);

    return { snackbar };
  },
  data() {
    return {
      icons: {
        mdiClose,
      },
    };
  },
  created() {
    console.log(`
    _____                         ____                  _     
  / ____|                        |  _ \\                | |    
 | |     ___  _   _ _ __ ___  ___| |_) | ___ _ __   ___| |__  
 | |    / _ \\| | | | '__/ __|/ _ \\  _ < / _ \\ '_ \\ / __| '_ \\ 
 | |___| (_) | |_| | |  \\__ \\  __/ |_) |  __/ | | | (__| | | |
  \\_____\\___/ \\__,_|_|  |___/\\___|____/ \\___|_| |_|\\___|_| |_|

    `);
    try {
      document.body.removeChild(document.getElementById('app-loader'));
      this.$vuetify.theme.dark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
    } catch {}
  },
};
</script>
<style>
body {
  overflow-x: hidden;
}
</style>
