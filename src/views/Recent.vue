<template>
  <div style="min-height: 100%">
    <ImageLoader v-if="status.commentLoading" />
    <BackgroundImage
      :src="$vuetify.theme.dark ? backgroundDark : backgroundLight"
      v-else
    />
    <div style="flex-wrap: wrap" class="d-flex justify-center">
      <div class="pa-3">
        <v-container class="py-sm-3 py-0">
          <v-row>
            <v-col class="pl-sm-0 pr-lg-3 pr-0 pl-0 pr-0 pt-0 pb-3">
              <v-card
                :width="
                  $vuetify.breakpoint.width - 24 > 800
                    ? '800px'
                    : $vuetify.breakpoint.width - 24 + 'px'
                "
              >
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pl-sm-0 pr-lg-3 pr-0 pl-0 pr-0 py-0">
              <div
                v-if="
                  global.userProfile.is_admin ||
                  global.userProfile.is_community_admin
                "
              >
                <ManageCard />
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pl-sm-0 pr-lg-3 pr-0 pl-0 pr-0 pt-sm-3 pt-0">
              <div v-if="status.commentLoading">
                <div v-for="index in 2" :key="index">
                  <CommentLoader height="290px" />
                </div>
              </div>
              <div v-else-if="commentText.length === 0">
                <Nothing class="py-16" />
              </div>
              <div v-else>
                <div v-for="(comment, index) in commentText" :key="comment.id">
                  <v-fade-transition>
                    <CommentCard :comment="comment" />
                  </v-fade-transition>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundImage from '@/components/teachers/detail/BackgroundImage';
import CommentCard from '@/components/users/comment/CommentCard';
import ImageLoader from '@/components/teachers/loader/ImageLoader';
import CommentLoader from '@/components/teachers/loader/CommentLoader';
import ManageCard from '@/components/courses/ManageCard';
import Nothing from '@/components/global/Nothing';
import backgroundDark from '@/assets/user-background-dark.svg';
import backgroundLight from '@/assets/user-background-light.svg';
import useCommentRecent from '@/composables/courses/comment/useCommentRecent';
import { provide } from 'vue';
import { mockDataManager } from '@/composables/global/usePhantomData';

export default {
  components: {
    BackgroundImage,
    CommentCard,
    ImageLoader,
    CommentLoader,
    Nothing,
    ManageCard,
  },
  setup() {
    const { commentText, status, global } = useCommentRecent();
    
    // 使用mock数据
    if (mockDataManager.isEnabled()) {
      commentText.value = mockDataManager.getData('comments');
      status.commentLoading = false;
    }
    
    provide('courseCommentText', commentText);
    return { commentText, status, global, backgroundDark, backgroundLight };
  },
  data() {
    return {
      scrollTop: document.documentElement.scrollTop,
    };
  },
  mounted() {
    document.addEventListener('scroll', () => {
      this.scrollTop = document.documentElement.scrollTop;
    });
  },
  computed: {
    adoptiveCardPosition() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return {};
      } else if (this.scrollTop <= 40) {
        return {
          transform: 'translate(0, -160px)',
        };
      } else {
        return {
          position: 'fixed',
          top: '90px',
        };
      }
    },
  },
};
</script>
