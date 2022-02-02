<template>
  <v-card tile>
    <v-card-title class="pa-sm-4 pa-2 pb-sm-0">
      <v-container>
        <v-row>
          <v-col cols="6" sm="4" class="pa-0 d-flex justify-start">
            <span class="text-body-2">
              {{ comment["user_score"] }}人赞同了该评价
            </span>
          </v-col>
          <v-col cols="6" sm="8" class="pa-0 d-flex justify-end">
            <span class="text-body-2 pr-2">{{ comment["course_name"] }}</span>
            <span class="text-body-2">{{ comment.time }}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-card-text class="pa-0">
      <v-container>
        <v-row>
          <v-col cols="12" class="px-sm-4 px-2 pt-sm-2 pb-0 pt-0">
            <span
              class="text-body-1 markdown-body comment-container"
              ref="commentContainer"
              v-html="useMarkdown(comment.comment)"
              :style="{
                'max-height': maxHeight,
              }"
            ></span>
          </v-col>
        </v-row>
        <v-row v-if="status.isOverflow">
          <v-col cols="12" class="px-sm-4 px-2 py-0">
            <v-sheet class="overlay" v-if="!status.showAll"> </v-sheet>
            <div
              class="d-flex justify-end mt-n8 pr-sm-1"
              v-if="!status.showAll"
            >
              <v-chip outlined label small @click="status.showAll = true">
                <v-icon dense small>
                  {{ statics.icons.mdiChevronDown }}
                </v-icon>
                <span class="text-body-2">阅读全文</span>
              </v-chip>
            </div>
            <div class="d-flex justify-end pr-sm-1" v-if="status.showAll">
              <v-chip outlined label small @click="status.showAll = false">
                <v-icon dense small>
                  {{ statics.icons.mdiChevronUp }}
                </v-icon>
                <span class="text-body-2">收起</span>
              </v-chip>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 pl-sm-1 pb-2 pt-sm-2" :cols="screen.cols" sm="12">
            <v-container>
              <v-row>
                <v-col cols="6" sm="2" md="3" lg="2" class="py-0 pl-sm-3 pl-2">
                  <div>
                    <span class="pr-sm-2 pr-1 font-weight-bold text-body-2"
                      >课程质量</span
                    >
                    <span>{{ comment.score[0].toFixed(1) }}</span>
                  </div>
                </v-col>
                <v-col
                  cols="6"
                  sm="2"
                  md="3"
                  lg="2"
                  class="py-0 d-sm-block d-flex justify-end"
                >
                  <div>
                    <span class="pr-sm-2 pr-1 font-weight-bold text-body-2"
                      >课业负担</span
                    >
                    <span>{{ comment.score[1].toFixed(1) }}</span>
                  </div>
                </v-col>
                <v-col cols="6" sm="2" md="3" lg="2" class="py-0 pl-sm-3 pl-2">
                  <div>
                    <span class="pr-sm-2 pr-1 font-weight-bold text-body-2"
                      >考核难度</span
                    >
                    <span>{{ comment.score[2].toFixed(1) }}</span>
                  </div>
                </v-col>
                <v-col
                  cols="6"
                  sm="2"
                  md="3"
                  lg="2"
                  class="py-0 d-sm-block d-flex justify-end"
                >
                  <div>
                    <span class="pr-sm-2 pr-1 font-weight-bold text-body-2"
                      >给分情况</span
                    >
                    <span>{{ comment.score[3].toFixed(1) }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
import useCommentCardContent from "@/composables/users/comment/useCommentCardContent";
import useMarkdown from "@/composables/global/useMarkdown";

export default {
  setup() {
    const { statics, status } = useCommentCardContent();
    return { statics, status, useMarkdown };
  },
  props: {
    comment: Object,
  },
  computed: {
    screen() {
      if (this.$vuetify.breakpoint.width >= 600) {
        return {
          isMobile: false,
          cols: 6,
        };
      } else if (this.$vuetify.breakpoint.width > 420) {
        return {
          isMobile: true,
          cols: 6,
        };
      } else if (this.$vuetify.breakpoint.width > 360) {
        return {
          isMobile: true,
          cols: 7,
        };
      } else {
        return {
          isMobile: true,
          cols: 12,
        };
      }
    },
    maxHeight() {
      if (this.status.isOverflow) {
        if (this.status.showAll) {
          return "100000px";
        } else {
          if (this.screen.isMobile) {
            return "100px";
          } else {
            return "400px";
          }
        }
      } else {
        return "100000px";
      }
    },
  },
  methods: {
    overflowDetect() {
      if (
        this.$refs.commentContainer.offsetHeight >
        (this.screen.isMobile ? 100 : 400)
      ) {
        this.status.isOverflow = true;
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.overflowDetect();
      setTimeout(() => {
        this.overflowDetect();
      }, 50);
    }, 50);
  },
};
</script>
<style scoped>
.comment-container {
  display: block;
  overflow: hidden;
}

.overlay {
  height: 40px;
  transform: translate(0, -40px);
  background: linear-gradient(transparent, rgba(255, 255, 255, 1));
}
</style>