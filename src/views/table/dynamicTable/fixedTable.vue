<template>
  <div class="app-container">
    <div class="filter-container">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="姓名"></el-checkbox>
        <el-checkbox label="地址"></el-checkbox>
        <el-checkbox label="城市"></el-checkbox>
      </el-checkbox-group>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date"  label="日期" width="180"></el-table-column>
      <el-table-column v-for="item in formThead" :key="item" :label="item">
        <template slot-scope="scope">
          {{scope.row[(item == "姓名"?'name':(item=="地址"?'address':(item=="城市"?'province':'')))]}}
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>

  <script>
    const defaultcheckList = []
    export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            province: '上海'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            province: '上海'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          formOptions: ['姓名', '地址', '城市'],
          checkList: defaultcheckList,
          formThead: defaultcheckList // 默认表头
        }
      },
      watch: {
        checkList(valArr) {
          this.formThead = this.formOptions.filter(i => valArr.indexOf(i) >= 0) // 判断
        }
      }
    }
  </script>
