<template>
  <div class="app-container">
    <el-row>
        <el-input style='width:340px;' placeholder="请输入文件名" prefix-icon="el-icon-document" v-model="filename"></el-input>
        <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading">导出选择的 excel</el-button>
    </el-row>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"  border  @selection-change="handleSelectionChange" ref="multipleTable">
        <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="星级" width="110" align="center">
        <template slot-scope="scope">
          <!-- <el-rate v-model="scope.row.star" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate> -->
          {{scope.row.string}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { parseTime } from '@/utils'

export default {
  name: 'selectexcel',
  data() {
    return {
      list: null,
      listLoading: true,
      filename: '',
      downloadLoading: false,
      multipleSelection: []
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getList() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
      import('../../vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', '标题', '作者', '状态', '星级'] // excel 表格头
        const filterVal = ['id', 'title', 'author', 'status', 'string']
        const list = this.multipleSelection
        const data = this.formatJson(filterVal, list) // 自行洗数据 按序排序的一个array数组
        excel.export_json_to_excel(tHeader, data, this.filename)
        this.$refs.multipleTable.clearSelection()
        this.downloadLoading = false
      })
      } else {
        this.$message({
          message: '请选择消息',
          type: 'warning'
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        console.log(j)
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
