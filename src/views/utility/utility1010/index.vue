<script lang="ts" setup>
import CodeMst from "../utility1010/CodeMst.vue"
import CodeDtl from "../utility1010/CodeDtl.vue"
import {ref, watch} from 'vue'
import {ComponentSize} from "element-plus";

const mstCurrentPage = ref(1)
const mstPageSize = ref(10)
const dtlCurrentPage = ref(1)
const dtlPageSize = ref(10)
const mstTotalItems = ref(0)
const dtlTotalItems = ref(0)
const size = ref<ComponentSize>('small')
const codeMst = ref(null)
const codeDtl = ref(null)
const defaultTable = ref('mst')

const handleMstSizeChange = (val: number) => {
  mstPageSize.value = val
  codeMst.value.handleCodeMst()
}
const handleMstCurrentChange = (val: number) => {
  mstCurrentPage.value = val
}

const handleUpdateMstPagination = (total: number) => {
  mstTotalItems.value = total
}

const handleMstRowClick = (id: number) => {
  codeDtl.value.handleCodeDtl(id,dtlCurrentPage.value,dtlPageSize.value)
}

const handleDtlSizeChange = (val: number) => {
  dtlPageSize.value = val
  codeDtl.value.handleCodeDtl(codeMst.value.mstId,dtlCurrentPage.value,dtlPageSize.value)
}
const handleDtlCurrentChange = (val: number) => {
  dtlCurrentPage.value = val
  codeDtl.value.handleCodeDtl(codeMst.value.mstId,dtlCurrentPage.value,dtlPageSize.value)
}

const handleUpdateDtlPagination = (total: number) =>{
  dtlTotalItems.value = total
}

const currentTableClick = (table: string) => {
  if(table === 'mst'){
    defaultTable.value = table
  }else if(table === 'dtl'){
    defaultTable.value = table
  }
}

const handleSelectNewRow = () => {
  if(defaultTable.value ==='mst'){
    codeMst.value.handleNewRow()
    codeDtl.value.handleNewRow(codeMst.value.mstId)
  }else if(defaultTable.value === 'dtl'){
    codeDtl.value.handleNewRow()
  }
}
</script>

<template>
  <div class="app-container">
    <div class="ui-up-container">
      <div class="header">
        <h1 class="md-title">UI版型-MD1</h1>
        <el-pagination
            v-model:current-page="mstCurrentPage"
            v-model:page-size="mstPageSize"
            :page-sizes="[5, 10, 20]"
            :background=true
            :size="size"
            layout="sizes, prev, pager, next"
            :total="mstTotalItems"
            @size-change="handleMstSizeChange"
            @current-change="handleMstCurrentChange"
        />
      </div>
      <div class="content">
        <CodeMst
            ref="codeMst"
            :current-page="mstCurrentPage"
            :page-size="mstPageSize"
            @updateMstPagination="handleUpdateMstPagination"
            @mstRowClick="handleMstRowClick"
            @currentTableClick="currentTableClick"
            @handleSelectNewRow="handleSelectNewRow"></CodeMst>
      </div>
    </div>
    <div class="ui-down-container">
      <div class="header">
        <h1 class="md-title">Detail</h1>
        <el-pagination
            v-model:current-page="dtlCurrentPage"
            v-model:page-size="dtlPageSize"
            :page-sizes="[5, 10, 20]"
            :background=true
            :size="size"
            layout="sizes, prev, pager, next"
            :total="dtlTotalItems"
            @size-change="handleDtlSizeChange"
            @current-change="handleDtlCurrentChange"
        />
      </div>
      <div class="content">
        <CodeDtl
            ref="codeDtl"
            @updateDtlPagination="handleUpdateDtlPagination"
            @currentTableClick="currentTableClick"></CodeDtl>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 確保容器佔滿整個視口高度 */
}
.content {
  flex: 1;
  height: 100%; /* 設定固定高度或使用flex來平分空間 */
  overflow-y: hidden; /* 僅在內容溢位時顯示捲動條 */
}
.md-title {
  font-size: 1rem; /* 字體大小 */
  font-weight: bold; /* 字體粗細 */
  color: green; /* 字體顏色 */
  background-color: yellowgreen; /* 背景顏色 */
  padding: 5px 5px; /* 內邊距 */
  margin-bottom: 10px; /* 外邊距 */
  border-radius: 8px; /* 邊框圓角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 陰影 */
  text-align: center; /* 置中 */
  width: 7%;
}
.ui-up-container {
  padding: 10px 10px 50px 10px;
  overflow: hidden;
}
.ui-down-container {
  padding: 10px 10px 150px 10px;
  overflow: hidden;
}
.header {
  display: flex; /* 使用 Flexbox 佈局 */
  justify-content: space-between; /* 兩邊對齊 */
  align-items: center; /* 垂直居中 */
}
</style>