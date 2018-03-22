<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="页数" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
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
      <el-table-column align="center" prop="created_at" label="时间  " width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
            <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.title"></el-input>
                <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
            </template>
            <span v-else>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
       <el-table-column
        label="操作"
        width="100">
      <template slot-scope="scope">
        <el-button  @click.native.prevent="deleteRow(scope.$index, list)" type="text" size="small">删除</el-button>
        <el-button  type="text" size="small" v-if="scope.row.edit" @click="modifyEdit(scope.row)">确定</el-button>
        <el-button v-else type="text" size="small" @click='scope.row.edit=!scope.row.edit'>编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true
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
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.list = this.list.map(v => {
          this.$set(v, 'edit', false)
          v.originalTitle = v.title // 另外保存，防止双向绑定
          return v
        })
      })
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: '未修改',
        type: 'warning'
      })
    },
    modifyEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: '已修改',
        type: 'scuucess'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
