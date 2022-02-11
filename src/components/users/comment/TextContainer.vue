<template>
  <v-container>
    <v-row>
      <v-col cols="12" :class="dense ? 'px-sm-4 px-2 pt-sm-2 pb-0 pt-0' : ''">
        <span
          :class="[
            'text-body-1',
            markdown ? 'markdown-body' : '',
            'text-container',
          ]"
          ref="textContainer"
          v-html="markdown ? useMarkdown(text) : text"
          :style="{
            'max-height':
              (status.isOverflow & !status.showAll ? maxHeight : statics.inf) +
              'px',
          }"
        ></span>
      </v-col>
    </v-row>
    <v-row v-if="!status.isOverflow">
      <v-col cols="12" :class="dense ? 'px-sm-4 px-2 py-0' : ''">
        <slot :overflow="status.isOverflow">
          <div></div>
        </slot>
      </v-col>
    </v-row>
    <v-row v-if="status.isOverflow">
      <v-col cols="12" :class="dense ? 'px-sm-4 px-2 py-0' : ''">
        <v-sheet class="overlay" v-if="!status.showAll"> </v-sheet>
        <div
          :class="[
            'd-flex',
            'justify-space-between',
            dense ? 'mt-n8 pr-sm-1' : '',
          ]"
          v-if="!status.showAll"
        >
          <slot :overflow="status.isOverflow">
            <div></div>
          </slot>
          <v-chip
            outlined
            label
            :small="dense"
            @click="
              dialog ? (status.showDialog = true) : (status.showAll = true)
            "
          >
            <v-icon :dense="dense" :small="dense">
              {{
                dialog
                  ? statics.icons.mdiFullscreen
                  : statics.icons.mdiChevronDown
              }}
            </v-icon>
            <span class="text-body-2">阅读全文</span>
          </v-chip>
        </div>
        <div
          :class="['d-flex', 'justify-space-between', dense ? 'pr-sm-1' : '']"
          v-if="status.showAll"
        >
          <slot :overflow="status.isOverflow">
            <div></div>
          </slot>
          <v-chip outlined label :small="dense" @click="status.showAll = false">
            <v-icon :dense="dense" :small="dense">
              {{ statics.icons.mdiChevronUp }}
            </v-icon>
            <span class="text-body-2">收起</span>
          </v-chip>
        </div>
        <div>
          <v-dialog
            v-model="status.showDialog"
            :width="screen.dialogWidth"
            transition="slide-y-reverse-transition"
            scrollable
          >
            <v-card tile flat :max-height="screen.dialogMaxHeight">
              <v-card-title
                class="
                  d-flex
                  justify-space-between
                  px-sm-6 px-2
                  pt-sm-4 pt-2
                  pb-sm-2 pb-1
                "
              >
                <span> 阅读全文 </span>
                <v-icon @click="status.showDialog = false">
                  {{ statics.icons.mdiFullscreenExit }}
                </v-icon>
              </v-card-title>
              <v-card-text class="px-sm-6 px-2">
                <span
                  v-html="markdown ? useMarkdown(text) : text"
                  :class="[
                    'text-body-1',
                    markdown ? 'markdown-body' : '',
                    'text-dialog',
                  ]"
                ></span>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import useTextContainer from "@/composables/users/comment/useTextContainer";
import useMarkdown from "@/composables/global/useMarkdown";

export default {
  setup() {
    const { statics, status } = useTextContainer();
    return { statics, status, useMarkdown };
  },
  props: {
    text: {
      type: String,
      default: "",
    },
    dense: {
      type: Boolean,
      default: false,
    },
    markdown: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: [Number, String],
      default: 100,
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    overflowDetect() {
      if (this.$refs.textContainer.offsetHeight > this.maxHeight) {
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
  computed: {
    screen() {
      if (this.$vuetify.breakpoint.width >= 1264) {
        return {
          dialogWidth: "60%",
          dialogMaxHeight: "",
        };
      } else if (this.$vuetify.breakpoint.width >= 960) {
        return {
          dialogWidth: "720px",
          dialogMaxHeight: "72vh",
        };
      } else if (this.$vuetify.breakpoint.width >= 600) {
        return {
          dialogWidth: "600px",
          dialogMaxHeight: "72vh",
        };
      } else {
        return {
          dialogWidth: "90%",
          dialogMaxHeight: `${
            (this.$vuetify.breakpoint.width / 100).toFixed(0) * 15
          }vh`,
        };
      }
    },
  },
};
</script>
<style scoped>
.text-container {
  display: block;
  overflow: hidden;
}

.text-dialog {
  display: block;
}

.overlay {
  height: 40px;
  transform: translate(0, -40px);
  background: linear-gradient(transparent, rgba(255, 255, 255, 1));
}
</style>