<template>
  <v-container>
    <v-row>
      <v-col cols="12" :class="dense ? 'px-sm-4 px-2 pb-0 pt-0' : ''">
        <span
          :class="['text-body-1', markdown ? 'markdown-body' : '', 'text-container']"
          ref="textContainer"
          v-html="markdown ? useMarkdown(text) : text"
          :style="{
            'max-height': (status.isOverflow & !status.showAll ? maxHeight : statics.inf) + 'px'
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
        <v-sheet
          class="overlay"
          :style="{
            background: `linear-gradient(transparent, ${theme.isDark ? '#1e1e1e' : 'rgba(255, 255, 255, 1)'})`
          }"
          v-if="!status.showAll"
        >
        </v-sheet>
        <div :class="['d-flex', 'justify-space-between', 'mt-n8']" v-if="!status.showAll">
          <slot :overflow="status.isOverflow">
            <div></div>
          </slot>
          <v-chip outlined label :small="dense" @click="dialog ? (status.showDialog = true) : (status.showAll = true)">
            <v-icon :dense="dense" :small="dense">
              {{ dialog ? statics.icons.mdiFullscreen : statics.icons.mdiChevronDown }}
            </v-icon>
            <span class="text-body-2">阅读全文</span>
          </v-chip>
        </div>
        <div :class="['d-flex', 'justify-space-between', dense ? 'pr-sm-1' : '']" v-if="status.showAll">
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
            transition="slide-y-reverse-transition"
            scrollable
            width="50vw"
            :fullscreen="breakpoint.name === 'xs'"
          >
            <v-card tile flat>
              <v-card-title class="pa-0" :style="{ background: theme.isDark ? '#1e1e1e' : '#ffffff' }">
                <v-toolbar elevation="">
                  <v-icon @click="status.showDialog = false" style="transform: translate(0, 2px)">
                    {{ statics.icons.mdiClose }}
                  </v-icon>
                  <v-toolbar-title class="pl-4"> 阅读全文 </v-toolbar-title>
                </v-toolbar>
              </v-card-title>
              <v-card-text
                class="px-sm-6 px-4 pt-3"
                ref="textDialog"
                :style="{ background: theme.isDark ? '#1e1e1e' : '#ffffff' }"
              >
                <span class="text-h5">
                  <v-icon size="32" style="transform: translate(0, -2px)">{{ statics.icons.mdiSubtitlesOutline }}</v-icon>
                  <span class="pl-2">{{ title }}</span>
                </span>
                <span
                  v-html="markdown ? useMarkdown(text) : text"
                  :class="['text-body-1', markdown ? 'markdown-body' : '', 'text-dialog', 'pt-sm-0', 'pt-2']"
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
import useTextContainer from "@/composables/users/comment/useTextContainer"
import useMarkdown from "@/composables/global/useMarkdown"
import useAfterRender from "@/composables/global/useAfterRender"

export default {
  setup() {
    const { statics, status } = useTextContainer()
    return { statics, status, useMarkdown }
  },
  data() {
    return {
      breakpoint: this.$vuetify.breakpoint,
      theme: this.$vuetify.theme
    }
  },
  props: {
    text: {
      type: String,
      default: ""
    },
    dense: {
      type: Boolean,
      default: false
    },
    markdown: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: [Number, String],
      default: 100
    },
    dialog: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    }
  },
  mounted() {
    useAfterRender(() => {
      if (this.$refs.textContainer.offsetHeight > this.maxHeight) {
        this.status.isOverflow = true
      }
    }, {
      retry: true
    })
  }
}
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
}
</style>
