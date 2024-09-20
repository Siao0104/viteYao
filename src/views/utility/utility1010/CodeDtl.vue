<template>
  <el-table
      highlight-current-row
      :data="tableData"
      class="table-style"
      :header-cell-style="getHeaderCellStyle"
      @row-click="handleRowClick">
    <el-table-column label="代碼" prop="code">
      <template #default="scope">
        <el-input v-model="scope.row.code" />
      </template>
    </el-table-column>
    <el-table-column label="代碼描述" prop="codeDesc">
      <template #default="scope">
        <el-input v-model="scope.row.codeDesc" />
      </template>
    </el-table-column>
    <el-table-column label="生效否" prop="enabled">
      <template #default="scope">
        <el-switch
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            v-model="scope.row.enabled"
            inline-prompt
            active-text="Y"
            inactive-text="N"/>
      </template>
    </el-table-column>
    <el-table-column align="right">
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
import {DeleteFilled, Plus, Check} from "@element-plus/icons-vue"
import {reactive} from 'vue'
import serviceApi from "../../../request/request"
import { uiGetAllCodeDtlPageable, uiDeleteCodeDtl } from '../../../api/api'
import showMessage from "../../../components/message/message"

interface Code {
  id: number
  version: number
  code: string
  codeDesc: string
  enabled: string
  codeMstId: number
  rowStatus: string
}
const tableData = reactive<Code[]>([])
const emits = defineEmits(['updateDtlPagination','dtlRowClick','currentTableClick'])

const handleDelete = async (index: number, row: Code) => {
  const response = await serviceApi.delete(`${uiDeleteCodeDtl}${row.id}/${row.codeMstId}`)
  if(response.status === 200){
    showMessage(response.data,"success")
    await handleCodeDtl(row.codeMstId,1,10)
  }else{
    showMessage(response.data,"error")
  }
}
const handleNewRow = (codeMstId: number) => {
  const newRow: Code = {
    id: 0,
    version: 0,
    code: '',
    codeDesc: '',
    enabled: 'Y',
    codeMstId: codeMstId,
    rowStatus: 'C'
  }
  tableData.unshift(newRow)
}

const handleCodeDtl = async (id: number,page: number,pageSize: number) => {
  const searchParams = {
    codeMstId: id,
    page: page,
    size: pageSize,
  }
  const response = await serviceApi.post(uiGetAllCodeDtlPageable,searchParams)
  if(response.status === 200){
    tableData.splice(0,tableData.length,...response.data.data)
    emits('updateDtlPagination', response.data.totalItems)
  }
}

const handleRowClick = () => {
  emits('currentTableClick', 'dtl')
}

defineExpose({
  handleCodeDtl,
  handleNewRow
})
</script>

<style scoped>
.table-style {
  width: 100%;
  max-height: 350px;
  height: 350px;
  overflow: auto;
}
.header-button {
  display: flex;
  gap: 5px;
  align-items: center;
}
</style>