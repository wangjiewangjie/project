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
  uni.navigateTo({ url: '/pages/login/index?back=true' });
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
commonInfo.getUser = () => {
  return storage.get('user');
};
commonInfo.setOpenId = (openId) => {
  return storage.set('openId', openId);
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
commonInfo.setLocaiton = (location) => {
  return storage.set('location', location);
};
commonInfo.getLocaiton = () => {
  return storage.get('location');
};
commonInfo.calcPrice = (v) => {
  if (!v) return 0;
  const val = v / 100;
  return val % 1 === 0 ? val : val.toFixed(2);
};
export default commonInfo;
