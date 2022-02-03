<template>
  <v-container>
    <v-row>
      <v-col cols="12" :class="dense ? 'px-sm-4 px-2 pt-sm-2 pb-0 pt-0' : ''">
        <span
          :class="['text-body-1', markdown ? 'markdown-body' : '', 'text-container']"
          ref="textContainer"
          v-html="markdown ? useMarkdown(text) : text"
          :style="{
            'max-height':
              (status.isOverflow & !status.showAll ? maxHeight : statics.inf) + 'px', 
          }"
        ></span>
      </v-col>
    </v-row>
    <v-row v-if="status.isOverflow">
      <v-col cols="12" :class="dense ? 'px-sm-4 px-2 py-0' : ''">
        <v-sheet class="overlay" v-if="!status.showAll"> </v-sheet>
        <div :class="['d-flex', 'justify-end', dense ? 'mt-n8 pr-sm-1' : '']" v-if="!status.showAll">
          <v-chip outlined label :small="dense" @click="status.showAll = true">
            <v-icon :dense="dense" :small="dense">
              {{ statics.icons.mdiChevronDown }}
            </v-icon>
            <span class="text-body-2">阅读全文</span>
          </v-chip>
        </div>
        <div :class="['d-flex', 'justify-end', dense ? 'pr-sm-1' : '']" v-if="status.showAll">
          <v-chip outlined label :small="dense" @click="status.showAll = false">
            <v-icon :dense="dense" :small="dense">
              {{ statics.icons.mdiChevronUp }}
            </v-icon>
            <span class="text-body-2">收起</span>
          </v-chip>
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
    const { statics, status } = useTextContainer()
    return { statics, status, useMarkdown }
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
      type: [ Number, String ], 
      default: 120
    }
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
}
</script>
<style scoped>
.text-container {
  display: block;
  overflow: hidden;
}

.overlay {
  height: 40px;
  transform: translate(0, -40px);
  background: linear-gradient(transparent, rgba(255, 255, 255, 1));
}
</style>