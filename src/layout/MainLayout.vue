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
            <el-menu-item index="utility1010"> <el-icon><Edit /></el-icon>程式碼維護 </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header class="header">
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
          <span>{{ userName }}</span>
        </div>
      </el-header>

      <el-main class="main">
        <el-scrollbar>
          <div class="top-section">
            <el-carousel height="150px">
              <el-carousel-item v-for="(item,index) in images" :key="index">
                <img :src="item.src" class="carousel-image" @click="externalWebPage(item.url)">
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="bottom-section">
            <div class="left-panel">
              <el-calendar ref="calendar">
                <template #header="{ date }">
                  <span>行事曆</span>
                  <span>{{ date }}</span>
                  <el-button-group>
                    <el-button size="small" @click="selectDate('prev-year')">去年</el-button>
                    <el-button size="small" @click="selectDate('prev-month')">上個月</el-button>
                    <el-button size="small" @click="selectDate('today')">今天</el-button>
                    <el-button size="small" @click="selectDate('next-month')">下個月</el-button>
                    <el-button size="small" @click="selectDate('next-year')">明年</el-button>
                  </el-button-group>
                </template>
              </el-calendar>
            </div>
            <div class="right-panel">
              <el-scrollbar>
                <el-table :data="paginatedData">
                  <el-table-column prop="date" label="Date" width="140" />
                  <el-table-column prop="name" label="Name" width="120" />
                  <el-table-column prop="address" label="Address" />
                </el-table>
                <div class="pagination-container">
                  <el-pagination
                      :current-page="currentPage"
                      :page-size="pageSize"
                      :total="tableData.length"
                      @current-change="handlePageChange"
                      layout="prev, pager, next"
                  />
                </div>
              </el-scrollbar>
            </div>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { Menu as IconMenu, Star, Setting, Edit } from '@element-plus/icons-vue'
import { CLEAR, GET_USERNAME } from "../store/storeconstants.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {computed, ref} from "vue";
import {CalendarDateType, CalendarInstance} from "element-plus";
import elementUiImage from '../assets/elementui.png';
import githubImage from '../assets/github.png';

const router = useRouter();
const store = useStore();
const calendar = ref<CalendarInstance>()

const tableData = ref([
  { date: '2016-05-02', name: 'Tom', address: '1' },
  { date: '2016-05-04', name: 'John', address: '2' },
  { date: '2016-05-01', name: 'Doe', address: '3' },
  { date: '2016-05-02', name: 'Tom', address: '4' },
  { date: '2016-05-04', name: 'John', address: '5' },
  { date: '2016-05-01', name: 'Doe', address: '6' },
  { date: '2016-05-02', name: 'Tom', address: '7' },
  { date: '2016-05-04', name: 'John', address: '8' },
  { date: '2016-05-01', name: 'Doe', address: '9' },
  { date: '2016-05-02', name: 'Tom', address: '10' },
  { date: '2016-05-04', name: 'John', address: '11' },
  { date: '2016-05-01', name: 'Doe', address: '12' },
  { date: '2016-05-02', name: 'Tom', address: '13' },
  { date: '2016-05-04', name: 'John', address: '14' },
  { date: '2016-05-01', name: 'Doe', address: '15' },
  { date: '2016-05-01', name: 'Doe', address: '16' }
]);

const currentPage = ref(1);
const pageSize = ref(12);
const paginatedData = computed(()=>{
  const start = (currentPage.value-1)*pageSize.value;
  const end = start + pageSize.value;
  return tableData.value.slice(start,end);
})

const userName = computed(() => store.getters[`author/${GET_USERNAME}`]);

const images = [
  {
    src: elementUiImage,
    url: 'https://element-plus.org/en-US/',
  },
  {
    src: githubImage,
    url: 'https://github.com/',
  }
]

const logOut = () => {
  store.commit(`auth/${CLEAR}`);
  localStorage.clear();
  router.push("/");
  window.addEventListener('popstate', function () {
    window.history.forward();
  });
};

//開啟外部網站
const externalWebPage = (url) =>{
  window.open(url,'_blank');
}

//點選左側菜單開啟TABS
const handleMenuSelect = (index) => {
  if (index === 'utility1010') {
    console.log("測試用!!!");
  }
};

//日曆組件日期選擇
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}

const handlePageChange = (page) => {
  currentPage.value = page;
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

.top-section {
  height: 20%;
}

.bottom-section {
  display: flex;
  height: 80%;
}

.left-panel {
  flex: 2;
  padding: 10px;
}

.right-panel {
  flex: 1;
  padding: 10px;
}

.carousel-image {
  width: auto;
  height: 100%;
  max-height: 150px; /* 設置最大高度，保持圖片比例 */
  cursor: pointer;
  object-fit: contain; /* 使圖片按比例縮放 */
}

.el-pagination {
  text-align: center;
}

.pagination-container {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
</style>