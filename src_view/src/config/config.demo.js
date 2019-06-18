import Env from './env';

let config = {
  env: Env,
  axiosPath: {
    indexPage: '/fe-monitor/demo/axiosIndexPage',
    startProfiler: '/fe-monitor/demo/axiosProfiler',
    getProfilerDetail: '/fe-monitor/demo/axiosProfilerDetail',
    getOverview: '/fe-monitor/demo/axiosOverview',
    checkConfig: '/fe-monitor/demo/axiosConfig',
    fetchConfig: '/fe-monitor/demo/axiosFetchConfig',
  },

  vueRouter: {
    root: '/fe-monitor/demo',
    index: '/fe-monitor/demo/index',
    profiler: '/fe-monitor/demo/profiler',
    overview: '/fe-monitor/demo/overview',
    document: '/fe-monitor/demo/document',
  },
};
export default config;
