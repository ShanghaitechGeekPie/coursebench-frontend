<template>
  <div style="min-height: 100%">  
    <ImageLoader v-if="status.profileLoading || status.commentLoading" />
    <BackgroundImage v-else />
    <div style="flex-wrap: wrap" class="d-flex justify-center">
      <div class="pa-lg-3 pb-3">
        <div :style="{ width: $vuetify.breakpoint.mdAndDown ? '100vw' : '360px' }">
          <v-card
            :style="adoptiveCardPosition"
            flat
            outlined
            :width="$vuetify.breakpoint.mdAndDown ? '100vw' : '360px'"
            class="py-6 px-7"
          >
            <DetailLoader v-if="status.profileLoading || status.commentLoading" />
            <Profile v-else />
            <StatisticLoader v-if="status.profileLoading || status.commentLoading" />
            <StatisticCard v-else />
          </v-card>
        </div>
      </div>
      <div class="pa-3">
        <v-container class="py-sm-3 py-0">
          <v-row>
            <v-col class="pl-sm-0 pr-lg-3 pr-0 pl-0 pr-0 pt-0 pb-3">
              <SelectLoader 
                :width="$vuetify.breakpoint.width - 24 > 800 ? '800px' : $vuetify.breakpoint.width - 24 + 'px'"
                v-if="status.profileLoading || status.commentLoading" 
              />
              <SelectBar 
                :width="$vuetify.breakpoint.width - 24 > 800 ? '800px' : $vuetify.breakpoint.width - 24 + 'px'"
                :key-items="sortStatics.sortKeyItem"
                :order-items="sortStatics.orderItem[commentFilterStatus.sortKey]"
                :sort-key.sync="commentFilterStatus.sortKey"
                :sort-order.sync="commentFilterStatus.order"
                v-else 
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pl-sm-0 pr-lg-3 pr-0 pl-0 pr-0 pt-sm-3 pt-0">
              <div v-if="status.profileLoading || status.commentLoading">
                <div v-for="index in 2" :key="index">
                  <CommentLoader height="290px" />
                </div> 
              </div>
              <div v-else-if="commentText.length === 0">
                <Nothing class="pt-16" />
              </div>
              <div v-else>
                <div v-for="(comment, index) in commentText" :key="comment.id">       
                  <v-fade-transition>
                    <CommentCard
                      :comment="comment"
                      v-if="
                        commentFilterStatus.selected.some(
                          (school) => school === comment.course.institute
                        )
                      "
                    />
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
import Profile from "@/components/users/profile/Profile";
import BackgroundImage from "@/components/users/profile/BackgroundImage";
import CommentCard from "@/components/users/comment/CommentCard";
import SelectBar from "@/components/courses/all/SelectBar";
import StatisticCard from "@/components/users/comment/StatisticCard";
import useUser from "@/composables/users/useUser";
import { sortStatics } from "@/composables/global/useCommentSort";
import DetailLoader from "@/components/teachers/loader/DetailLoader"
import SelectLoader from "@/components/teachers/loader/SelectLoader"
import StatisticLoader from "@/components/teachers/loader/StatisticLoader"
import ImageLoader from "@/components/teachers/loader/ImageLoader";
import CommentLoader from "@/components/teachers/loader/CommentLoader";
import Nothing from "@/components/global/Nothing"

export default {
  components: {
    Profile,
    Comment,
    BackgroundImage,
    StatisticCard,
    CommentCard,
    SelectBar,
    DetailLoader, 
    SelectLoader, 
    StatisticLoader, 
    ImageLoader,
    CommentLoader, 
    Nothing
  },
  setup() {
    const { commentText, commentFilterStatus, status } = useUser();
    return { commentText, commentFilterStatus, status, sortStatics };
  },
  data() {
    return {
      scrollTop: document.documentElement.scrollTop,
    };
  },
  mounted() {
    document.addEventListener("scroll", () => {
      this.scrollTop = document.documentElement.scrollTop;
    });
  },
  computed: {
    adoptiveCardPosition() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return {};
      } else if (this.scrollTop <= 40) {
        return {
          transform: "translate(0, -160px)",
        };
      } else {
        return {
          position: "fixed",
          top: "90px",
        };
      }
    }
  }
};
</script>
