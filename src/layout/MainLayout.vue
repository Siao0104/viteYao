<template>
  <el-container class="layout-container">
    <Sidebar/>
    <el-container>

      <el-header class="header">
        <HeaderBar @handleOpenDrawer="handleOpenDrawer"/>
      </el-header>

      <el-main class="main">
        <MainBar ref="mainBar"/>
      </el-main>
    </el-container>
  </el-container>
  <PersonalDrawer :isDrawer.sync="isDrawer" @update:isDrawer="val => isDrawer = val" @resetCalendar="resetCalendar"></PersonalDrawer>
</template>

<script lang="ts" setup>
import {GET_ACCOUNT} from "../store/storeconstants.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {computed, ref} from "vue";
import PersonalDrawer from "../components/PersonalDrawer.vue";
import Sidebar from "./Sidebar.vue";
import HeaderBar from "./HeaderBar.vue";
import MainBar from "./MainBar.vue";

const router = useRouter();
const store = useStore();
const isDrawer = ref(false);
const userAccount = computed(() => store.getters[`auth/${GET_ACCOUNT}`]);
const mainBar = ref(null);

//開啟右側抽屜
const handleOpenDrawer = () => {
  isDrawer.value = true;
}

const resetCalendar = () => {
  mainBar.value.handleGetCalendar(userAccount);
}
</script>

<style scoped>
.layout-container {
  position: relative;
  background: url('../assets/maple2.jpg');
  background-size: cover;
}

.layout-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  pointer-events: none;
}

.layout-container .el-header,
.layout-container .el-aside,
.layout-container .el-main {
  position: relative;
  z-index: 2;
}

.layout-container .el-header {
  display: flex;
  justify-content: flex-end;
  color: var(--el-text-color-primary);
}

.layout-container .el-aside {
  height: 100vh;
  overflow: hidden;
  color: var(--el-text-color-primary);
}

.layout-container .el-main {
  padding: 0;
}
</style>