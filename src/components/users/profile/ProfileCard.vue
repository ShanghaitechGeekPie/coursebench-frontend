<template>
  <v-col class="pt-1 d-flex justify-space-between">
    <v-row>
      <v-col class="px-sm-3 px-0 pb-sm-3 pb-0">
        <div class="d-flex justify-space-between">
          <div class="text-sm-h3 text-h5 pt-0 pt-sm-5 pl-sm-6 px-sm-4 px-1">
            {{ userProfile.nickname }}
          </div>
          <div class="d-flex justify-end" v-if="isMobile">
            <div class="d-flex justify-end flex-column pb-0 pr-2">
              <v-btn
                icon
                outlined
                tile
                elevation="2"
                color="primary"
                width="60"
                height="30"
                @click="status.editProfile = true"
              >
                <v-icon size="20">
                  {{ statics.icons.mdiAccountEdit }}
                </v-icon>
                <span>设置</span>
              </v-btn>
            </div>
          </div>
        </div>
        <v-expand-transition mode="in-out">
          <div v-if="status.showAll">
            <div class="d-flex pt-sm-4 pt-0">
              <v-list dense flat class="pl-sm-2 py-0 pl-0">
                <v-list-item
                  class="pt-sm-1 px-sm-4 px-1"
                  v-if="userProfile['show_email']"
                >
                  <span
                    class="
                      text-sm-subtitle-1 text-subtitle-2
                      font-weight-bold
                      pr-sm-10 pr-2
                    "
                    >电子邮箱</span
                  >
                  <span
                    class="text-sm-subtitle-1 text-subtitle-2"
                    :style="overflow"
                    >{{ userProfile.email }}</span
                  >
                </v-list-item>
                <v-list-item
                  class="px-sm-4 px-1"
                  v-if="userProfile['show_realname']"
                >
                  <span
                    class="
                      text-sm-subtitle-1 text-subtitle-2
                      font-weight-bold
                      pr-sm-10 pr-2
                    "
                    >真实姓名</span
                  >
                  <span class="text-sm-subtitle-1 text-subtitle-2">{{
                    userProfile.realname
                  }}</span>
                </v-list-item>
                <v-list-item
                  class="px-sm-4 px-1"
                  v-if="userProfile['show_year']"
                >
                  <span
                    class="
                      text-sm-subtitle-1 text-subtitle-2
                      font-weight-bold
                      pr-sm-10 pr-2
                    "
                    >入学时间</span
                  >
                  <span class="text-sm-subtitle-1 text-subtitle-2">{{
                    userProfile.year
                  }}</span>
                </v-list-item>
                <v-list-item
                  class="px-sm-4 px-1"
                  v-if="userProfile['show_grade']"
                >
                  <span
                    class="
                      text-sm-subtitle-1 text-subtitle-2
                      font-weight-bold
                      pr-sm-10 pr-2
                    "
                    >所属年级</span
                  >
                  <span class="text-sm-subtitle-1 text-subtitle-2">{{
                    userProfile.grade
                  }}</span>
                </v-list-item>
                <v-list-item
                  class="px-sm-4 px-1"
                  v-if="
                    !userProfile['show_email'] &
                    !userProfile['show_year'] &
                    !userProfile['show_grade'] &
                    !userProfile['show_realname']
                  "
                >
                  <span class="text-sm-subtitle-1 text-subtitle-2">
                    这个人很神秘，什么资料都没有透露
                  </span>
                </v-list-item>
              </v-list>
            </div>
          </div>
        </v-expand-transition>
        <v-list class="mt-sm-0 mt-n3 py-0 pt-1 pt-sm-4" v-if="!status.showAll">
          <v-list-item link @click="status.showAll = true" class="px-sm-4 px-0">
            <v-icon>{{ statics.icons.mdiChevronDown }}</v-icon>
            <v-list-item-title class="text-sm-subtitle-1 text-subtitle-2"
              >查看详细资料</v-list-item-title
            >
          </v-list-item>
        </v-list>
        <v-list class="mt-sm-0 mt-n3 py-0 pt-1 pt-sm-0" v-if="status.showAll">
          <v-list-item
            link
            @click="status.showAll = false"
            class="px-sm-4 px-0"
          >
            <v-icon>{{ statics.icons.mdiChevronUp }}</v-icon>
            <v-list-item-title class="text-sm-subtitle-1 text-subtitle-2"
              >收起详细资料</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-col>
      <v-col
        sm="3"
        lg="2"
        class="px-0 d-flex justify-end flex-column"
        v-if="!isMobile"
      >
        <div class="d-flex justify-end pr-md-8 pr-sm-5">
          <div class="d-flex justify-end flex-column pb-3 pl-lg-0 pl-md-5">
            <v-btn
              icon
              outlined
              tile
              elevation="2"
              color="primary"
              width="100"
              @click="status.editProfile = true"
            >
              <v-icon size="20">
                {{ statics.icons.mdiAccountEdit }}
              </v-icon>
              <span>个人设置</span>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import useProfileCard from "@/composables/users/profile/useProfileCard";

export default {
  setup() {
    const { userProfile, statics, status } = useProfileCard();
    return { userProfile, statics, status };
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    overflow() {
      if (this.$vuetify.breakpoint.width < 350) {
        return `
          overflow-x: scroll;
          overflow-y: hidden;
          max-height: 22px;
          white-space: nowrap;
          max-width: ${this.$vuetify.breakpoint.width - 171}px;
        `;
      } else {
        return "";
      }
    },
  },
};
</script>