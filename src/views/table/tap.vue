<template>
    <div class="tab-container">
        <el-tabs v-model="activeName2" type="border-card" style="margin-top:15px" >
            <el-tab-pane v-for="item in tabNapOptions" :key="item.key" :label="item.label" :name="item.key">
                <keep-alive>
                    <tab-pane v-if="activeName2 == item.key" :type="item.key"></tab-pane>
                </keep-alive>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import tabPane from './tabPane'
    export default {
      name: 'tap',
      components: {
        tabPane
      },
      data() {
        return {
          activeName2: 'user',
          tabNapOptions: [
            { label: '用户管理', key: 'user' },
            { label: '配置管理', key: 'configuration ' },
            { label: '角色管理', key: 'role' },
            { label: '定时任务补偿', key: 'timing' }
          ]
        }
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event)
        }
      }
    }
</script>
<style scoped>
    .tab-container{
        margin: 30px;
    }
</style>
