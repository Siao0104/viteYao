<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu @select="handleMenuSelect">
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
            <el-menu-item index="utility1010"> <el-icon><Edit /></el-icon>代碼維護 </el-menu-item>
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
          <span>{{userName}}</span>
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
import {CLEAR, GET_USERNAME} from "../store/storeconstants.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed} from "vue";

const router = useRouter();
const store = useStore();

const userName = computed(()=> store.getters[`author/${GET_USERNAME}`])

//登出
const logOut = () => {
  //清除store資料
  store.commit(`auth/${CLEAR}`);
  //清除localStorage資料
  localStorage.clear();
  router.push("/");
  //防止登出時，瀏覽器返回上一頁還能進入
  window.addEventListener('popstate',function () {
    window.history.forward();
  })
}

const handleMenuSelect = (index) => {
  if(index === 'utility1010'){
    console.log("測試用!!!")
  }
}

</script>

<style scoped>
.layout-container {
  position: relative;
  background: url('../assets/maple2.jpg') ;
  background-size: cover;
}

.layout-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7); /* 半透明覆蓋層 */
  pointer-events: none;
}

.layout-container .el-header,
.layout-container .el-aside,
.layout-container .el-main {
  position: relative;
  z-index: 2; /* 確保內容在背景圖片之上 */
}

.layout-container .el-header {
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

.layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
  position: relative;
}

.large-coin {
  font-size: 24px;
  margin-right: 8px;
  margin-top: 1px;
}
</style>
