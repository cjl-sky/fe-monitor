<style scoped lang="less">
    .footer {
        padding: 50px 0;
        color: #fff;
        text-align: center;
    }
</style>

<template>
    <div class="index">
        <!-- 预留 Header Bar 位置-->
        <Row><Col style="height:20px;"></Col></Row>
        <br>

        <!-- Fe-Monitor 标题栏 -->
        <Row type="flex" justify="center" class="code-row-bg">
            <Col span=10 style="text-align:center">
                <h1>Fe-Monitor</h1>
            </Col>
        </Row>
        <br>

        <!-- 根据 axios 获取主页数据生成每一个项目组件 -->
        <process-index 
            v-for="(item, index) in projectInfoList.list" 
            :singleProjectInfo="projectInfoList.map[item]">
        </process-index>

        <!-- 多项目部署悬浮导航栏 -->
        <navigation :list="projectList" :needDocument="needDocument">
        </navigation>

        <!-- 页脚信息 -->
        <div class="footer">
          <p>© 2019 , 欧莱雅百库轻量级NodeJs监控工具
                  <a href="http://172.16.50.195/buycoor/fe-monitor" target="_Blank">fe-monitor</a>
                  , Company: <a href="http://www.buycoor.com/" target="_Blank">buycoor</a></p>
        </div>
    </div>
</template>
<script>
    import navigation from './common/navigation.vue';
    import processIndex from './common/index/process.vue';

    export default {
        data () {
            return { indexPageData: {}, needDocument: false }
        },

        created(){
            this.checkConfig();
            this.getIndexPageData();
        },

        components: { navigation, processIndex },

        methods: {
            checkConfig() { this.$_js.index.methods.checkConfig.call(this); },
            getIndexPageData(){ this.$_js.index.methods.getIndexPageData.call(this); }
        },

        computed: {
            projectPidMap() { return this.$_js.index.computed.projectPidMap.call(this); },
            sortedProjectList() { return this.$_js.index.computed.sortedProjectList.call(this); },
            projectInfoList() { return this.$_js.index.computed.projectInfoList.call(this); },
            projectList() { return this.$_js.index.computed.projectList.call(this); }
        }
    }
</script>