<template>
  <div class="app-container">
    <el-tabs v-model="activeName" >
        <el-tab-pane label="剪切板插件" name="first">
            <el-input v-model="inputData1" style="width:400px"></el-input>
            <el-button type="primary"  @click='handleCopy(inputData1,$event)'>复制</el-button>
        </el-tab-pane>
        <el-tab-pane label="自定义事件剪切板" name="v-first">
            <el-input v-model="inputData2" style="width:400px"></el-input>
            <el-button type="primary" v-clipboard:copy='inputData2' v-clipboard:success="clipboardSuccess">复制</el-button>
        </el-tab-pane>
        <el-tab-pane label="剪切板vue插件" name="second">
            <el-input v-model="inputData3" style="width:400px"></el-input>
            <el-button type="primary"
                v-clipboard:copy="inputData3"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
            >复制</el-button>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import clip from 'utils/clipboard'
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
export default {
  name: 'clipboard',
  directives: {
    clipboard
  },
  data() {
    return {
      activeName: 'first',
      inputData1: '复制内容1',
      inputData2: '复制内容2',
      inputData3: '复制内容3'
    }
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    },
    onCopy() {
      this.$message({
        message: '复制完成',
        type: 'success',
        duration: 1500
      })
    },
    onError() {
      this.$message({
        message: '复制失败',
        type: 'error'
      })
    }
  }
}
</script>