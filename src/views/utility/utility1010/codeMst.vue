<template>
  <el-table
      highlight-current-row
      :data="tableData"
      class="table-style"
      :header-cell-style="getHeaderCellStyle"
      @row-click="handleRowClick">
    <el-table-column label="代碼" prop="code" sortable>
      <template #default="scope">
        <el-input v-model="scope.row.code" @input="handleRowStatusChange(scope.row)"/>
      </template>
    </el-table-column>
    <el-table-column label="代碼描述" prop="codeDesc" sortable>
      <template #default="scope">
        <el-input v-model="scope.row.codeDesc" @input="handleRowStatusChange(scope.row)"/>
      </template>
    </el-table-column>
    <el-table-column label="生效否" prop="enabled" sortable>
      <template #default="scope">
        <el-switch
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            :model-value="scope.row.enabled === 'Y'"
            @change="handleSwitchChange(scope.row)"
            inline-prompt
            active-text="Y"
            inactive-text="N"/>
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <div class="header-button">
          <el-button size="small" @click="handleNewRow"><el-icon><Plus/></el-icon>新增</el-button>
          <el-button size="small" style="margin-left: 1px" @click="handleSave"><el-icon><Check/></el-icon>保存</el-button>
          <el-input clearable @change="handleSearch" v-model="search" size="small" placeholder="查詢(代碼/生效否)" />
        </div>
      </template>
      <template #default="scope">
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
        >
          <el-icon><DeleteFilled/></el-icon>
          刪除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { getHeaderCellStyle } from '../../utils/commcss'
import {Plus,Check, DeleteFilled} from "@element-plus/icons-vue";
import {ref, reactive, onMounted, watch} from 'vue'
import serviceApi from "../../../request/request";
import {uiGetAllCodeMstPageable, uiSaveCodeMst, uiDeleteCodeMst} from "../../../api/api";
import showMessage from "../../../components/message/message";
import { changeRowStatus } from '../../utils/commmethod'
interface Code {
  id: number
  version: number
  code: string
  codeDesc: string
  enabled: string
  rowStatus: string
}
let tableData = reactive<Code[]>([])
const search = ref('')

const props = defineProps({
  currentPage: Number,
  pageSize: Number,
})

const emits = defineEmits(['updateMstPagination'])

const handleSearch = (value: string) => {
  search.value = value
  handleCodeMst()
}

const handleRowStatusChange = (row) => {
  changeRowStatus(row)
}

const handleSwitchChange = (row) => {
  row.enabled = row.enabled === 'Y' ? 'N' : 'Y';
  changeRowStatus(row)
}

const handleNewRow = () => {
  const newRow: Code = {
    id: 0,
    version: 0,
    code: '',
    codeDesc: '',
    enabled: 'Y',
    rowStatus: 'C'
  }
  tableData.unshift(newRow)
}

const handleDelete = async (index: number, row: Code) => {
  const response = await serviceApi.delete(`${uiDeleteCodeMst}${row.id}`)
  if(response.status === 200){
    showMessage(response.data,"success")
    await handleCodeMst()
  }else{
    showMessage(response.data,"error")
  }
}

const handleSave = async () => {
  const filteredData = tableData.filter((data) => data.rowStatus === 'C' || data.rowStatus === 'U')
  const response = await serviceApi.post(uiSaveCodeMst, filteredData);
  if(response.status === 200){
    showMessage(response.data,"success")
    await handleCodeMst()
  }else{
    showMessage(response.data,"error")
  }
}

const handleCodeMst = async () => {
  const searchParams = {
    dataType: search.value,
    page: props.currentPage,
    size: props.pageSize,
  }
  const response = await serviceApi.post(uiGetAllCodeMstPageable,searchParams)
  if(response.status === 200){
    tableData.splice(0,tableData.length,...response.data.data)
    emits('updateMstPagination', response.data.totalItems)
  }
}

const handleRowClick = (row: Code) => {
  console.log(row,'當前行資料')
}

// 監聽分頁參數的變化並重新查詢
watch(() => [props.currentPage, props.pageSize], handleCodeMst)

onMounted(() => {
  handleCodeMst()
})

defineExpose({
  handleCodeMst,
})
</script>

<style scoped>
.table-style {
  width: 100%;
  max-height: 300px;
  height: 300px;
  overflow: auto;
}
.header-button {
  display: flex;
  gap: 5px;
  align-items: center;
}
</style>