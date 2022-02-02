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
          <v-col class="pa-0">
            <TextContainer :text="comment.comment" markdown dense />
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
import TextContainer from '@/components/users/comment/TextContainer';

export default {
  setup() {
    const { statics, status } = useCommentCardContent();
    return { statics, status };
  },
  props: {
    comment: Object,
  },
  computed: {
    screen() {
      if (this.$vuetify.breakpoint.width > 420) {
        return {
          cols: 6,
        };
      } else if (this.$vuetify.breakpoint.width > 360) {
        return {
          cols: 7,
        };
      } else {
        return {
          cols: 12,
        };
      }
    },
  },
  components: {
    TextContainer, 
  }
};
</script>