webpackJsonp([15,26,27],{DZM9:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-checkbox-group",{model:{value:e.checkList,callback:function(t){e.checkList=t},expression:"checkList"}},[a("el-checkbox",{attrs:{label:"姓名"}}),e._v(" "),a("el-checkbox",{attrs:{label:"地址"}}),e._v(" "),a("el-checkbox",{attrs:{label:"城市"}})],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"date",label:"日期",width:"180"}}),e._v(" "),e._l(e.checkList,function(t){return a("el-table-column",{key:t,attrs:{label:t},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n        "+e._s(a.row["姓名"==t?"name":"地址"==t?"address":"城市"==t?"province":""])+"\n      ")]}}])})})],2)],1)},staticRenderFns:[]},l=a("VU/8")({data:function(){return{tableData:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄",province:"上海"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄",province:"上海"},{date:"2016-05-01",name:"王小虎",province:"上海",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",province:"上海",address:"上海市普陀区金沙江路 1516 弄"}],checkList:[]}},methods:{}},n,!1,null,null,null);t.default=l.exports},hMV7:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("jKoF"),l=a("DZM9"),r={name:"dynamicTable",components:{fixedTable:n.default,unfixedTable:l.default}},s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"app-container"},[t("div",{staticStyle:{margin:"0 0 5px 20px"}},[this._v("固定标签")]),this._v(" "),t("fixed-table"),this._v(" "),t("div",{staticStyle:{margin:"30px 0 5px 20px"}},[this._v("不固定标签")]),this._v(" "),t("unfixed-table")],1)},staticRenderFns:[]},c=a("VU/8")(r,s,!1,null,null,null);t.default=c.exports},jKoF:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=[],l={data:function(){return{tableData:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄",province:"上海"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄",province:"上海"},{date:"2016-05-01",name:"王小虎",province:"上海",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",province:"上海",address:"上海市普陀区金沙江路 1516 弄"}],formOptions:["姓名","地址","城市"],checkList:n,formThead:n}},watch:{checkList:function(e){this.formThead=this.formOptions.filter(function(t){return e.indexOf(t)>=0})}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-checkbox-group",{model:{value:e.checkList,callback:function(t){e.checkList=t},expression:"checkList"}},[a("el-checkbox",{attrs:{label:"姓名"}}),e._v(" "),a("el-checkbox",{attrs:{label:"地址"}}),e._v(" "),a("el-checkbox",{attrs:{label:"城市"}})],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"date",label:"日期",width:"180"}}),e._v(" "),e._l(e.formThead,function(t){return a("el-table-column",{key:t,attrs:{label:t},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v("\n        "+e._s(a.row["姓名"==t?"name":"地址"==t?"address":"城市"==t?"province":""])+"\n      ")]}}])})})],2)],1)},staticRenderFns:[]},s=a("VU/8")(l,r,!1,null,null,null);t.default=s.exports}});