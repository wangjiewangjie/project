let commonInfo = {};
import storage from './storageutil';
import config from '../config/config';
let reLoginTime = null; //放在重复转向
commonInfo.reLogin = () => {
  if (reLoginTime && new Date().getTime() - reLoginTime < 3000) {
    // 小于3s 阻止
    return;
  }
  reLoginTime = new Date().getTime();
  commonInfo.setToken('');
  commonInfo.setUser('');
  uni.redirectTo({ url: '/pages/login/login/login' });
};
commonInfo.delLastHref = () => {
  storage.set('lastHref', '');
};
commonInfo.getToken = () => {
  return config.jwtjson || storage.get('token');
};
commonInfo.setToken = (token) => {
  storage.set('token', token);
};
commonInfo.setUser = (user) => {
  storage.set('user', user);
};
commonInfo.getOpenId = () => {
  return storage.get('openId');
};
commonInfo.setPhoneX = (boolean) => {
  storage.set('phoneX', boolean);
};
commonInfo.getPhoneX = () => {
  return storage.get('phoneX');
};
export default commonInfo;
