<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row>
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
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Drag" width="80">
        <template slot-scope="scope">
         <i class="el-icon-rank"></i>
        </template>
      </el-table-column>
    </el-table>
    <div class='show-d'>默认顺序:  {{ oldList}}</div>
    <div class='show-d'> 拖拽以后的顺序: {{newList}}</div>
    <div></div>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Sortable from 'sortablejs'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      sortable: null,
      oldList: [],
      newList: []
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
        this.listLoading = false
        this.list = response.data.items
        // this.oldList = this.list.map(v => v.id)
        this.oldList = Object.keys(this.list)
        this.newList = this.oldList.slice()
        this.$nextTick(() => {
          this.SetSorttable()
        })
      })
    },
    SetSorttable() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // 添加一个类名
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
          // 处理在火狐的bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => { // 监听end事件 手动维护列表
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    }
  }
}
</script>
<style scoped>
.show-d{
  margin-top: 25px;
}
</style>
