<template>
  <div class="pa-2 d-flex">
    <div>
      <div
        :class="[ page > 1 ? 'pagination-item' : '', 'pr-3' ]"
        @click="page > 1 ? $emit('change', page - 1) : ''">
        <v-card
          width="34"
          height="34"
          :elevation="elevation"
          :outlined="outlined"
          class="d-flex justify-center flex-column"
        >
          <div class="d-flex justify-center">
            <div>
              <v-icon :color="page > 1 ? '' : 'grey'">
                {{ icons.mdiChevronLeft }}
              </v-icon>
            </div>
          </div>
        </v-card>
      </div>
    </div>
    <div v-for="(label) in paginationLabels" :key="label">
      <div class="pagination-item px-1" @click="$emit('change', label)">
        <v-card
          width="34"
          height="34"
          :elevation="elevation"
          :outlined="outlined"
          class="d-flex justify-center flex-column"
          :color="label === page ? 'primary' : ''"
        >
          <div class="d-flex justify-center">
            <div :class="[ label === page ? 'white--text' : '' ]">{{ label }}</div>
          </div>
        </v-card>
      </div>
    </div>
    <div>
      <div
        :class="[ page < length ? 'pagination-item' : '', 'pl-3' ]"
        @click="page < length ? $emit('change', page + 1) : ''">
        <v-card
          width="34"
          height="34"
          :elevation="elevation"
          :outlined="outlined"
          class="d-flex justify-center flex-column"
        >
          <div class="d-flex justify-center">
            <div>
              <v-icon
                :color="page < length ? '' : 'grey'"
              >{{ icons.mdiChevronRight }}
              </v-icon>
            </div>
          </div>
        </v-card>
      </div>
    </div>
    <div class="pl-3 d-flex">
      <v-text-field solo dense
                    v-model="pageModel" @change="onPageChange"
                    style="width: 46px; height: 34px!important;margin-top: -2px;"
      />
      <v-card
        width="50"
        height="34"
        :elevation="elevation"
        :outlined="outlined"
        class="d-flex justify-center flex-column"
      >
        <div class="d-flex justify-center">
          /{{ length }}
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";

export default {
  data() {
    return {
      icons: {
        mdiChevronLeft,
        mdiChevronRight,
      },
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
    "total-visible": {
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
    prop: "page",
    event: "change",
  },
  computed: {
    paginationLabels() {
      const lengthInUse = this.totalVisible > 0
        ? Math.min(this.length, this.totalVisible) : length;
      const mid = Math.ceil((lengthInUse + 1) / 2);
      if (this.page - mid + 1 < 1) {
        return new Array(lengthInUse).fill(0, 0, lengthInUse).map((_, index) => index + 1);
      } else if (this.page + mid - 1 > this.length) {
        return new Array(lengthInUse).fill(0, 0, lengthInUse).map((_, index) => this.length - lengthInUse + index + 1);
      } else {
        return new Array(lengthInUse).fill(0, 0, lengthInUse).map((_, index) => this.page - mid + index + 1);
      }
    },
  },
  methods: {
    onPageChange(page) {
      page = Math.floor(Number(page));
      if (page > 0 && page < this.length) {
        this.pageModel = page;
        this.$emit("change", page);
      } else {
        this.pageModel = this.page;
      }
    },
  },
  watch: {
    page: {
      handler(newVal) {
        this.pageModel = newVal;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style scoped>
.pagination-item:hover {
  cursor: pointer;
}
</style>