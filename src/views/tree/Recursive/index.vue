<template>
  <div>
      <ul v-for="item  in data" :key="item.id">
          <recursive :mode="item"></recursive>
      </ul>
  </div>
</template>
<script>
    import Recursive from './recursive'
    export default {
      components: {
        Recursive
      },
      data() {
        return {
          data: [{
            'id': '1',
            'data': {
              'menuName': '项目管理',
              'menuCode': ''
            },
            'childTreeNode': [{
              'data': {
                'menuName': '项目',
                'menuCode': 'BusProject'
              },
              'childTreeNode': [{
                'data': {
                  'menuName': '项目嗖嗖嗖',
                  'menuCode': 'BusProject'
                }
              }
              ]
            }, {
              'data': {
                'menuName': '我的任务',
                'menuCode': 'BusProject'
              },
              'childTreeNode': [{
                'data': {
                  'menuName': '我的任务',
                  'menuCode': 'BusProject'
                }
              }]
            }, {
              'data': {
                'menuName': '人员周报',
                'menuCode': 'BusProject'
              },
              'childTreeNode': []
            }]
          }, {
            'id': '2',
            'data': {
              'menuName': '数据统计',
              'menuCode': 'BusClock'
            },
            'childTreeNode': [{
              'data': {
                'menuName': '我的任务',
                'menuCode': 'BusProject'
              }
            }]
          }, {
            'id': '3',
            'data': {
              'menuName': '人事管理',
              'menuCode': ''
            },
            'childTreeNode': [{
              'data': {
                'menuName': '我的任务',
                'menuCode': 'BusProject'
              }
            }]
          }, {
            'id': '4',
            'data': {
              'menuName': '基础管理',
              'menuCode': ''
            },
            'childTreeNode': [
              {
                'data': {
                  'menuName': '我的任务',
                  'menuCode': 'BusProject'
                }
              }
            ]
          }]
        }
      }
    }
</script>