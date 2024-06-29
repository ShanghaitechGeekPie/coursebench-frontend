<template>
  <v-card
    class="mb-3"
    flat
    :max-width="maxWidth"
    outlined
    :style="{
      width: width,
      height: height,
    }"
  >
    <div>
      <div class="px-sm-4 px-2 pt-sm-4 pt-3 pb-sm-3 pb-0">
        <div class="d-flex justify-space-between">
          <div class="d-flex justify-space-between">
            <AvatarContainer color="#e2e2e2" size="38" tile />
            <div class="pl-2">
              <!--72.67, an ancient shit magic number-->
              <v-sheet
                class="mb-2"
                color="#e2e2e2"
                width="72.67px"
                height="14px"
              ></v-sheet>
              <v-sheet
                class="mt-1"
                color="#e2e2e2"
                width="120px"
                height="16px"
              ></v-sheet>
            </div>
          </div>
          <div class="d-flex justify-end">
            <div class="d-flex flex-column">
              <v-sheet color="#e2e2e2" width="92px" height="14px"></v-sheet>
              <v-sheet
                class="mt-2"
                color="#e2e2e2"
                width="92px"
                height="14px"
              ></v-sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="pa-sm-4 pa-2 pb-sm-0 py-sm-0">
        <v-sheet
          class="my-2"
          width="270px"
          height="25px"
          color="#e2e2e2"
        ></v-sheet>
      </div>
      <div>
        <div class="px-sm-4 px-2 pb-sm-3 pb-2 pt-sm-2">
          <v-sheet
            width="100%"
            class="mt-1 mb-3"
            height="16px"
            color="#e2e2e2"
          ></v-sheet>
          <v-sheet
            width="80%"
            class="my-3"
            height="16px"
            color="#e2e2e2"
          ></v-sheet>
          <v-sheet
            width="90%"
            class="mb-1 mt-3"
            height="16px"
            color="#e2e2e2"
          ></v-sheet>
          <div class="pt-2">
            <v-sheet
              width="30%"
              class="mb-1 mt-3"
              height="14px"
              color="#e2e2e2"
            ></v-sheet>
          </div>
        </div>
        <div class="px-sm-4 px-2">
          <div>
            <v-sheet
              :width="$vuetify.breakpoint.xsOnly ? '100%' : '65%'"
              class=""
              height="18px"
              color="#e2e2e2"
            ></v-sheet>
          </div>
          <div class="mt-2" v-if="$vuetify.breakpoint.xsOnly">
            <v-sheet
              :width="$vuetify.breakpoint.xsOnly ? '100%' : '65%'"
              class=""
              height="18px"
              color="#e2e2e2"
            ></v-sheet>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script>
import AvatarContainer from '@/components/users/profile/AvatarContainer';

export default {
  components: {
    AvatarContainer,
  },
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '',
    },
    maxWidth: {
      type: String,
      default: '800',
    },
  },
};
</script>
