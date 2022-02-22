import request from './request.js';

const Http = {
  get(url, params) {
    return request.post(url, params, false);
  },
  post(url, params, shallow, showLoading = true) {
    return request.post(url, params, false, shallow, showLoading);
  },
  up(url, file) {
    return request.upload(url, file, false);
  },
};

/* 登录 */
export const getLoginCode = (params) => {
  return Http.post('core/verify/appSend', params, true);
}; //获取登录验证码
export const phoneLogin = (params) => {
  return Http.post(
    params.loginType == 1 ? '/core/oauth/login' : 'core/oauth/phoneLogin',
    params,
    true
  );
}; // 通用手机号+验证码登录注册
export const commonExplicit = (params) => {
  return Http.post('core/grant/commonExplicit', params);
};
//退出登录
export const loginOut = (params) => {
  return Http.post('core/oauth/loginOut', params);
};
//小程序用户通过code检测并初始化
export const miniSilence = (params) => {
  return Http.post('/core/grant/miniSilence', params, true);
};
//用户通过openId,appId进行APP授权
export const miniAuthBind = (params) => {
  return Http.post('/core/grant/miniAuthBind', params, true);
};
