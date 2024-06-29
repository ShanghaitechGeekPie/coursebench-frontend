<template>
  <v-pagination
    :length="length"
    :total-visible="totalVisible"
    v-model="pageModel"
    @input="$emit('change', pageModel)"
  />
</template>
<script>
export default {
  data() {
    return {
      pageModel: this.page,
    };
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    totalVisible: {
      type: Number,
      default: -1,
    },
    elevation: {
      type: [Number, String],
      default: 4,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: 'page',
    event: 'change',
  },
};
</script>
<style scoped lang="scss">
::v-deep .v-pagination__item,
::v-deep .v-pagination__navigation {
  box-shadow: none;
}

::v-deep .theme--light {
  .v-pagination__item,
  .v-pagination__navigation {
    border: 1px solid #e6e6e6;
  }
}
::v-deep .theme--dark {
  .v-pagination__item,
  .v-pagination__navigation {
    border: 1px solid #393939;
  }
}
</style>
