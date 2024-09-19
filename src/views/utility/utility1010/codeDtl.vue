<template>
  <el-table highlight-current-row :data="filterTableData" class="table-style" :header-cell-style="getHeaderCellStyle">
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
      <template #header>
        <div class="header-button">
          <el-button size="small" @click="handleNewRow"><el-icon><Plus/></el-icon>新增</el-button>
          <el-button size="small" style="margin-left: 1px"><el-icon><Check/></el-icon>保存</el-button>
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
import {DeleteFilled, Plus, Check} from "@element-plus/icons-vue";
import {computed, reactive, ref} from 'vue'

interface Code {
  code: string
  codeDesc: string
  enabled: string
}

const tableData = reactive<Code[]>([
  {
    code: 'test',
    codeDesc: '測試',
    enabled: 'Y',
  },
  {
    code: 'test1',
    codeDesc: '測試1',
    enabled: 'N',
  },
  {
    code: 'test2',
    codeDesc: '測試2',
    enabled: 'N',
  },
  {
    code: 'qaq',
    codeDesc: 'QAQ',
    enabled: 'N',
  },
])

const search = ref('')
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.code.toLowerCase().includes(search.value.toLowerCase()) ||
            data.enabled.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleDelete = (index: number, row: Code) => {
  console.log(index, row)
}
const handleNewRow = () => {
  const newRow: Code = {
    code: '',
    codeDesc: '',
    enabled: 'Y',
  }
  tableData.unshift(newRow)
}
</script>

<style scoped>
.table-style {
  width: 100%;
  max-height: 400px;
  height: 400px;
  overflow: auto;
}
.header-button {
  display: flex;
  gap: 5px;
  align-items: center;
}
</style>