import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

// 在测试环境下不需要使用懒加载，懒加载会造成webpack太慢，只在生成环境使用

/* Layout */
import Layout from 'views/layout/Layout'

/**
* hidden: true                   当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面(默认 false)
* redirect: noredirect           当设置 noredirect 的时候该路由不会在面包屑导航中出现
* name:'router-name'             设定路由的名字，一定要填写不然 使用 <keep-alive> 时会出现各种问题
* meta : {
    roles: ['admin','editor']   设置该路由进入的权限，支持多个权限叠加
    title: 'title'              设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'            设置该路由的图标
    // noCache: true               如果设置为true ,则不会被 <keep-alive> 缓存(默认 false) 该方法位实现
  }
* 当设置 true 的时候永远会显示根菜单，不设置的情况下只有当子路由个数大于一个时才会显示根菜单
  当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式。只有一个时会将那个子路由当做根路由
  alwaysShow: true
**/
/* constantRouterMap代表那些不需要动态判断权限的路由，如登录页，404，等通用页面。*/
/* asyncRouterMap 代表那些需求动态判断权限并通过 addRouters 动态添加的页面 */
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: false },

  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: _import('dashboard/index'),
      meta: { title: '首页', icon: 'example', noCache: true }
    }]
  }]

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/tree',
    // alwaysShow: true, // 控制单个子类有下拉
    meta: { title: 'example', icon: 'example', roles: ['admin'] },
    children: [
      {
        path: 'tree',
        name: 'tree',
        component: _import('tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }, {
        path: 'recursive',
        name: 'items',
        component: _import('tree/Recursive/index'),
        meta: { title: '递归组件', icon: 'tree' }
      }
    ]
  },
  {
    path: '/components',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'components', icon: 'example' },
    children: [
      {
        path: 'draggable',
        name: 'draggable',
        component: _import('components-demo/draggable'),
        meta: { title: '列表拖拽', icon: 'tree' }
      },
      {
        path: 'splitpane',
        name: 'splitpane',
        component: _import('components-demo/splitpane'),
        meta: { title: 'splitpane', icon: 'tree' }
      },
      {
        path: 'avatarUpload',
        name: 'avatarUpload',
        component: _import('components-demo/avatarUpload'),
        meta: { title: '头像上传', icon: 'tree' }
      },
      {
        path: 'dropzone',
        name: 'dropzone-demo',
        component: _import('components-demo/dropzone'),
        meta: { title: '上传图片', icon: 'tree' }
      },
      {
        path: 'backtotop',
        name: 'backtotop-demo',
        component: _import('components-demo/backtotop'),
        meta: { title: '返回顶部', icon: 'tree' }
      },
      {
        path: 'sticky',
        name: 'sticky',
        component: _import('components-demo/sticky'),
        meta: { title: '吸附顶部', icon: 'tree' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'form',
        component: _import('form/index'),
        meta: { title: 'Form表单', icon: 'form', noCache: true }
      }
    ]
  },
  {
    path: '/excel',
    component: Layout,
    name: 'Excel',
    redirect: '/excel/index',
    meta: { title: 'Excel', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'excel',
        component: _import('excel/index'),
        meta: { title: 'Excel', icon: 'form' }
      },
      {
        path: 'select',
        name: 'selectexcel',
        component: _import('excel/selectExcel'),
        meta: { title: 'selectorExcel', icon: 'form' }
      },
      {
        path: 'upload',
        name: 'uploadexcel',
        component: _import('excel/uploadexcel'),
        meta: { title: 'uploadExcel', icon: 'form' }
      },
      {
        path: 'zip',
        name: 'zipexcel',
        component: _import('excel/zipExcel'),
        meta: { title: 'zipExcel', icon: 'form' }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    meta: { title: 'Table表格', icon: 'form' },
    children: [
      {
        path: '/table',
        name: 'table',
        component: _import('table/index'),
        redirect: '/table/index',
        meta: { title: 'Table表格', icon: 'form' },
        children: [
          {
            path: 'index',
            name: 'index',
            component: _import('table/complexTable'),
            meta: { title: '综合table', icon: 'form' }
          },
          {
            path: 'dynamic',
            name: 'dynamic',
            component: _import('table/dynamicTable/index'),
            meta: { title: '动态table', icon: 'form' }
          },
          {
            path: 'drag',
            name: 'drag',
            component: _import('table/dragTable'),
            meta: { title: '拖拽table', icon: 'form' }
          },
          {
            path: 'editors',
            name: 'editors',
            component: _import('table/editorsTable'),
            meta: { title: '编辑table', icon: 'form' }
          }
        ]
      },
      {
        path: 'tap',
        name: 'tap',
        component: _import('table/tap'),
        meta: { title: 'Tap', icon: 'form' }
      }
    ]
  },
  {
    path: '/chart',
    component: Layout,
    name: 'Chart',
    redirect: '/chart/line',
    meta: { title: '图表', icon: 'example' },
    children: [
      {
        path: 'line',
        name: 'lineChart',
        component: _import('charts/line'),
        meta: {
          title: '折线图',
          icon: 'form'
        }
      },
      {
        path: 'bar',
        name: 'barChart',
        component: _import('charts/bar'),
        meta: {
          title: '柱状图',
          icon: 'form'
        }
      },
      {
        path: 'mixin',
        name: 'mixChart',
        component: _import('charts/mix'),
        meta: {
          title: '混合图表',
          icon: 'form'
        }
      },
      {
        path: 'pie',
        name: 'pieChart',
        component: _import('charts/pie'),
        meta: {
          title: '圆形图',
          icon: 'form'
        }
      }
    ]
  },
  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'clipboard',
        component: _import('clipboard/index'),
        meta: { title: '剪切板', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

