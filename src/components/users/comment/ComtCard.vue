<template>
  <v-lazy>
    <v-hover v-slot="{ hover }" close-delay="50" open-delay="50">
      <v-card class="mb-3" :elevation="hover ? 8 : 2">
        <v-card-title class="pa-sm-4 pa-2">
          <span class="text-subtitle-1 font-weight-bold">{{ comt.title }}</span>
        </v-card-title>
        <v-card-text class="px-sm-4 px-2 pb-sm-4 pb-2">
          <v-container>
            <v-row>
              <v-col cols="4" class="pa-0">
                <v-avatar tile color="pink" size="38" class="rounded">
                  <span
                    class="text-sm-h3 text-h5"
                    v-if="userinfo.avatar === ''"
                    >{{ userinfo.nickname.slice(0, 1) }}</span
                  >
                  <v-img
                    :src="userinfo.avatar"
                    alt="Avatar"
                    aspect-ratio="1"
                    v-else
                  ></v-img>
                </v-avatar>
                <span class="text-body-1 font-weight-bold pl-2">{{
                  userinfo.nickname
                }}</span>
              </v-col>
              <v-col cols="8" class="pa-0 d-flex justify-end">
                <div>
                  <div class="text-body-2">{{ comt["course"] }}</div>
                  <div class="text-body-2">{{ comt["time"] }}</div>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="px-0">
                <span class="text-body-2">
                  {{ comt["user_score"] }}人赞同了该评价
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="px-0 pt-0">
                <span
                  class="text-body-1 comt-line-limit"
                  style="white-space: pre-wrap"
                >
                  {{ comt["comment"] }}
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pa-0">
                <div>
                  <span class="text-body-2 text-decoration-underline">
                    在课程页面中查看
                  </span>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-hover>
  </v-lazy>
</template>
<script>
import useComtCard from "@/composables/users/comment/useComtCard";

export default {
  setup() {
    const { userinfo, statics, status } = useComtCard();
    return { userinfo, statics, status };
  },
  props: {
    comt: Object,
  },
};
</script>
<style>
.comt-line-limit {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>