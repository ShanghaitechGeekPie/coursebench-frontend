<template>
  <v-lazy>
    <v-card class="mb-3" flat outlined ref="commentCard">
      <CommentCardBar :comment="comment">
        <template v-slot:headerAvatar="{ localComment }">
          <div
            class="d-flex justify-space-between router-container"
            style="cursor: pointer"
            @click="
              comment.user
                ? $router.push({ path: `/user/${comment.user.id}` })
                : null
            "
          >
            <AvatarContainer
              :name="localComment.user ? useUserName(localComment.user) : '?'"
              :src="localComment.user ? localComment.user.avatar : ''"
              small
              tile
              slice
              size="38"
            />
            <div class="pl-2">
              <div class="text-body-1 font-weight-bold overflow-ellipsis">
                {{
                  useUserName(localComment.user) +
                  (localComment.user && localComment.is_anonymous
                    ? "(匿名)"
                    : "")
                }}
              </div>
              <div class="text-caption mt-n1 single-line-limit">
                {{
                  localComment.user
                    ? gradeItems[localComment.user.grade]
                    : "由匿名用户发送，请仔细分辨其真实性"
                }}
              </div>
            </div>
          </div>
        </template>
      </CommentCardBar>
      <CommentCardContent :comment="comment">
        <template #title v-if="comment.is_fold && foldComment">
          <div></div>
        </template>
        <template #content v-if="comment.is_fold && foldComment">
          <div class="px-sm-4 px-2 pb-2 pt-2">
            <CommentFold @click="foldComment = false" />
            <v-row>
              <v-col class="pa-0 pl-3 pb-2 pt-sm-8 pt-2" cols="12">
                <v-icon size="16">
                  {{ statics.icons.mdiSchoolOutline }}
                </v-icon>
                <span
                  v-for="(teacher, index) in comment.group.teachers"
                  class="pl-1 router-container text-caption font-weight-bold"
                  :key="index"
                  @click="$router.push({ path: `/teacher/${teacher.id}` })"
                >
                  {{ teacher.name }}
                </span>
              </v-col>
            </v-row>
          </div>
        </template>
        <template v-slot:footerNote="footerNote">
          <div class="d-flex justify-end" style="flex-wrap: wrap">
            <div class="d-flex">
              <v-btn
                class="like-button mr-1"
                small
                :color="formStatus.likeStatus === 1 ? 'primary' : 'primary'"
                elevation="0"
                :text="formStatus.likeStatus !== 1"
                :outlined="formStatus.likeStatus !== 1"
                @click="onClickLike"
                :disabled="!global.isLogin"
              >
                <div class="px-0">
                  <v-icon size="30" style="">
                    {{ footerNote.statics.icons.mdiTriangleSmallUp }}
                  </v-icon>
                  <span
                    class="text-caption"
                    style="transform: translate(-7px, 0); display: inline-block"
                  >
                    赞同
                    {{
                      footerNote.comment.like -
                      footerNote.comment.dislike +
                      (formStatus.likeStatus === 1 ? 1 : 0) -
                      (formStatus.likeStatus === 2 ? 1 : 0) -
                      (comment.like_status === 1 ? 1 : 0) +
                      (comment.like_status === 2 ? 1 : 0)
                    }}
                  </span>
                </div>
              </v-btn>
              <v-btn
                class="like-button mr-1"
                small
                :color="formStatus.likeStatus === 2 ? 'primary' : 'primary'"
                elevation="0"
                :text="formStatus.likeStatus !== 2"
                :outlined="formStatus.likeStatus !== 2"
                @click="onClickDislike"
                :min-width="30"
                :disabled="!global.isLogin"
              >
                <v-icon size="30" style="">
                  {{ footerNote.statics.icons.mdiTriangleSmallDown }}
                </v-icon>
              </v-btn>
              <v-menu
                bottom
                offset-y
                class="mr-n1 mr-sm-3"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="like-button"
                    small
                    color="primary"
                    elevation="0"
                    outlined
                    :min-width="30"
                    v-on="on"
                    v-bind="attrs"
                    @click="onClickShare"
                    ref="shareButton"
                  >
                    <v-icon size="20" style="">
                      {{ footerNote.statics.icons.mdiShare }}
                    </v-icon>
                    {{ $vuetify.breakpoint.xsOnly ? "" : "分享" }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    color="primary"
                    @click="onClickSharePath"
                  >
                    复制链接
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    color="primary"
                    @click="onClickShareImage"
                  >
                    下载评论图片
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    color="primary"
                  >
                    二维码:
                  </v-list-item>
                  <v-list-item
                    color="primary"
                    class="mt-n2"
                  >
                    <canvas ref="qrcode"></canvas>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div class="mr-sm-1">
              <v-icon size="15" style="">
                {{ footerNote.statics.icons.mdiClockOutline }}
              </v-icon>
              <span class="text-caption"> {{ footerNote.semester }} </span>
            </div>
          </div>
        </template>
      </CommentCardContent>
    </v-card>
  </v-lazy>
</template>
<script>
import CommentCardContent from "@/components/users/comment/CommentCardContent";
import CommentCardBar from "@/components/users/comment/CommentCardBar";
import CommentFold from "@/components/users/comment/CommentFold";
import AvatarContainer from "@/components/users/profile/AvatarContainer";
import useCourseCommentCard from "@/composables/courses/comment/useCourseCommentCard";
import useUserName from "@/composables/global/useUserName";
import { gradeItems } from "@/composables/global/useStaticData";
import { inject, ref } from "vue";
import QRCode from "qrcode";
import {domToCanvas} from "modern-screenshot";

export default {
  props: {
    comment: Object,
  },
  components: {
    CommentCardContent,
    CommentCardBar,
    AvatarContainer,
    CommentFold,
  },
  setup() {
    const { doLike, doDislike, doUndo, formStatus, statics } =
      useCourseCommentCard();
    const global = inject("global");

    const showSnackbar = inject("showSnackbar");

    const foldComment = ref(true);
    return {
      foldComment,
      doLike,
      doDislike,
      doUndo,
      formStatus,
      useUserName,
      gradeItems,
      global,
      statics,
      showSnackbar,
    };
  },
  mounted() {
    this.formStatus.likeStatus = this.comment.like_status;
  },
  methods: {
    isMobile() {
      return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    },
    onClickLike() {
      if (this.formStatus.likeStatus === 1) {
        this.doUndo(this.comment.id);
      } else {
        this.doLike(this.comment.id);
      }
    },
    onClickDislike() {
      if (this.formStatus.likeStatus === 2) {
        this.doUndo(this.comment.id);
      } else {
        this.doDislike(this.comment.id);
      }
    },
    onClickShare() {
      this.$nextTick(() => {
        // must render the qrcode in double nextClick, but I don't know why.
        this.$nextTick(() => {
          // render the QRCode here
          let sharePath = `https://coursebench.geekpie.club${this.$route.path}?answer=${this.comment.id}`;
          QRCode.toCanvas(this.$refs.qrcode, sharePath);
        });
      });

    },
    onClickSharePath() {
      // 获取分享的路径, 带一个query的参数, 但是手机可能会有限制不允许读取剪切板, 导致复制失败
      if (this.isMobile()) {
        this.showSnackbar("warning", "请注意, 由于手机端限制, 可能导致复制失败");
      }
      let index = this.comment.id;
      let sharePath = `https://coursebench.geekpie.club${this.$route.path}?answer=${index}`;
      navigator.clipboard.writeText(sharePath);
      this.showSnackbar("success", "复制成功!");
    },
    async loadImage(base64) {
      // 使用Promise异步加载图片, 保证图片加载成功
      return new Promise((resolve) => {
        const img = new Image();
        img.src = base64;

        function check() {
          if (img.complete) {
            return resolve(img);
          } else {
            // 逐帧检查
            requestAnimationFrame(check);
          }
        }

        check();
      });
    },
    async onClickShareImage() {
      // hard, shit code! fuck!
      const word = "data:image/png;base64,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";
      const dark_logo = "data:image/png;base64,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";
      const light_logo = "data:image/png;base64,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";
      const logo = this.$vuetify.theme.dark ? dark_logo : light_logo;
      const color = this.$vuetify.theme.dark ? "#212121" : "#ffffff";
      this.$refs.shareButton.$el.style.display = "none";
      // vue3中获取到refs指向的element只能用.$el来获取, 直接用refs会导致出错(类型VueComponent不是Element)
      domToCanvas(this.$refs.commentCard.$el, {scale: 2})
        .then(async canvas => {
          document.body.appendChild(canvas)
          // qrcode
          let sharePath = `https://coursebench.geekpie.club${this.$route.path}?answer=${this.comment.id}`;
          const QRCanvas = document.createElement("canvas");
          QRCode.toCanvas(QRCanvas, sharePath);

          const logoCanvas = document.createElement("canvas");
          logoCanvas.width = Math.max(180 + 196 + 164 + 18 + 20, canvas.width);
          logoCanvas.height = 164 + 23 + 14;
          const lctx = logoCanvas.getContext("2d");
          //text
          lctx.save()
          lctx.font = "normal 15px 'PingFang SC"
          lctx.fillStyle = "#787878"
          const text1 = `扫描二维码打开coursebench`
          const text2 = `查看更多关于${this.comment.course.name}的评论`
          const maxLen = Math.max(lctx.measureText(text1).width, lctx.measureText(text2).width)
          const textX = logoCanvas.width - 164 - 20 - 22 - maxLen;
          const textY = logoCanvas.height - 35;
          lctx.fillText(text1, textX, textY)
          lctx.fillText(text2, textX, textY + 20)
          lctx.restore()
          // logo
          const [logoImg, wordImg] = await Promise.all([this.loadImage(logo), this.loadImage(word)]);
          // 预留边界margin:18,23, logoImg宽度:180,高度:62, wordImg宽度180,高度36
          lctx.drawImage(logoImg, 18, 23);
          lctx.drawImage(wordImg, 18, 164 + 23 - 36);

          // combine
          const combineCanvas = document.createElement("canvas");
          combineCanvas.width = logoCanvas.width;
          combineCanvas.height = canvas.height + logoCanvas.height;
          const ctx = combineCanvas.getContext("2d");
          ctx.save()
          ctx.fillStyle = color
          ctx.fillRect(0, 0, combineCanvas.width, combineCanvas.height)
          ctx.restore()
          ctx.drawImage(logoCanvas, 0, 0);
          ctx.drawImage(canvas, 0, logoCanvas.height);
          const qrcodeX = combineCanvas.width - QRCanvas.width - 20;
          ctx.drawImage(QRCanvas, qrcodeX, 23);

          // download
          const imgUrl = combineCanvas.toDataURL("image/png");
          let tempLink = document.createElement("a");// 创建一个a标签
          tempLink.style.display = "none";
          tempLink.href = imgUrl;
          tempLink.setAttribute("download", this.comment.course.name);// 给a标签添加下载属性
          if (typeof tempLink.download === "undefined") {
            tempLink.setAttribute("target", "_blank");
          }
          document.body.appendChild(tempLink);// 将a标签添加到body当中
          tempLink.click();// 启动下载
          document.body.removeChild(tempLink);// 下载完毕删除a标签
          window.URL.revokeObjectURL(imgUrl);
        }).then(() => {
        this.$refs.shareButton.$el.style.display = "flex";
      });
    },
  },
};
</script>
<style scoped>
.single-line-limit {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.like-button {
  padding: 0 !important;
}
</style>
