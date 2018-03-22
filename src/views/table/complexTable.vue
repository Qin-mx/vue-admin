<template>
  <div class="app-container">
    <el-row class="filter-container">
      <el-input v-model="title" style="width: 200px;" class="filter-item" placeholder="标题"  @keyup.enter.native="getList"></el-input>
      <el-select clearable  class="filter-item" v-model="listQuery.sort" placeholder="id排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" class="filter-item" @click.native="getList">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" class="filter-item" @click.native="handleCreate">添加</el-button>
      <el-button type="primary" icon="el-icon-download" class="filter-item" @click.native="handleDownload">导出</el-button>
      <el-checkbox-group v-model="checkList" class="filter-item"  style='margin-left:15px;'>
        <el-checkbox label="地址"></el-checkbox>
      </el-checkbox-group>
    </el-row>
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row  style="width: 100%">
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
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
      <el-table-column class-name="status-col" v-for=" item in checkList " :key="item" :label="item" >
        <template slot-scope="scope">
          {{scope.row.address}}
        </template>
      </el-table-column>
      <el-table-column label="页数" width="110" align="center" class-name="fixed-width">
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
      <el-table-column align="center" prop="created_at" label="操作" class-name="fixed-width small-padding">
        <template slot-scope="scope">
             <el-button type="primary" size="small" @click.native="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="success" size="small" v-if="scope.row.status != 'published'" @click.native="handleModifyStatus(scope.row,'published')">发布</el-button>
            <el-button size="small" v-if="scope.row.status != 'draft'" @click.native="handleModifyStatus(scope.row,'draft')">草稿</el-button>
            <el-button type="danger" v-if="scope.row.status != 'deleted'" size="small" @click.native="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Form -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" >
      <el-form :model="form" :rules="rules" ref="dataForm" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" auto-complete="off"></el-input>
        </el-form-item> 
        <el-form-item label="页数" prop="pageviews">
          <el-input v-model.number="form.pageviews" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in statusarr"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { parseTime } from 'utils'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
      },
      sortOptions: [
        { label: '大到小', key: '+id' },
        { label: '小到大', key: '-id' }
      ],
      title: '',
      checkList: [],
      // 遮罩对话框
      dialogFormVisible: false,
      formLabelWidth: '70px',
      form: {
        id: undefined,
        title: '',
        status: 'published',
        pageviews: null,
        author: ''
      },
      statusarr: ['published', 'draft', 'deleted'],
      rules: {
        title: [{ required: true, message: '标题必填', trigger: 'change' }],
        author: [{ required: true, message: '作者必填', trigger: 'change' }],
        pageviews: [{ type: 'number', message: '必须是数字' }]
      },
      dialogStatus: '',
      // 获取当前下标
      dialogIndex: ''
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
  watch: {
    list() {
      return this.list
    }
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    getList() {
      this.listQuery.title = this.title
      this.fetchData()
    },
    // 删除数据
    deleteRow(row) {
      var index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    // 改变发布状态
    handleModifyStatus(row, status) {
      row.status = status
      this.$message({
        type: 'success',
        message: '操作成功'
      })
    },
    // 导出
    handleDownload() {
      this.downloadLoading = true
      import('../../vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', '标题', '作者', '状态', '星级', '页数']
        const filterVal = ['id', 'title', 'author', 'status', 'string', 'pageviews']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel(tHeader, data, this.filename)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    // 编辑
    handleUpdate(row) {
      this.dialogFormVisible = true
      this.form = Object.assign({}, row) // 複製新對象
      this.dialogStatus = 'update'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.dialogIndex = this.list.indexOf(row)
    },
    updateData() {
      this.list.splice(this.dialogIndex, 1) // 先删除 --有api掉api
      this.list.splice(this.dialogIndex, 0, this.form)
      this.dialogFormVisible = false
      this.$notify({
        title: '更新提示',
        message: '更新成功',
        type: 'success'
      })
    },
    // 添加
    handleCreate() {
      this.resetform()
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.list.unshift(this.form)
      this.dialogFormVisible = false
      this.$notify({
        title: '添加提示',
        message: '添加成功',
        type: 'success'
      })
    },
    // 更新
    resetform() {
      this.form = {
        id: undefined,
        title: '',
        status: '',
        pageviews: '',
        author: ''
      }
    }
  }
}
</script>
<style>
.el-form{
  width: 400px;
  margin-left: 50px
}
</style>
