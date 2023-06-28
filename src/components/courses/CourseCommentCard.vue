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
                v-if="global.isLogin"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="py-0 px-2"
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
import { domToCanvas } from "modern-screenshot";
import { shareLogoDark, shareLogoLight, shareLogoTitle } from "@/composables/global/useShare";

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
      const logo = this.$vuetify.theme.dark ? shareLogoDark : shareLogoLight;
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
          const [logoImg, wordImg] = await Promise.all([this.loadImage(logo), this.loadImage(shareLogoTitle)]);
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
