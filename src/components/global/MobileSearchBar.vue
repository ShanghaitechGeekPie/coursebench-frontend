<template>
  <div>
    <div>
      <v-btn icon @click="status.showSearchBar = true">
        <v-icon>{{ icons.mdiMagnify }}</v-icon>
      </v-btn>
    </div>
    <div class="mobile-search-bar" v-if="status.showSearchBar">
      <v-text-field
        hide-details
        solo
        :flat="!status.showSearchBar"
        :prepend-inner-icon="icons.mdiMagnify"
        autofocus
        @blur="status.showSearchBar = false"
        @input="
          $emit('input', $event), isCurrentPath('^\/$') ? $router.push('/') : ''
        "
        placeholder="以空格间隔关键字或以regexp:开头输入正则表达式"
        :value="value"
      >
      </v-text-field>
    </div>
  </div>
</template>
<script>
import { mdiMagnify } from '@mdi/js';
import { reactive } from 'vue';
import useRouteMatch from '@/composables/global/useRouteMatch';

export default {
  setup() {
    const status = reactive({
      showSearchBar: false,
    });

    const { isCurrentPath } = useRouteMatch();

    return { status, isCurrentPath };
  },
  data() {
    return {
      icons: {
        mdiMagnify,
      },
    };
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
};
</script>
<style scoped>
.mobile-search-bar {
  position: absolute;
  top: 4px;
  z-index: 99;
  left: 16px;
  width: calc(100% - 32px);
}
</style>
