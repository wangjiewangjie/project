import commonInfo from '../../util/commonInfo';
import config from '../../config/config';

let request = {};

let systemSource = '';
// #ifdef APP-PLUS
systemSource = plus.os.name;
// #endif
// #ifdef MP-WEIXIN
systemSource = 'mini';
// #endif
// #ifdef H5
systemSource = 'h5';
// #endif

request.rq = (url, data, method, needToken, shallow = false, showLoading = true) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    platform: config.platform,
    systemSource: systemSource,
    unionCode: 'U00112',
    // unionCode: 'U00001', //dev
  };
  let params = data || {};

  if (needToken && !commonInfo.getToken()) {
    commonInfo.reLogin();
    return new Promise(function (resolve, reject) {
      reject({
        msg: '正在登陆...',
      });
    });
  }

  if (config.jwtjson) {
    headers.jwtjson = commonInfo.getToken();
  } else {
    headers.Authorization = commonInfo.getToken();
  }
  if ('POST' == method) {
    params = JSON.stringify(params);
  }
  return new Promise((resolve, reject) => {
    if (showLoading) {
      uni.showLoading({
        title: '加载中',
      });
    }
    uni.request({
      url: url,
      method: method,
      data: params,
      header: headers,
      dataType: 'json',
      success: (resp) => {
        if (showLoading) {
          uni.hideLoading();
        }
        if (resp.statusCode == 200) {
          let resultInfo = resp.data;
          if (resultInfo.rescode === 202) {
            uni.showModal({
              title: '提示',
              content: resultInfo.msg,
              success: function (res) {
                if (res.confirm) {
                  commonInfo.reLogin();
                } else if (res.cancel) {
                  reject(new Error(resultInfo.msg));
                }
              },
            });
          } else if (
            url.indexOf('restapi.amap.com') > -1 ||
            url.indexOf('arena.bm001.com') > -1 ||
            url.indexOf('easy-mock.com') > -1
          ) {
            resolve(resultInfo);
          } else if (resultInfo.result === 'ok') {
            if (shallow) {
              resolve(resultInfo);
            } else {
              resolve(resultInfo.data);
            }
          } else {
            // eslint-disable-next-line no-lonely-if
            if (shallow) {
              resolve(resultInfo);
            } else {
              reject(resultInfo);
            }
          }
        } else if (resp.statusCode == 202) {
          commonInfo.reLogin();
          reject('正在登陆...');
        } else {
          if (resp.statusCode === 500) {
            uni.showToast({
              icon: 'none',
              title: resp.data.msg,
            });
          }
          uni.getNetworkType({
            success: (res) => {
              if (res.networkType === 'none') {
                uni.showToast({
                  icon: 'none',
                  title: '网络错误，请检查网络',
                });
              }
            },
          });
        }
      },
      fail: (resq) => {
        uni.hideLoading();
        reject(resq.data);
      },
    });
  });
};

request.up = (url, file, needToken) => {
  let headers = {
    platform: config.platform,
    systemSource: config.systemSource,
  };
  if (needToken && !commonInfo.getToken()) {
    commonInfo.reLogin();
    return new Promise(function (resolve, reject) {
      reject({
        msg: '正在登陆...',
      });
    });
  } else if (needToken) {
    if (config.jwtjson) {
      headers.jwtjson = commonInfo.getToken();
    } else {
      headers.Authorization = commonInfo.getToken();
    }
  }

  //#ifdef MP-ALIPAY
  let fileType = 'image';
  let arr = file.split('.');
  if (arr.length > 0) {
    let str = arr[arr.length - 1];
    if (['jpg', 'png', 'gif', 'jpeg', 'bmp', 'svg'].includes(str)) {
      fileType = 'image';
    }
    if (['mp4', 'mov', 'avi', 'rmvb', 'flv', '3gp', 'm3u8'].includes(str)) {
      fileType = 'video';
    }
    if (['mp3', 'wav', 'wma'].includes(str)) {
      fileType = 'audio';
    }
  }
  //#endif

  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: url,
      name: 'code',
      header: headers,
      //#ifdef MP-ALIPAY
      fileType: fileType,
      //#endif
      filePath: file,
      success: (resp) => {
        if (resp.statusCode == 200) {
          let data = '';
          if (typeof resp.data == 'string') {
            data = JSON.parse(resp.data);
          } else {
            data = resp.data;
          }
          if (data.rescode == '202' && data.msg == '未登录') {
            commonInfo.reLogin();
            reject('正在登陆...');
          } else if (data.result === 'ok') {
            resolve(data.data);
          } else {
            reject(data);
          }
        } else {
          reject({
            msg: '网络请求发生异常,错误码:' + resp.statusCode,
          });
        }
      },
      fail: (resq) => {
        reject(resq.data);
      },
    });
  });
};

request.get = (url, data, needToken = true) => {
  return request.rq(config.apiHost + url, data, 'GET', needToken);
};

request.getOutUrl = (url, data, needToken = true) => {
  return request.rq(url, data, 'GET', needToken);
};

/**
 * post请求
 * ---
 * @param {String} url 请求路径
 * @param {Object<any>} data 请求参数
 * @param {Boolean} needToken 需要token
 * @param {Boolean} shallow 是否返回浅层数据
 * @returns {Promise<unknown>}
 */
request.post = (url, data, needToken = true, shallow = false, showLoading = true) => {
  if (url.startsWith('https://') || url.startsWith('http//')) {
    return request.rq(url, data, 'POST', needToken, shallow);
  }
  return request.rq(config.apiHost + url, data, 'POST', needToken, shallow, showLoading);
};

request.upload = (url, file, needToken = true) => {
  if (url.startsWith('https://') || url.startsWith('http//')) {
    return request.up(url, file, 'POST', needToken);
  }
  return request.up(config.apiHost + url, file, 'POST', needToken);
};

export default request;
