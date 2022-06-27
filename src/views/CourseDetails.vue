<template>
  <div>
    <div class="upper-wrp d-flex justify-center align-end">
      <DetailCard class="mt-sm-10 pb-sm-8 pt-sm-2" />
    </div>
    <div>
      <v-tabs centered v-model="currentTab">
        <v-tab v-for="(teacher, index) in teachers" :key="index">{{ teacher.name }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab" class="transparent d-flex align-center justify-center">
        <v-tab-item v-for="(item, index) in teachers" :key="index">
          <CommentBoard :comments="alignedComment[currentTab]"></CommentBoard>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import DetailCard from "@/components/courses/DetailCard.vue"
import CommentBoard from "@/components/courses/CommentBoard"
import useCourseDetails from "@/composables/courses/comment/useCourseDetails"

export default {
  components: { DetailCard, CommentBoard },
  setup() {
    const { teachers, comments } = useCourseDetails()
    return { teachers, comments }
  },
  data() {
    return {
      currentTab: 0
    }    
  },
  computed: {
    alignedComment() {
      let result = new Array(this.teachers.length)
      let reverseMap = {}
      for (let i = 0; i < result.length; ++i) {
        result[i] = []
        if (i > 0) {
          reverseMap[this.teachers[i].id] = i
        }
      }
      result[0] = this.comments
      this.comments.forEach((value) => {
        for (const x of value.group.teachers) {
          result[reverseMap[x.id]].push(value)
        }
      })
      return result
    }
  }
}
</script>

<style scoped>
.upper-wrp {
  width: 100%;
  background: rgba(242, 243, 247, 0.8);
}
</style>
