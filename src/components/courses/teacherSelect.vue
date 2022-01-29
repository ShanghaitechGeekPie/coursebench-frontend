<template>
  <div class="font-weight-bold white--text mx-2">
    <div class="ml-10">
      授课老师:
    </div>
    <div class="ml-10">
      <v-chip-group
          v-model="model"
          column
          multiple
      >
        <v-chip
            v-for="teacher in teachers"
            :key="teacher"
            filter
            outlined
            class="white--text"
        >
          {{teacher.name}}
        </v-chip>
      </v-chip-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "teacherSelect",
  data() {
    return {
      model: 0,
      teachers: [
        {name: '高盛华'},
        {name: '粱骏睿'},
        {name: '娄鑫'},
        {name: '刘闯'},
        {name: '野兽先辈'},
        {name: '林弘扬'},
        {name: '关云长'},
      ]
    }
  }
}
</script>

<style scoped>

</style>
