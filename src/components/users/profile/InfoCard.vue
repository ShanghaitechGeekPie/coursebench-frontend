<template>
  <v-col class="pt-1 d-flex justify-space-between" v-if="!status.editInfo">
    <v-row>
      <v-col class="px-sm-3 px-0 pb-sm-3 pb-0">
        <div class="d-flex justify-space-between">
          <div class="text-sm-h3 text-h5 pt-0 pt-sm-5 pl-sm-6 px-sm-4 px-1">
            {{ userinfo.nickname }}
          </div>
          <div class="d-flex justify-end" v-if="isMobile">
            <div class="d-flex justify-end flex-column pb-0 pr-2">
              <v-btn
                color="primary"
                width="60"
                height="30"
                @click="status.editInfo = true"
              >
                <v-icon size="20">
                  {{ statics.icons.mdiAccountEdit }}
                </v-icon>
                <span>设置</span>
              </v-btn>
            </div>
          </div>
        </div>
        <div class="d-flex pt-sm-4 pt-1">
          <v-list dense flat class="pl-sm-2 py-0 pl-0" v-if="status.showAll">
            <v-list-item class="pt-sm-1 px-sm-4 px-1">
              <span
                class="
                  text-sm-subtitle-1 text-subtitle-2
                  font-weight-black
                  pr-sm-10 pr-2
                "
                >电子邮箱</span
              >
              <span
                class="text-sm-subtitle-1 text-subtitle-2"
                :style="overflow"
                >{{ userinfo.email }}</span
              >
            </v-list-item>
            <v-list-item class="px-sm-4 px-1">
              <span
                class="
                  text-sm-subtitle-1 text-subtitle-2
                  font-weight-black
                  pr-sm-10 pr-2
                "
                >真实姓名</span
              >
              <span class="text-sm-subtitle-1 text-subtitle-2">{{
                userinfo.realname
              }}</span>
            </v-list-item>
            <v-list-item class="px-sm-4 px-1">
              <span
                class="
                  text-sm-subtitle-1 text-subtitle-2
                  font-weight-black
                  pr-sm-10 pr-2
                "
                >入学时间</span
              >
              <span class="text-sm-subtitle-1 text-subtitle-2">{{
                userinfo.year
              }}</span>
            </v-list-item>
            <v-list-item class="px-sm-4 px-1">
              <span
                class="
                  text-sm-subtitle-1 text-subtitle-2
                  font-weight-black
                  pr-sm-10 pr-2
                "
                >所属年级</span
              >
              <span class="text-sm-subtitle-1 text-subtitle-2">{{
                userinfo.grade
              }}</span>
            </v-list-item>
          </v-list>
        </div>
        <div class="mt-sm-0 mt-n3">
          <v-list-item
            link
            v-if="!status.showAll"
            @click="status.showAll = true"
            class="px-sm-4 px-0"
          >
            <v-icon>{{ statics.icons.mdiChevronDown }}</v-icon>
            <v-list-item-title class="text-sm-subtitle-1 text-subtitle-2"
              >查看详细资料</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            link
            v-if="status.showAll"
            @click="status.showAll = false"
            class="px-sm-4 px-0"
          >
            <v-icon>{{ statics.icons.mdiChevronUp }}</v-icon>
            <v-list-item-title class="text-sm-subtitle-1 text-subtitle-2"
              >收起详细资料</v-list-item-title
            >
          </v-list-item>
        </div>
      </v-col>
      <v-col
        sm="3"
        lg="2"
        class="px-0 d-flex justify-end flex-column"
        v-if="!isMobile"
      >
        <div class="d-flex justify-end pr-md-8 pr-sm-5">
          <div class="d-flex justify-end flex-column pb-3 pl-lg-0 pl-md-5">
            <v-btn color="primary" width="100" @click="status.editInfo = true">
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
import useInfoCard from "@/composables/users/useInfoCard";

export default {
  setup() {
    const { statics, userinfo, status } = useInfoCard();
    return { statics, userinfo, status };
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
          max-width: ${ this.$vuetify.breakpoint.width - 171 }px;
        `
      } else {
        return ''
      }
    }
  }
};
</script>