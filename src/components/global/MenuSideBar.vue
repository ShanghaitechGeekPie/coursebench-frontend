<template>
  <v-navigation-drawer v-model="menuBarStatus.drawer" fixed>
    <v-list nav dense>
      <v-list-item-group
        v-model="model"
        active-class="blue--text text--accent-4"
      >
        <v-list-item to="/" v-if="$vuetify.breakpoint.xsOnly">
          <v-list-item-title
            plain
            tile
            :hover-only="isCurrentPath('^\/$')"
            class="px-1"
          >
            全部课程
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/recent" v-if="$vuetify.breakpoint.lgAndDown">
          <v-list-item-title
            plain
            tile
            height="100%"
            :hover-only="isCurrentPath('^\/recent')"
            class="px-1"
          >
            最近评价
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/ranking" v-if="$vuetify.breakpoint.lgAndDown">
          <v-list-item-title
            plain
            tile
            height="100%"
            :hover-only="isCurrentPath('^\/ranking')"
            class="px-1"
          >
            赏金排名
          </v-list-item-title>
        </v-list-item>

        <v-list-item to="/about" v-if="$vuetify.breakpoint.xsOnly">
          <v-list-item-title
            plain
            tile
            height="100%"
            :hover-only="isCurrentPath('^\/about')"
            class="px-1"
          >
            关于我们
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import useRouteMatch from '@/composables/global/useRouteMatch';
import useMenuBar from '@/composables/global/useMenuBar';

export default {
  setup() {
    const { isCurrentPath } = useRouteMatch();
    const { menuBarStatus } = useMenuBar();
    return {
      menuBarStatus,
      isCurrentPath,
    };
  },
  data() {
    return {
      model: null,
    };
  },
};
</script>
