<template>
  <div
    class="d-flex justify-center insider-banner"
    :style="{
      'background-color': $vuetify.theme.dark ? '#2a4165' : '#e8f0fe',
    }"
  >
    <div class="d-flex justify-center flex-column">
      <div class="text-body-1 primary--text">
        CourseBench Insider, Build 2209
      </div>
    </div>
  </div>
</template>
<style scoped>
.insider-banner {
  height: 48px;

  position: absolute;
  width: 100%;
  /* opacity: 0.9; */
}
</style>