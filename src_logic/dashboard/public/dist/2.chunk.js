webpackJsonp([2],{513:function(e,t,s){function i(e){n||s(824)}var n=!1,a=s(185)(s(764),s(983),i,"data-v-61131f36",null);a.options.__file="/Users/chenjialin/workspace/loreal/buycoor/fe-monitorsrc_view/src/views/index.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},530:function(e,t,s){function i(e){n||(s(537),s(535))}var n=!1,a=s(185)(s(531),s(546),i,"data-v-3c49d015",null);a.options.__file="/Users/chenjialin/workspace/loreal/buycoor/fe-monitorsrc_view/src/views/common/loading.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] loading.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},531:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{defaultLoadingMsg:"Loading...",loadingMsgSingle:""}},created:function(){this.$_js.loading.watch.loadingMsg.call(this)},props:["loadingMsg","error"],watch:{loadingMsg:function(){this.$_js.loading.watch.loadingMsg.call(this)}}}},532:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){t.default={data:function(){return{config:e}},props:["list","needHome","needDocument"],computed:{navigationList:function(){return Array.isArray(this.list)||(this.list=[]),this.list.map(function(e){return{navi:e.navi,href:"#"+e.href}})}}}}.call(t,s(26))},535:function(e,t){},536:function(e,t){},537:function(e,t){},544:function(e,t,s){function i(e){n||s(536)}var n=!1,a=s(185)(s(532),s(545),i,"data-v-0f4fa4cb",null);a.options.__file="/Users/chenjialin/workspace/loreal/buycoor/fe-monitorsrc_view/src/views/common/navigation.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] navigation.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},545:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"navigation-bar"},[e.needHome?s("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"center"}},[s("Col",{staticStyle:{"text-align":"left"},attrs:{span:"24"}},[s("router-link",{attrs:{to:e.config.default.vueRouter.index}},[s("p",[e._v("- Home")])])],1)],1):e._e(),e._v(" "),e.needDocument?s("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"center"}},[s("Col",{staticStyle:{"text-align":"left"},attrs:{span:"24"}},[s("a",{attrs:{href:e.config.default.vueRouter.document}},[s("p",[e._v("- Docs")])])])],1):e._e(),e._v(" "),e._l(e.navigationList,function(t){return s("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"center"}},[s("Col",{staticStyle:{"text-align":"left"},attrs:{span:"24"}},[s("a",{attrs:{href:t.href}},[s("p",[e._v("· "+e._s(t.navi))])])])],1)})],2)},staticRenderFns:[]},e.exports.render._withStripped=!0},546:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"spin-col"},[e.error?e._e():s("Spin",{attrs:{fix:""}},[s("Icon",{staticClass:"spin-icon-load",attrs:{type:"load-c",size:"18"}}),e._v(" "),s("div",[s("p",[e._v(e._s(e.loadingMsgSingle||e.defaultLoadingMsg))])])],1),e._v(" "),e.error?s("Alert",{attrs:{type:"error","show-icon":""}},[e._v("\n        服务器内部错误\n        "),s("span",{slot:"desc"},[e._v("\n            详情: "+e._s(e.error)+"\n        ")])]):e._e()],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},757:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s(530),n=s.n(i);t.default={data:function(){return{serverPid:[],done:!1,error:null,user:null,runMode:"",runModeDisable:!1,logLevel:"",loggerDisable:!1,cpas:!1,cpasDisable:!1,cpuFilter:!1,cpuFilterDisable:!1,cpuProfiler:1,cpuProfilerDisable:!1,cpuTimeout:1,cpuTimeoutDisable:!1,cpuLong:1,cpuLongDisable:!1,cpuTop:1,cpuTopDisable:!1,cpuBailout:1,cpuBailoutDisable:!1,memStream:!1,memStreamDisable:!1,memRoot:!1,memRootDisable:!1,memLeakLimit:1,memLeakLimitDisable:!1,memChildren:1,memChildrenDisable:!1,memRootDistance:1,memRootDistanceDisable:!1,memLeakDistance:1,memLeakDistanceDisable:!1,authNeed:!1,authNeedDisable:!1,adminList:[],inputAdmin:"",adminVisiable:!1,normalList:[],inputNormal:"",normalVisiable:!1}},created:function(){var e={name:this.name,type:"get"};this.$_js.dynamic.methods.fetchConfig.call(this,e)},props:["name"],components:{loadingSpin:n.a},methods:{initDynamic:function(){return this.$_js.dynamic.methods.initDynamic.call(this)},axiosFetch:function(e,t){return this.$_js.dynamic.methods.axiosFetch.call(this,e,t)},adminHidden:function(){return this.$_js.dynamic.methods.popperHidden.call(this,"admin")},closeAdminList:function(e,t){return this.$_js.dynamic.methods.closeList.call(this,"admin",e,t)},addAdmin:function(){return this.$_js.dynamic.methods.addList.call(this,"admin")},normalHidden:function(){return this.$_js.dynamic.methods.popperHidden.call(this,"normal")},closeNormalList:function(e,t){return this.$_js.dynamic.methods.closeList.call(this,"normal",e,t)},addNormal:function(){return this.$_js.dynamic.methods.addList.call(this,"normal")}},computed:{loadingMsg:function(){return this.$_js.dynamic.computed.loadingMsg.call(this)},isAdmin:function(){return this.$_js.dynamic.computed.isAdmin.call(this)}}}},758:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s(32),n=(s.n(i),s(970)),a=s.n(n);t.default={data:function(){return{e_pid:"all",e_opt:"own",loading:!1,server:"",pidList:[],configModal:!1,configLoading:!0}},props:["singleProjectInfo"],components:{dynamicConfig:a.a},methods:{conifgHandle:function(){this.$_js.process.methods.conifgHandle.call(this)},radioHandle:function(){this.$_js.process.methods.radioHandle.call(this)},selectHandle:function(e){this.$_js.process.methods.selectHandle.call(this,e)},configOk:function(){this.$_js.process.methods.configOk.call(this)},configCancel:function(){this.$_js.process.methods.configCancel.call(this)}},computed:{serverName:function(){return this.$_js.process.computed.serverName.call(this)},serverList:function(){return this.$_js.process.computed.serverList.call(this)},processName:function(){return this.$_js.process.computed.processName.call(this)},processList:function(){return this.$_js.process.computed.processList.call(this)},disabled:function(){return this.$_js.process.computed.disabled.call(this)},loadingTime:function(){return this.$_js.process.computed.loadingTime.call(this)},configTitle:function(){return this.$_js.process.computed.configTitle.call(this)}}}},764:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s(544),n=s.n(i),a=s(971),o=s.n(a);t.default={data:function(){return{indexPageData:{},needDocument:!1}},created:function(){this.checkConfig(),this.getIndexPageData()},components:{navigation:n.a,processIndex:o.a},methods:{checkConfig:function(){this.$_js.index.methods.checkConfig.call(this)},getIndexPageData:function(){this.$_js.index.methods.getIndexPageData.call(this)}},computed:{projectPidMap:function(){return this.$_js.index.computed.projectPidMap.call(this)},sortedProjectList:function(){return this.$_js.index.computed.sortedProjectList.call(this)},projectInfoList:function(){return this.$_js.index.computed.projectInfoList.call(this)},projectList:function(){return this.$_js.index.computed.projectList.call(this)}}}},815:function(e,t){},816:function(e,t){},819:function(e,t){},823:function(e,t){},824:function(e,t){},970:function(e,t,s){function i(e){n||(s(819),s(815))}var n=!1,a=s(185)(s(757),s(978),i,"data-v-2c6a7b1b",null);a.options.__file="/Users/chenjialin/workspace/loreal/buycoor/fe-monitorsrc_view/src/views/common/index/dynamic.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] dynamic.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},971:function(e,t,s){function i(e){n||(s(823),s(816))}var n=!1,a=s(185)(s(758),s(982),i,"data-v-47e7a14b",null);a.options.__file="/Users/chenjialin/workspace/loreal/buycoor/fe-monitorsrc_view/src/views/common/index/process.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] process.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},978:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"index"},[e.done?e._e():s("loading-spin",{attrs:{error:e.error,loadingMsg:e.loadingMsg}}),e._v(" "),e.done?s("div",[s("p",[s("strong",[e._v("项目: "+e._s(e.name))])]),e._v(" "),e._m(0),e._v(" "),s("p",{staticStyle:{"font-size":"1.1em","margin-bottom":"10px"}},[e._v("运行模式:\n            "),s("Radio-group",{staticStyle:{"margin-left":"10px","vertical-align":"2px"},model:{value:e.runMode,callback:function(t){e.runMode=t},expression:"runMode"}},[s("Radio",{attrs:{label:"default",disabled:e.runModeDisable}}),e._v(" "),s("Radio",{attrs:{label:"cluster",disabled:e.runModeDisable}})],1)],1),e._v(" "),s("p",{staticStyle:{"font-size":"1.1em","margin-bottom":"10px"}},[e._v("日志级别:\n            "),s("Radio-group",{staticStyle:{"margin-left":"10px","vertical-align":"2px"},model:{value:e.logLevel,callback:function(t){e.logLevel=t},expression:"logLevel"}},[s("Radio",{attrs:{label:"error",disabled:e.loggerDisable}}),e._v(" "),s("Radio",{attrs:{label:"warn",disabled:e.loggerDisable}}),e._v(" "),s("Radio",{attrs:{label:"info",disabled:e.loggerDisable}}),e._v(" "),s("Radio",{attrs:{label:"debug",disabled:e.loggerDisable}})],1)],1),e._v(" "),s("p",{staticStyle:{"font-size":"1.1em","margin-bottom":"20px"}},[e._v("开启子进程分析采集数据:\n            "),s("i-switch",{staticStyle:{"margin-left":"10px","vertical-align":"-7px"},attrs:{size:"large",disabled:e.cpasDisable},model:{value:e.cpas,callback:function(t){e.cpas=t},expression:"cpas"}},[s("span",{slot:"open"},[e._v("开启")]),e._v(" "),s("span",{slot:"close"},[e._v("关闭")])])],1),e._v(" "),e._m(1),e._v(" "),s("p",{staticStyle:{"font-size":"1.1em","margin-bottom":"10px"}},[e._v("自定义过滤:\n            "),s("i-switch",{staticStyle:{"margin-left":"10px","vertical-align":"-7px"},attrs:{size:"large",disabled:e.cpuFilterDisable},model:{value:e.cpuFilter,callback:function(t){e.cpuFilter=t},expression:"cpuFilter"}},[s("span",{slot:"open"},[e._v("开启")]),e._v(" "),s("span",{slot:"close"},[e._v("关闭")])])],1),e._v(" "),s("p",{staticStyle:{"font-size":"1.1em","margin-bottom":"10px"}},[e._v("CPU Profiling 时间长度:\n            "),s("Input-number",{staticStyle:{"margin-left":"10px","margin-right":"10px","vertical-align":"-7px"},attrs:{max:1e5,min:1,disabled:e.cpuProfilerDisable,size:"small"},model:{value:e.cpuProfiler,callback:function(t){e.cpuProfiler=t},expression:"cpuProfiler"}}),e._v("\n             s\n        ")],1),e._v(" "),s("p",{staticStyle:{"font-size":"1.1em","margin-bottom":"10px"}},[e._v("耗费最长函数展示数量限制:\n            "),s("Input-number",{staticStyle:{"margin-left":"10px","margin-right":"10px","vertical-align":"-7px"},attrs:{max:500,min:1,disabled:e.cpuTopDisable,size:"small"},model:{value:e.cpuTop,callback:function(t){e.cpuTop=t},expression:"cpuTop"}}),e._v("\n             条\n        ")],1),e._v(" "),e._m(2),e._v(" "),s("p",{staticStyle:{"font-size":"1.1em","margin-bottom":"10px"}},[e._v("Stream 解析模式:\n            "),s("i-switch",{staticStyle:{"margin-left":"10px","vertical-align":"-7px"},attrs:{size:"large",disabled:e.memStreamDisable},model:{value:e.memStream,callback:function(t){e.memStream=t},expression:"memStream"}},[s("span",{slot:"open"},[e._v("开启")]),e._v(" "),s("span",{slot:"close"},[e._v("关闭")])])],1),e._v(" "),s("p",{staticStyle:{"font-size":"1.1em","margin-bottom":"10px"}},[e._v("疑似泄漏点展示个数:\n            "),s("Input-number",{staticStyle:{"margin-left":"10px","margin-right":"10px","vertical-align":"-7px"},attrs:{max:50,min:1,disabled:e.memLeakLimitDisable,size:"small"},model:{value:e.memLeakLimit,callback:function(t){e.memLeakLimit=t},expression:"memLeakLimit"}}),e._v("\n             个\n        ")],1),e._v(" "),e._m(3),e._v(" "),s("p",{staticStyle:{"font-size":"1.1em","margin-bottom":"15px"}},[e._v("鉴权模块:\n            "),s("i-switch",{staticStyle:{"margin-left":"10px","vertical-align":"-7px"},attrs:{size:"large",disabled:e.authNeedDisable},model:{value:e.authNeed,callback:function(t){e.authNeed=t},expression:"authNeed"}},[s("span",{slot:"open"},[e._v("开启")]),e._v(" "),s("span",{slot:"close"},[e._v("关闭")])])],1),e._v(" "),s("p",{staticStyle:{"font-size":"1.1em","margin-bottom":"15px"}},[e._v("Admin 用户:\n            "),e._l(e.adminList,function(t,i){return s("Tag",{key:t,staticClass:"my-tag-text-style",staticStyle:{"margin-left":"10px","vertical-align":"-7px"},attrs:{name:t,closable:e.isAdmin&&0!==i&&e.authNeed},on:{"on-close":e.closeAdminList}},[e._v(e._s(t))])}),e._v(" "),s("Poptip",{attrs:{placement:"right"},on:{"on-popper-hide":e.adminHidden},model:{value:e.adminVisiable,callback:function(t){e.adminVisiable=t},expression:"adminVisiable"}},[s("Button",{staticStyle:{"margin-left":"10px","vertical-align":"1px"},attrs:{disabled:!e.authNeed||!e.isAdmin,icon:"ios-plus-empty",type:"dashed",size:"small"}},[e._v("新增")]),e._v(" "),s("div",{staticClass:"api",slot:"content"},[s("Input",{staticStyle:{width:"130px"},attrs:{placeholder:"新增 Admin 用户",size:"small"},model:{value:e.inputAdmin,callback:function(t){e.inputAdmin=t},expression:"inputAdmin"}}),e._v(" "),s("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",shape:"circle",size:"small"},on:{click:e.addAdmin}},[e._v("ok")])],1)],1)],2),e._v(" "),s("p",{staticStyle:{"font-size":"1.1em","margin-bottom":"15px"}},[e._v(e._s(e.name)+" 项目普通用户:\n            "),e._l(e.normalList,function(t){return s("Tag",{key:t,staticClass:"my-tag-text-style",staticStyle:{"margin-left":"10px","vertical-align":"-7px"},attrs:{name:t,closable:e.authNeed},on:{"on-close":e.closeNormalList}},[e._v(e._s(t))])}),e._v(" "),s("Poptip",{attrs:{placement:"right"},on:{"on-popper-hide":e.normalHidden},model:{value:e.normalVisiable,callback:function(t){e.normalVisiable=t},expression:"normalVisiable"}},[s("Button",{staticStyle:{"margin-left":"10px","vertical-align":"1px"},attrs:{disabled:!e.authNeed||!e.adminList.length,icon:"ios-plus-empty",type:"dashed",size:"small"}},[e._v("新增")]),e._v(" "),s("div",{staticClass:"api",slot:"content"},[s("Input",{staticStyle:{width:"130px"},attrs:{placeholder:"新增 Normal 用户",size:"small"},model:{value:e.inputNormal,callback:function(t){e.inputNormal=t},expression:"inputNormal"}}),e._v(" "),s("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",shape:"circle",size:"small"},on:{click:e.addNormal}},[e._v("ok")])],1)],1)],2)]):e._e()],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("header",{staticClass:"header"},[s("span",[s("strong",[e._v("常规动态配置项")])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("header",{staticClass:"header"},[s("span",[s("strong",[e._v("CPU 动态配置项")])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("header",{staticClass:"header"},[s("span",[s("strong",[e._v("Memory 动态配置项")])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("header",{staticClass:"header"},[s("span",[s("strong",[e._v("Auth 动态配置项")])])])}]},e.exports.render._withStripped=!0},982:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"index"},[s("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"center"}},[s("Col",{staticStyle:{"text-align":"center"},attrs:{span:"10"}},[s("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"center"}},[s("Col",{staticStyle:{"text-align":"center"},attrs:{span:"15"}},[s("Button",{attrs:{disabled:e.disabled,type:"text",shape:"circle",size:"small"},on:{click:e.conifgHandle}},[s("h2",{attrs:{id:e.processName}},[e._v(e._s(e.processName))])]),e._v(" "),s("Button",{staticStyle:{position:"absolute",top:"22px",color:"#657180","font-weight":"200",right:"-70px"},attrs:{disabled:e.disabled,type:"ghost",shape:"circle",size:"small",loading:e.loading},on:{click:e.radioHandle}},[e._v("\n                        Start\n                ")])],1)],1),e._v(" "),s("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"center"}},[s("Col",{attrs:{span:"22"}},[s("Card",[s("div",{staticStyle:{"text-align":"center"}},[s("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"center"}},[s("Col",{attrs:{span:"18"}},[s("header",{staticClass:"header"},[s("span",[e._v("所在服务器")])])])],1),e._v(" "),s("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"center"}},[s("Col",{attrs:{span:"10"}},[s("Select",{staticClass:"ivu-select-input-my-style",attrs:{size:"small",filterable:""},on:{"on-change":e.selectHandle},model:{value:e.server,callback:function(t){e.server=t},expression:"server"}},e._l(e.serverList,function(t){return s("Option",{key:t.label,attrs:{value:t.value}},[e._v(e._s(t.label))])}))],1)],1),e._v(" "),s("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"center"}},[s("Col",{attrs:{span:"18"}},[s("header",{staticClass:"header"},[s("span",[e._v("选择进程")])])])],1),e._v(" "),e._l(e.processList,function(t){return s("Radio-group",{model:{value:e.e_pid,callback:function(t){e.e_pid=t},expression:"e_pid"}},[s("Radio",{attrs:{label:t.label}},[s("Icon",{attrs:{type:t.type}}),e._v(" "),s("span",[e._v(e._s(t.pid))])],1)],1)}),e._v(" "),s("br"),e._v(" "),s("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"center"}},[s("Col",{attrs:{span:"18"}},[s("header",{staticClass:"header"},[s("span",[e._v("解析类型")])])])],1),e._v(" "),s("Radio-group",{model:{value:e.e_opt,callback:function(t){e.e_opt=t},expression:"e_opt"}},[s("Radio",{attrs:{label:"own"}},[s("Icon",{attrs:{type:"ios-list-outline"}}),e._v(" "),s("span",[e._v("OS")])],1),e._v(" "),s("Radio",{attrs:{label:"cpu"}},[s("Icon",{attrs:{type:"ios-gear-outline"}}),e._v(" "),s("span",[e._v("CPU")])],1),e._v(" "),s("Radio",{attrs:{label:"mem"}},[s("Icon",{attrs:{type:"ios-analytics-outline"}}),e._v(" "),s("span",[e._v("MEM")])],1)],1),e._v(" "),s("br")],2)]),e._v(" "),s("Modal",{attrs:{loading:e.configLoading,title:e.configTitle},on:{"on-ok":e.configOk,"on-cancel":e.configCancel},model:{value:e.configModal,callback:function(t){e.configModal=t},expression:"configModal"}},[s("dynamic-config",{ref:"dynamic",attrs:{name:e.processName}})],1)],1)],1)],1)],1),e._v(" "),s("br")],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},983:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"index"},[s("Row",[s("Col",{staticStyle:{height:"20px"}})],1),e._v(" "),s("br"),e._v(" "),s("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"center"}},[s("Col",{staticStyle:{"text-align":"center"},attrs:{span:"10"}},[s("h1",[e._v("Fe-Monitor")])])],1),e._v(" "),s("br"),e._v(" "),e._l(e.projectInfoList.list,function(t,i){return s("process-index",{attrs:{singleProjectInfo:e.projectInfoList.map[t]}})}),e._v(" "),s("navigation",{attrs:{list:e.projectList,needDocument:e.needDocument}}),e._v(" "),e._m(0)],2)},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"footer"},[s("p",[e._v("© 2017 , Powered By\n              "),s("a",{attrs:{href:"http://172.16.50.195/buycoor/fe-monitor",target:"_Blank"}},[e._v("Fe-Monitor")]),e._v("\n              , Author: "),s("a",{attrs:{href:"http://172.16.50.195/buycoor/fe-monitor",target:"_Blank"}},[e._v("buycoor")])])])}]},e.exports.render._withStripped=!0}});