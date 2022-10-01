<template>
  <v-app-bar
    app
    :color="$vuetify.theme.dark ? '' : 'white'"
    elevate-on-scroll
    elevation="3"
  >
    <v-toolbar-title
      class="px-sm-8"
      @click="isCurrentPath('^\/$') ? $router.push('/') : ''"
      style="cursor: pointer"
    >
      <v-img
        :src="$vuetify.theme.dark ? logoDark : logoLight"
        width="139.61px"
      ></v-img>
    </v-toolbar-title>
    <div
      class="d-flex"
      style="height: calc(100% + 8px)"
      v-if="$vuetify.breakpoint.mdAndUp"
    >
      <SliderButton
        tile
        plain
        height="100%"
        :hover-only="isCurrentPath('^\/$')"
        to="/"
        class="px-1 black--text"
      >
        全部课程
      </SliderButton>
      <!-- <SliderButton
        plain
        tile
        height="100%"
        :hover-only="isCurrentPath('^\/course\/[0-9]+$')"
        to="/course/1"
        class="px-1"
      >
        课程详情
      </SliderButton> -->
      <SliderButton
        plain
        tile
        height="100%"
        :hover-only="isCurrentPath('^\/about')"
        to="/about"
        class="px-1"
      >
        关于我们
      </SliderButton>
    </div>
    <div
      :class="adoptiveSearchBarClass"
      :style="{
        width: adoptiveSearchBarWidth,
      }"
    >
      <v-text-field
        hide-details
        solo
        flat
        :background-color="$vuetify.theme.dark ? '#3c4043' : '#F1F3F4'"
        :prepend-inner-icon="icons.mdiMagnify"
        ref="searchBar"
        @input="searchParser"
        @blur="isCurrentPath('^\/$') ? $router.push('/') : ''"
        @keydown.enter="
          $refs.searchBar.blur(), isCurrentPath('^\/$') ? $router.push('/') : ''
        "
        v-if="$vuetify.breakpoint.smAndUp"
        placeholder="以空格间隔关键字或以regexp:开头输入正则表达式"
      >
      </v-text-field>
    </div>
    <v-spacer></v-spacer>
    <MobileSearchBar @input="searchParser" v-if="$vuetify.breakpoint.xsOnly" />
    <v-btn
      color="primary"
      class="px-sm-8"
      @click="dialog.login = true"
      v-if="!global.isLogin"
      elevation="0"
    >
      登录
    </v-btn>
    <v-btn
      class="px-sm-8 ml-4 mr-sm-8"
      @click="dialog.register = true"
      v-if="!global.isLogin"
      elevation="0"
    >
      注册
    </v-btn>
    <v-menu left bottom offset-y transition="slide-y-transition" v-else>
      <template #activator="{ on }">
        <v-btn v-on="on" icon>
          <AvatarContainer
            small
            size="38"
            :name="useUserName(global.userProfile)"
            slice
            style="transform: translate(-1px, 0)"
            :src="global.userProfile.avatar"
          />
        </v-btn>
      </template>
      <v-list close-on-click width="340px">
        <v-list-item class="py-4 px-8 d-block">
          <div class="d-flex justify-center over">
            <AvatarContainer
              size="80"
              font-size="text-h4"
              :name="useUserName(global.userProfile)"
              slice
              :src="global.userProfile.avatar"
            />
          </div>
          <div class="d-flex justify-center">
            <div class="overflow-ellipsis font-weight-bold pt-4">
              {{ useUserName(global.userProfile) }}
            </div>
          </div>
          <div class="d-flex justify-center">
            <div
              class="
                text-body-2 text--darken-1
                grey--text
                overflow-ellipsis
                py-1
              "
            >
              {{ global.userProfile.email }}
            </div>
          </div>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link :to="`/user/${global.userProfile.id}`" class="px-8">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiAccountOutline }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-body-1">个人中心</v-list-item-title>
        </v-list-item>
        <v-list-item link to="" class="px-8">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiMessageAlertOutline }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title
            class="text-body-1"
            @click="
              isCurrentPath('^\/about') ? $router.push('/about') : '',
                useInsitePush('#bug_report')
            "
            >反馈</v-list-item-title
          >
        </v-list-item>
        <v-list-item link @click="doLogout()" class="px-8">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiLogoutVariant }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-body-1">注销</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="d-flex justify-center">
          <v-btn
            text
            x-small
            class="text-caption"
            @click="
              isCurrentPath('^\/about') ? $router.push('/about') : '',
                useInsitePush('#service_terms')
            "
            >用户协议</v-btn
          >
          <div class="px-1">•</div>
          <v-btn
            text
            x-small
            class="text-caption"
            @click="
              isCurrentPath('^\/about') ? $router.push('/about') : '',
                useInsitePush('#privacy_policy')
            "
            >隐私政策</v-btn
          >
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog
      v-model="dialog.login"
      :fullscreen="$vuetify.breakpoint.name === 'xs'"
      max-width="440"
      :transition="
        $vuetify.breakpoint.name === 'xs'
          ? 'dialog-bottom-transition'
          : 'scale-transition'
      "
      ><Login
    /></v-dialog>
    <v-dialog
      v-model="dialog.register"
      :fullscreen="$vuetify.breakpoint.name === 'xs'"
      max-width="440"
      :transition="
        $vuetify.breakpoint.name === 'xs'
          ? 'dialog-bottom-transition'
          : 'scale-transition'
      "
      ><Register
    /></v-dialog>
  </v-app-bar>
