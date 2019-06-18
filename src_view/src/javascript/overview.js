'use strict';

/**
 * @component: views/overview.vue
 * @vue-data: computed
 * @descript: 获取当前的项目名称
 */
function processName() {
    return this.params.processName;
}

/**
 * @component: views/overview.vue
 * @vue-data: computed
 * @descript: 得到当前项目在选择服务器上的 pid 列表
 */
function pidList() {
    let pidList = [];
    if (this.params && this.params.pidList && Array.isArray(this.params.pidList)) {
        pidList = this.params.pidList;
    }

    return pidList;
}

/**
 * @component: views/overview.vue
 * @vue-data: computed
 * @descript: 悬浮导航栏信息，快速跳转到对应的进程
 */
function overViewComputed() {
    return this.pidList.map(item => {
        const tmp = {};
        tmp.navi = `Pid-${item}`;
        tmp.href = `pid_${item}`;
        return tmp;
    });
}

//导出 dashboard.vue 所需
export default {
    computed: { processName, pidList, overViewComputed }
}