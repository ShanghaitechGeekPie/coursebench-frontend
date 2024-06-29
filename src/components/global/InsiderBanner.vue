<template>
  <div
    class="d-flex justify-center insider-banner"
    :style="{
      'background-color': $vuetify.theme.dark ? '#2a4165' : '#e8f0fe',
    }"
    v-if="Config.buildMode != 'Release'"
  >
    <div class="d-flex justify-center flex-column">
      <div class="text-body-1 primary--text">
        CourseBench {{ Config.buildMode }}, Build {{ Config.buildVersion }}
      </div>
    </div>
  </div>
</template>
<script>
import Config from 'Config';

export default {
  setup() {
    return { Config };
  },
};
</script>
<style scoped>
.insider-banner {
  height: 48px;

  position: absolute;
  width: 100%;
  /* opacity: 0.9; */
}
</style>