</template>

<script>
import { reactive, provide, inject } from "vue";
import Login from "@/components/users/forms/Login";
import Register from "@/components/users/forms/Register";
import useLogout from "@/composables/users/forms/useLogout";
import useUserName from "@/composables/global/useUserName";
import useRouteMatch from "@/composables/global/useRouteMatch";
import useDebounce from "@/composables/global/useDebounce";
import AvatarContainer from "@/components/users/profile/AvatarContainer";
import SliderButton from "@/components/global/SliderButton";
import MobileSearchBar from "@/components/global/MobileSearchBar";
import useInsitePush from "@/composables/global/useInsitePush";
import logoDark from "@/assets/logo-white.svg";
import logoLight from "@/assets/logo.svg";

import {
  mdiAccount,
  mdiLoginVariant,
  mdiLogoutVariant,
  mdiAccountPlusOutline,
  mdiAccountOutline,
  mdiMessageAlertOutline,
  mdiMagnify,
} from "@mdi/js";

export default {
  components: {
    Login,
    Register,
    AvatarContainer,
    SliderButton,
    MobileSearchBar,
  },
  setup() {
    const { doLogout } = useLogout();
    const { isCurrentPath } = useRouteMatch();

    const dialog = reactive({
      login: false,
      register: false,
    });

    provide("closeDialog", (type) => (dialog[type] = false));
    provide("openDialog", (type) => (dialog[type] = true));

    const global = inject("global"); // global status
    const searchInput = inject("searchInput");

    const searchParser = useDebounce((searchString) => {
      const searchRawString = (() => {
        if (searchString.startsWith("regexp:")) {
          searchInput.isRegexp = true;
          return searchString.slice(7).trim();
        } else {
          searchInput.isRegexp = false;
          return searchString.trim();
        }
      })();
      searchInput.keys = searchRawString
        .split(" ")
        .filter((item) => item !== "");
    });

    return {
      global,
      dialog,
      doLogout,
      useUserName,
      searchParser,
      isCurrentPath,
      useInsitePush,
      logoDark,
      logoLight,
    };
  },
  data() {
    return {
      icons: {
        mdiAccount,
        mdiLoginVariant,
        mdiLogoutVariant,
        mdiAccountPlusOutline,
        mdiAccountOutline,
        mdiMessageAlertOutline,
        mdiMagnify,
      },
    };
  },
  computed: {
    // Some customized fix, only for search bar so no need to abstract

    adoptiveSearchBarWidth() {
      if (this.$vuetify.breakpoint.width >= 1680) {
        return "720px";
      } else if (this.$vuetify.breakpoint.mdAndUp) {
        return `calc(${
          Math.min(
            this.$vuetify.breakpoint.width - (this.global.isLogin ? 550 : 750),
            720
          ) + 35
        }px)`;
      } else {
        return `calc(${
          this.$vuetify.breakpoint.width -
          (this.global.isLogin ? 250 : 450) +
          35
        }px)`;
      }
    },

    adoptiveSearchBarClass() {
      if (this.$vuetify.breakpoint.width >= 1680) {
        return "search-bar-large";
      } else if (this.$vuetify.breakpoint.mdAndUp) {
        return "search-bar-medium pl-lg-1";
      } else {
        return "";
      }
    },
  },
};
</script>
<style scoped>
.overflow-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-bar-large {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}

.search-bar-medium {
}
</style>