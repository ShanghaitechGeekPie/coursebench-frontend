<template>
  <div>
    <div
      class="d-flex justify-center"
      :style="{ transform: breakpoint.mdAndDown ? 'translate(0, -76px)' : '' }"
    >
      <AvatarContainer
        :name="isChinese"
        src=""
        :size="breakpoint.name === 'xs' ? 110 : 120"
        :outlined="breakpoint.mdAndDown"
      />
    </div>
    <div
      class="d-flex justify-center pt-5"
      :style="{ 'margin-top': breakpoint.mdAndDown ? '-76px' : '0' }"
    >
      <div class="text-h5 font-weight-bold">
        {{ teacherDetail.name }}
      </div>
    </div>
    <div class="d-flex justify-center pt-3">
      <div class="grey--text text--darken-2">
        <span>{{ teacherDetail.job }}</span>
      </div>
    </div>
    <div class="d-flex justify-center pt-3">
      <div class="grey--text text--darken-2">
        <span>{{ teacherDetail.institute }}</span>
      </div>
    </div>
    <div class="d-flex justify-center pt-3 px-4">
      <div class="grey--text text--darken-2 overflow" style="max-width: 750px">
        <span>{{ teacherDetail.introduction }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import useDetail from "@/composables/teachers/detail/useDetail";
import AvatarContainer from "@/components/users/profile/AvatarContainer.vue";

export default {
  setup() {
    const { teacherDetail } = useDetail();
    return { teacherDetail };
  },
  data() {
    return {
      breakpoint: this.$vuetify.breakpoint,
    };
  },
  components: { AvatarContainer },
  computed: {
    isChinese() {
      return escape(this.teacherDetail.name.slice(0, 2)).indexOf("%u") >= 0
        ? this.teacherDetail.name.slice(0, 1)
        : this.teacherDetail.name.slice(0, 2);
    },
  },
};
</script>
<style scoped>
.overflow {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>