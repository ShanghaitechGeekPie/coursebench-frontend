<template>
  <v-card class="ma-0" elevation="0" outlined>
    <v-card-text>
      <v-row class="">
        <v-col class="" md="6" cols="12">
          <div
            class="mr-md-6 d-flex flex-column justify-space-between"
            style="height: 100%"
          >
            <div>
              <v-sheet
                class="mt-1 mb-0 mb-lg-0"
                color="#e2e2e2"
                height="38px"
                width="50%"
              ></v-sheet>
              <div class="pt-2">
                <v-sheet color="#e2e2e2" width="40%" height="18px"></v-sheet>
              </div>
            </div>
            <div class="">
              <div class="pt-8">
                <div class="subtitle-1 font-weight-regular pb-1">
                  <v-sheet color="#e2e2e2" width="20%" height="18px"></v-sheet>
                </div>
                <div class="text-caption font-weight-regular pt-1">
                  <v-sheet color="#e2e2e2" width="25%" height="14px"></v-sheet>
                </div>
              </div>
              <div class="pt-3">
                <div class="subtitle-1 font-weight-regular pb-1">
                  <v-sheet color="#e2e2e2" width="20%" height="18px"></v-sheet>
                </div>
                <div class="text-caption font-weight-regular pt-1">
                  <v-sheet color="#e2e2e2" width="60%" height="14px"></v-sheet>
                </div>
              </div>
            </div>
          </div>
        </v-col>
        <v-divider
          vertical
          inset
          class="mb-2 mt-3 d-none d-md-block"
        ></v-divider>
        <v-col class="" md="6" cols="12">
          <div class="ml-md-6">
            <div class="subtitle-1 font-weight-regular pb-1">
              <v-sheet color="#e2e2e2" width="36%" height="18px"></v-sheet>
            </div>
            <div style="font-family: Arial, serif" class="pt-md-2 mb-2">
              <v-sheet
                class="mt-1 mb-1 mb-lg-0"
                color="#e2e2e2"
                height="38px"
                width="28%"
              ></v-sheet>
            </div>
            <div>
              <div v-for="index in 4" :key="index">
                <v-sheet
                  class="my-2"
                  color="#e2e2e2"
                  width="100%"
                  height="12px"
                ></v-sheet>
              </div>
            </div>
            <v-row no-gutters class="pt-md-6 pt-4">
              <v-sheet
                class="my-1"
                color="#e2e2e2"
                width="100%"
                height="16px"
              ></v-sheet>
              <v-sheet
                class="mt-1"
                color="#e2e2e2"
                width="100%"
                height="16px"
              ></v-sheet>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>
