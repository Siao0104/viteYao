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
                <template #date-cell=" { data,date } ">
                  <span>{{ obtainDay(data.day) }}</span>
                  <div v-for="(item,index) in calendarData" :key="index">
                    <div v-if="item.executeDay === data.day" :class="getCellClass(item)">
                      {{ item.remark }}
                    </div>
                  </div>
                </template>
              </el-calendar>
            </div>
            <div class="right-panel">
              <el-scrollbar>
                <el-table :data="paginatedData">
                  <el-table-column prop="executeDay" label="Date" width="140" />
                  <el-table-column prop="remark" label="remark" />
                </el-table>
                <div class="pagination-container">
                  <el-pagination
                      :current-page="currentPage"
                      :page-size="pageSize"
                       :total="calendarData.length"
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
  <PersonalDrawer :isDrawer.sync="isDrawer" @update:isDrawer="val => isDrawer = val" @resetCalendar="resetCalendar"></PersonalDrawer>
</template>

<script lang="ts" setup>
import { Menu as IconMenu, Star, Setting, Edit, UserFilled } from '@element-plus/icons-vue'
import {CLEAR, GET_ACCOUNT, GET_USERNAME} from "../store/storeconstants.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {computed, onMounted, ref} from "vue";
import { ElCalendar, CalendarDateType, CalendarInstance} from "element-plus";
import elementUiImage from '../assets/elementui.png';
import githubImage from '../assets/github.png';
import PersonalDrawer from "../components/PersonalDrawer.vue";
import serviceApi from "../request/request.js";
import {uiGetAllCalendar} from "../api/api.js";


const router = useRouter();
const store = useStore();
const calendar = ref<CalendarInstance>()
const calendarData = ref([]);
const currentPage = ref(1);
const pageSize = ref(12);
const paginatedData = computed(()=>{
  const start = (currentPage.value-1)*pageSize.value;
  const end = start + pageSize.value;
  return calendarData.value.slice(start,end);
})
const isDrawer = ref(false);
const userName = computed(() => store.getters[`auth/${GET_USERNAME}`]);
const userAccount = computed(() => store.getters[`auth/${GET_ACCOUNT}`]);

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

//取月曆中的日期
const obtainDay = (date) => {
  const dateParts = date.split('-');
  return dateParts[dateParts.length-1];
}

const getCellClass = (item) => {
  return item.enabled == 1 ? 'important-cell' : 'normal-cell';
}

const handleDrawer = () => {
  isDrawer.value = true;
}

const handleCalendarData = async (account) =>{
  const response = await serviceApi.get(`${uiGetAllCalendar}${account.value}`);
  calendarData.value = response.data;
}

const resetCalendar = () => {
  handleCalendarData(userAccount);
}

onMounted(()=>{
  handleCalendarData(userAccount);
})
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
  margin-right: 5px;
  margin-left: 8px;
  margin-top: 1px;
  cursor: pointer;
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

.important-cell {
  background-color: orange;
  color: black;
  font-size: 12px;
}

.normal-cell {
  background-color: lightblue;
  color: black;
  font-size: 12px;
}
</style>