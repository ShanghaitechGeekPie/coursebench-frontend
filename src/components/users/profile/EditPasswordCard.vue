<template>
  <v-card>
    <v-card-title class="px-sm-8 px-2">修改密码</v-card-title>
      <v-card-text class="px-sm-8 px-2 py-0">
        <v-container>
        <v-row>
          <v-col cols="12" class="pa-0">
            <v-list dense flat class="pa-0">
              <v-list-item class="px-0 pb-0">
                <v-text-field
                  label="旧密码"
                  type="password"
                  v-model="status.password.oldPassword"
                  dense
                ></v-text-field>
              </v-list-item>
              <v-list-item class="px-0 pb-0">
                <v-text-field
                  label="新密码"
                  type="password"
                  v-model="status.password.newPassword"
                  class="pt-sm-3 pt-0"
                  dense
                ></v-text-field>
              </v-list-item dense>
              <v-list-item class="px-0 pb-0">
                <v-text-field
                  label="确认密码"
                  type="password"
                  v-model="status.password.repPassword"
                  class="pt-sm-3 pt-0"
                  dense
                ></v-text-field>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="px-sm-6 px-2 pt-sm-2 pt-0">
      <v-btn text @click="doReset(), $emit('back')" class="ml-sm-0 ml-n2">上一步</v-btn>
      <v-spacer></v-spacer>
      <v-btn text @click="$emit('next'), $emit('sync', status.password)">下一步</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import useEditPasswordCard from "@/composables/users/profile/useEditPasswordCard"

export default {
  setup() {
    const { statics, status, doReset } = useEditPasswordCard()
    return { statics, status, doReset }
  }
}
</script>