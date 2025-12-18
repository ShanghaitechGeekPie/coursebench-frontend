<template>
  <div style="min-height: 100%">
    <div
      style="flex-wrap: wrap"
      class="d-flex justify-center flex-row-reverse pt-sm-13 pt-6"
    >
      <div class="pa-lg-3 pb-3">
        <div
          :class="[
            $vuetify.breakpoint.mdAndDown ? '' : 'statistic-card-container',
          ]"
        >
          <div
            v-if="status.loading"
            :style="{
              width: $vuetify.breakpoint.mdAndDown
                ? '100%'
                : '360px',
            }"
          >
            <v-card class="pt-6 pb-8 px-6" outlined flat>
              <v-sheet
                color="#e2e2e2"
                class="mx-lg-1 mx-2 mb-3"
                height="30px"
                width="80px"
              ></v-sheet>
            </v-card>
          </div>
          <v-card v-else outlined flat>
            <v-card-text>
              <div class="text-h5 font-weight-bold mb-4">教师列表</div>
              <div class="text-body-2">
                共有 {{ teacherText.length }} 位教师
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
      <div class="pa-3">
        <v-container class="py-sm-3 py-0">
          <v-row>
            <v-col class="pl-sm-0 pr-lg-3 pr-0 pl-0 pr-0 pt-0 pb-3">
              <div v-if="status.loading">
                <div v-for="index in 2" :key="index">
                  <v-card class="mb-3" outlined flat height="200px">
                    <v-card-text>
                      <div class="d-flex">
                        <v-sheet color="#e2e2e2" width="60px" height="60px" class="mr-4"></v-sheet>
                        <div>
                          <v-sheet color="#e2e2e2" width="120px" height="20px" class="mb-2"></v-sheet>
                          <v-sheet color="#e2e2e2" width="80px" height="16px"></v-sheet>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
              </div>
              <div v-else-if="teacherText.length === 0">
                <Nothing class="py-16" />
              </div>
              <div v-else>
                <div v-for="teacher in teacherText" :key="teacher.id">
                  <v-card class="mb-3" outlined flat @click="$router.push(`/teacher/${teacher.id}`)">
                    <v-card-text>
                      <div class="d-flex">
                        <v-avatar size="60" class="mr-4">
                          <v-img :src="teacher.avatar"></v-img>
                        </v-avatar>
                        <div>
                          <div class="text-h6 font-weight-bold">{{ teacher.name }}</div>
                          <div class="text-body-2 grey--text">{{ teacher.job }}</div>
                          <div class="text-body-2 grey--text">{{ teacher.institute }}</div>
                          <div class="text-body-2 mt-2">{{ teacher.introduction }}</div>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
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
import Nothing from '@/components/global/Nothing';
import { ref, reactive, onMounted } from 'vue';
import useFetching from '@/composables/global/useFetching';
import useWatching from '@/composables/global/useWatching';

export default {
  components: {
    Nothing,
  },
  setup() {
    const teacherText = ref([]);
    const status = reactive({
      loading: true,
    });

    onMounted(() => {
      const { status: fetchStatus, data } = useFetching(['teachers'], '/teacher/all');
      
      useWatching(fetchStatus, () => {
        if (fetchStatus.value === 'success') {
          status.loading = false;
        } else if (fetchStatus.value === 'error') {
          status.loading = false;
        }
      });
      
      useWatching(data, () => {
        if (data.value && data.value.data) {
          teacherText.value = data.value.data;
        }
      });
    });

    return {
      teacherText,
      status,
    };
  },
};
</script>

<style scoped>
.statistic-card-container {
  width: 360px;
}
</style>
