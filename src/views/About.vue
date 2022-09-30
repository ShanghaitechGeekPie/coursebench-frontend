<template>
  <div class="pt-16 d-flex justify-center">
    <div
      :style="{ width: $vuetify.breakpoint.width >= 1280 ? '1280px' : '100%' }"
      class="about-container"
    >
      <div class="d-flex justify-center pt-8">
        <div class="text-sm-h1 text-h2">!!Slogan!!</div>
      </div>
      <div class="d-flex justify-center pt-8 mb-16">
        <div class="text-h4">!!Description!!</div>
      </div>
      <div class="d-flex justify-center">
        <div
          class="mx-sm-8 mx-2"
          :style="{ width: $vuetify.breakpoint.xsOnly ? '40%' : '160px' }"
        >
          <div class="text-h6 d-flex justify-center">
            <div>!!Feature Value!!</div>
          </div>
          <div class="text-body-2 d-flex justify-center">
            <div>!!Feature Item!!</div>
          </div>
        </div>
        <div
          class="mx-sm-8 mx-2"
          :style="{ width: $vuetify.breakpoint.xsOnly ? '40%' : '160px' }"
        >
          <div class="text-h6 d-flex justify-center">
            <div>!!Feature Value!!</div>
          </div>
          <div class="text-body-2 d-flex justify-center">
            <div>!!Feature Item!!</div>
          </div>
        </div>
        <div
          class="mx-sm-8"
          :width="$vuetify.breakpoint.xsOnly ? '40%' : '160'"
          v-if="$vuetify.breakpoint.smAndUp"
        >
          <div class="text-h6 d-flex justify-center">
            <div>!!Feature Value!!</div>
          </div>
          <div class="text-body-2 d-flex justify-center">
            <div>!!Feature Item!!</div>
          </div>
        </div>
        <div
          class="mx-sm-8"
          :width="$vuetify.breakpoint.xsOnly ? '40%' : '160'"
          v-if="$vuetify.breakpoint.smAndUp"
        >
          <div class="text-h6 d-flex justify-center">
            <div>!!Feature Value!!</div>
          </div>
          <div class="text-body-2 d-flex justify-center">
            <div>!!Feature Item!!</div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-center mt-10">
        <v-sheet width="318px" class="pa-6 d-flex justify-center" outlined>
          <div>联系我们？</div>
          <div>
            <v-icon class="ml-3">{{ statics.icons.mdiQqchat }}</v-icon>
            <v-icon class="ml-3">{{ statics.icons.mdiEmail }}</v-icon>
            <v-icon class="ml-3">{{ statics.icons.mdiGithub }}</v-icon>
          </div>
        </v-sheet>
      </div>
      <div class="mt-16">
        <v-sheet
          width="100%"
          height="200px"
          class="text-h3 d-flex justify-center"
          color="grey"
        >
          <div class="d-flex justify-center flex-column">
            <div>!!Poster!!</div>
          </div>
        </v-sheet>
      </div>
      <div class="mt-16">
        <div
          :class="[
            $vuetify.breakpoint.xsOnly
              ? 'about-context-mobile px-4'
              : 'about-context',
          ]"
        >
          <div class="py-8">
            <div class="text-h5">开发人员</div>
            <div class="mt-4 d-sm-flex d-block" style="flex-wrap: wrap">
              <div
                v-for="(contributor, index) in contributors"
                :key="index"
                class="pr-4 pb-sm-4 pb-4 d-flex"
              >
                <AvatarContainer
                  :src="parseAvatarLink(contributor.avatar)"
                  :name="contributor.name"
                  size="32"
                />
                <a
                  :href="parseHomeLink(contributor.home)"
                  :class="[
                    $vuetify.theme.dark
                      ? 'inline-text-white'
                      : 'inline-text-black',
                    'inline-link-hover ml-2 mt-1',
                  ]"
                  >{{ contributor.name }}</a
                >
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="py-8" id="service_term">
            <div class="text-h5">服务条款</div>
            <div class="mt-4">!!TBD!!</div>
          </div>
          <v-divider></v-divider>
          <div class="py-8" id="privacy_policy">
            <div class="text-h5">隐私政策</div>
            <div class="mt-4">!!TBD!!</div>
          </div>
          <v-divider></v-divider>
          <div class="py-8">
            <div class="text-h5">错误反馈</div>
            <div class="mt-4">!!TBD!!</div>
          </div>
          <v-divider></v-divider>
          <div class="py-8">
            <div class="text-h5">友情赞助</div>
            <div class="mt-4">
              <div
                v-for="(sponsor, index) in sponsors"
                :key="index"
                :class="['d-flex', 'justify-center', index === 0 ? '' : 'mt-8']"
              >
                <div>
                  <div class="d-flex justify-center" v-if="sponsor.logo !== ''">
                    <div style="width: 56%">
                      <v-img :src="sponsor.logo"></v-img>
                    </div>
                  </div>
                  <div class="d-flex justify-center mt-2">
                    <a
                      :href="sponsor.home"
                      :class="[
                        $vuetify.theme.dark
                          ? 'inline-text-white'
                          : 'inline-text-black',
                        'inline-link-hover',
                      ]"
                      >{{ sponsor.name }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="py-8">
            <div class="text-h5">赞助我们</div>
            <div class="mt-4">
              如果您觉得我们的网站对您有帮助，欢迎您通过以下方式赞助我们：
              !!TBD!!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AvatarContainer from "@/components/users/profile/AvatarContainer";
import contributors from "@/assets/contributors.json";
import sponsors from "@/assets/sponsors.json";
import { mdiQqchat, mdiEmail, mdiGithub } from "@mdi/js";
import { parseAvatarLink, parseHomeLink } from "@/composables/global/useSponsors";

export default {
  setup() {
    const statics = {
      icons: {
        mdiQqchat,
        mdiEmail,
        mdiGithub,
      },
    };

    return { statics, sponsors, contributors, parseHomeLink, parseAvatarLink };
  },
  components: {
    AvatarContainer,
  },
};
</script>
<style scoped>
.about-context {
  margin-left: 50%;
  transform: translate(-50%, 0);
}

.about-context-mobile {
  width: 100%;
}

.inline-link {
  color: #0067bf;
  cursor: pointer;
  text-decoration-line: none;
}

.inline-link-hover:hover {
  color: #0067bf;
  cursor: pointer;
  text-decoration-line: none;
}

.inline-link-hover {
  cursor: pointer;
  text-decoration-line: none;
}

.inline-text-black {
  color: #000000de;
}

.inline-text-white {
  color: #ffffff;
}
</style>