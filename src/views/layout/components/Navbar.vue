<template>
  <el-menu class="navbar" mode="horizontal">
    <header class="title">
      后台管理系统
    </header>
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <top-nav-bar></top-nav-bar>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from 'components/Breadcrumb'
import Hamburger from 'components/Hamburger'
import TopNavBar from './TopNavBar'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    TopNavBar
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  data() {
    return {
      content: 'navbar'
    }
  },
  methods: {
    // 在vuex中处理
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  // 专门应对返回顶部
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  padding-bottom: 50px;
  .title{
    float:left;
    width: 180px;
    text-align: center;
    font-weight: bold;
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
}
</style>

