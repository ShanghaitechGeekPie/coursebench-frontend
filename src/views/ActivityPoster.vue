<template>
  <div class="pt-sm-13 pt-6 d-flex justify-center">
    <div
      :style="{ width: $vuetify.breakpoint.width >= 1280 ? '1280px' : '100%' }"
      class="about-container"
    >
      <div
        class="mt-4"
        v-html="useMarkdown(benchReviewerPolicy)"
        style="white-space: pre-line"
      ></div>
    </div>
  </div>
</template>
<script>
import AvatarContainer from '@/components/users/profile/AvatarContainer';
import contributors from '@/assets/contributors.json';
import sponsors from '@/assets/sponsors.json';
import { mdiQqchat, mdiEmail, mdiGithub, mdiWeb } from '@mdi/js';
import {
  parseAvatarLink,
  parseHomeLink,
} from '@/composables/global/useSponsors';
import { openInplace } from '@/composables/global/useExternalUrl';
import useMarkdown from '@/composables/global/useMarkdown';
import { benchReviewerPolicy } from 'Policy';

export default {
  setup() {
    const statics = {
      icons: {
        mdiQqchat,
        mdiEmail,
        mdiGithub,
        mdiWeb,
      },
    };

    return {
      statics,
      sponsors,
      contributors,
      parseHomeLink,
      parseAvatarLink,
      openInplace,
      benchReviewerPolicy,
      useMarkdown,
    };
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

.coursePrettier {
  cursor: pointer;
  background-image: linear-gradient(to right, #7bb4e6, #e6c944, #f3b6cd);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold;
}
</style>
