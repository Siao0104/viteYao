<script lang="ts" setup>
import {Setting, UserFilled} from "@element-plus/icons-vue";
import {CLEAR, GET_USERNAME} from "../store/storeconstants.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed} from "vue";

const router = useRouter();
const store = useStore();
const userName = computed(() => store.getters[`auth/${GET_USERNAME}`]);

const emits = defineEmits(['isDrawer']);
const logOut = () => {
  store.commit(`auth/${CLEAR}`);
  localStorage.clear();
  router.push("/");
  window.addEventListener('popstate', function () {
    window.history.forward();
  });
};

const handleDrawer = () => {
  emits('handleOpenDrawer')
}

</script>

<template>
  <div class="toolbar">
    <el-dropdown>
      <div class="custom-avatar">
        <el-icon class="large-coin"><UserFilled/></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click.native="logOut">登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span>{{userName}}</span>
    <el-icon class="large-coin" @click="handleDrawer">
      <setting />
    </el-icon>
  </div>
</template>

<style scoped>
.large-coin {
  font-size: 24px;
  margin-right: 5px;
  margin-left: 8px;
  margin-top: 1px;
  cursor: pointer;
}

.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
  position: relative;
}
</style>