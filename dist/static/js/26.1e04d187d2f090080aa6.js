webpackJsonp([26],{DZM9:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-checkbox-group",{model:{value:e.checkList,callback:function(t){e.checkList=t},expression:"checkList"}},[a("el-checkbox",{attrs:{label:"姓名"}}),e._v(" "),a("el-checkbox",{attrs:{label:"地址"}}),e._v(" "),a("el-checkbox",{attrs:{label:"城市"}})],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"date",label:"日期",width:"180"}}),e._v(" "),e._l(e.checkList,function(t){return a("el-table-column",{key:t,attrs:{label:t},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n        "+e._s(a.row["姓名"==t?"name":"地址"==t?"address":"城市"==t?"province":""])+"\n      ")]}}])})})],2)],1)},staticRenderFns:[]},c=a("VU/8")({data:function(){return{tableData:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄",province:"上海"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄",province:"上海"},{date:"2016-05-01",name:"王小虎",province:"上海",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",province:"上海",address:"上海市普陀区金沙江路 1516 弄"}],checkList:[]}},methods:{}},l,!1,null,null,null);t.default=c.exports}});