<template>
  <div>
    <div class="upper-wrp" >
      <v-card class="info-wrp" elevation="10" color="#d6fdde">
        <v-row>
          <v-col>
            <h1 class="class-title">
              CS100: 计算机编程
            </h1>
            <v-chip
                class="type-chip ml-13 mt-2"
                color="success"
                outlined
                small
            >
              4学分
            </v-chip>
            <v-chip
                class="type-chip ml-3 mt-2"
                color="success"
                outlined
                small
            >
              64课时
            </v-chip>
          </v-col>
          <v-col>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div class="review-wrp">
      <v-tabs centered>
        <v-tab>
          All Groups
        </v-tab>
      </v-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.upper-wrp {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1;
  height: 40vh;
  width: 100%;
  background: rgba(242, 243, 247, 0.8);
}
.info-wrp {
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  height: 90%;
  width: 80%;
  background: linear-gradient(70deg, blue, pink);
  /*background: rgba(0, 206, 209, 0.34);*/
}
.review-wrp{
  width: 100%;
}
.class-title {
  font-size: x-large;
  font-weight: bolder;
  padding-left: 50px;
  padding-top: 50px;
  color: white;
}
.type-chip {
}
</style>
