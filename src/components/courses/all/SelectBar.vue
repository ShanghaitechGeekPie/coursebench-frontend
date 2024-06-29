<template>
  <v-card class="px-lg-0 px-4" outlined flat :style="{ width: width }">
    <v-container>
      <v-row class="pt-lg-2 pt-4">
        <v-col
          md="2"
          sm="3"
          cols="6"
          class="pb-0 pt-lg-3 pt-0 pl-4"
          style="max-width: 140px; min-width: 130px"
        >
          <v-select
            :value="sortKey"
            @input="$emit('update:sort-key', $event)"
            :items="keyItems"
            label="排序方式"
          ></v-select>
        </v-col>
        <v-col
          md="2"
          sm="3"
          cols="6"
          class="pb-0 pt-lg-3 pt-0"
          style="max-width: 140px; min-width: 130px"
        >
          <v-select
            :value="sortOrder"
            @input="$emit('update:sort-order', $event)"
            :items="orderItems"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: '',
    },
    'key-items': {
      type: Array,
      required: true,
    },
    'order-items': {
      type: Array,
      required: true,
    },
    'sort-key': {
      type: String,
      required: true,
    },
    'sort-order': {
      type: String,
      required: true,
    },
  },
};
</script>
