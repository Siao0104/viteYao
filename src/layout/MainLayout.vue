<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '2']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><icon-menu /></el-icon>開發項目
            </template>
            <el-menu-item><el-icon><Star /></el-icon>ADT</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><setting /></el-icon>設定
            </template>
            <el-menu-item > <el-icon><Edit /></el-icon>代碼維護 </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon class="large-coin">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="logOut">登出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>

        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { Menu as IconMenu, Star, Setting, Edit } from '@element-plus/icons-vue'
import {CLEAR} from "../store/storeconstants.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter();
const store = useStore();
const logOut = () => {
  store.commit(`auth/${CLEAR}`);
  localStorage.clear();
  router.push("/");
  window.addEventListener('popstate',function () {
    window.history.forward();
  })
}
</script>

<style scoped>
.layout-container .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  height: 100vh;
  overflow: hidden;
}
.layout-container .el-menu {
  border-right: none;
}
.layout-container .el-main {
  padding: 0;
}
.layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.large-coin {
  font-size: 24px;
  margin-right: 8px;
  margin-top: 1px;
}
</style>
