/* eslint-disable no-console */
import storage from '../util/storageutil';

let DEVELOPER_TYPE = storage.get('DEVELOPER_TYPE') || process.env.NODE_ENV; // 开发者模式 production  线上模式
let platform = 'bm';
let apiHost, jwtjson, h5CodeUrl, shareH5BaseUrl, shareAuntH5BaseUrl;
let wxAppId = 'wx98055987618aa2df'; //斑马公众号appid （wx98055987618aa2df）
let coordinate = null; // 用于固定定位；
let ossUrl = 'https://oss.bm001.com/static/association/credit-cert-h5/images/';
let tabbarList = [
  {
    iconPath: '/static/images/tab/tabbar-baoming.png',
    selectedIconPath: '/static/images/tab/tabbar-baoming-selected.png',
    text: '报名',
    isDot: false,
    customIcon: true,
    pagePath: '/pages/index/index',
  },
  {
    iconPath: '/static/images/tab/tabbar-kaoshi.png',
    selectedIconPath: '/static/images/tab/tabbar-kaoshi-selected.png',
    text: '考试',
    isDot: false,
    customIcon: true,
    pagePath: '/pages/exam/index',
  },
  {
    iconPath: '/static/images/tab/tabbar-chaxun.png',
    selectedIconPath: '/static/images/tab/tabbar-chaxun-selected.png',
    text: '查询',
    isDot: false,
    customIcon: true,
    pagePath: '/pages/query/index',
  },
  {
    iconPath: '/static/images/tab/tabbar-wode.png',
    selectedIconPath: '/static/images/tab/tabbar-wode-selected.png',
    text: '我的',
    isDot: false,
    customIcon: true,
    pagePath: '/pages/mine/index',
  },
];

// 开发环境配置
const DEVELOPMENT_CONFIG = {
  // apiHost: 'http://172.19.132.22:8080/',
  apiHost: 'https://creditapi-test1.devp.bm001.com/',
  // apiHost: 'http://172.19.134.25:8080/',
  wxAppId,
  jwtjson: '',
  h5CodeUrl: 'https://oss.bm001.com/jfe/servicecard/h5/index.html#/pages/aunt/resume/resume',
  shareH5BaseUrl: 'https://oss.bm001.com/jfe/servicecard/h5/index.html',
  shareAuntH5BaseUrl: 'https://oss.bm001.com/jfe/servicecard/auntH5/index.html',
};

// 生产环境配置
const PRODUCTION_CONFIG = {
  apiHost: 'https://creditapi-test1.devp.bm001.com/',
  wxAppId,
  jwtjson: '',
  h5CodeUrl: 'https://oss.bm001.com/jfe/servicecard/prodh5/index.html#/pages/aunt/resume/resume',
  shareH5BaseUrl: 'https://oss.bm001.com/jfe/servicecard/prodh5/index.html',
  // shareH5BaseUrl: "https://oss.bm001.com/jfe/servicecard/h5/index.html"
  shareAuntH5BaseUrl: 'https://oss.bm001.com/jfe/servicecard/auntH5/index.html',
};

if (DEVELOPER_TYPE === 'development') {
  apiHost = DEVELOPMENT_CONFIG.apiHost;
  jwtjson = DEVELOPMENT_CONFIG.jwtjson;
  wxAppId = DEVELOPMENT_CONFIG.wxAppId;
  h5CodeUrl = DEVELOPMENT_CONFIG.h5CodeUrl;
  shareH5BaseUrl = DEVELOPMENT_CONFIG.shareH5BaseUrl;
  shareAuntH5BaseUrl = DEVELOPMENT_CONFIG.shareAuntH5BaseUrl;
  console.log('开发环境:' + apiHost, h5CodeUrl);
} else {
  apiHost = PRODUCTION_CONFIG.apiHost;
  jwtjson = PRODUCTION_CONFIG.jwtjson;
  wxAppId = PRODUCTION_CONFIG.wxAppId;
  h5CodeUrl = PRODUCTION_CONFIG.h5CodeUrl;
  shareH5BaseUrl = PRODUCTION_CONFIG.shareH5BaseUrl;
  shareAuntH5BaseUrl = PRODUCTION_CONFIG.shareAuntH5BaseUrl;
  console.log('生产环境:' + apiHost);
}

function changeDeveloperType(type) {
  DEVELOPER_TYPE = type;
  uni.showToast({
    title: '已切换为' + (type === 'development' ? '测试环境' : '线上环境'),
    icon: 'none',
    duration: 2000,
  });
  storage.set('DEVELOPER_TYPE', type);
}

export default {
  auntDefaultImg: 'https://oss.bm001.com/jfe-app3.0/baba/aunt-default.png',
  platform,
  agreementUrl: 'https://oss.bm001.com/jfe/servicecard/agreement/PostCcardAgreement.html',
  primaryColor: '#F75959',
  // tabbar样式设置
  tabBarBackground: 'white',
  tabBarColor: 'rgba(0,0,0,.6)',
  tabSelectBarColor: '#F75959',
  // 发送验证码-公钥
  publicKey:
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCETvRMnCvMCY80tvQIXZNqzmFQarh1KgmUt9k+GYbun55oFO2JbuxgcTo1DcggP4nbtEdxXJpmhUXCf8YYBl4DuuqPOGC2BgBDP7VS5OBBjyrWdeO5K9++PmJXPfFvYJg+EobX3MjfaTyK1ZsFZvnuRz31s6OnjU/8Ze7SuLfi4QIDAQAB',
  //配置
  apiHost,
  jwtjson,
  wxAppId,
  // 开发模式
  DEVELOPER_TYPE: DEVELOPER_TYPE,
  changeDeveloperType,
  h5CodeUrl,
  shareH5BaseUrl,
  shareAuntH5BaseUrl,
  coordinate,
  ossUrl,
  tabbarList,
  h5wxAppId: 'wxc28e7f7f0bfd60d0',
};
