/*
 * @Author: your name
 * @Date: 2022-03-02 11:27:47
 * @LastEditTime: 2022-03-02 14:52:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \credit-cert-h5\util\H5Share.js
 */
import jweixin from 'jweixin-module';
import config from '@/config/config.js';
import { queryShareConfig } from '@/util/ajax/services';

const queryWechatConfig = (url) => {
  queryShareConfig({
    requestUrl: url,
    appId: config.h5wxAppId,
    name: '',
  }).then((res) => {
    setConfigs(res.data);
  });
};

const setConfigs = (res) => {
  jweixin.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
    timestamp: res.timestamp, // 必填，生成签名的时间戳
    nonceStr: res.nonceStr, // 必填，生成签名的随机串
    signature: res.signature, // 必填，签名，见附录1
    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
};

/**
 * @description: 微信分享
 * @param {*} shareType 1分享到朋友圈
 * @return {*}
 */
const customWxShare = async (params) => {
  await queryWechatConfig(params.link);
  jweixin.ready(() => {
    if (params.shareType === 1) {
      jweixin.updateAppMessageShareData({
        title: params.title,
        link: params.link,
        imgUrl: params.imgUrl,
        success: () => {
          uni.showToast({
            title: '分享成功',
            icon: 'none',
          });
        },
      });
    } else {
      jweixin.updateTimelineShareData({
        title: params.title,
        link: params.link,
        imgUrl: params.imgUrl,
        success: () => {
          uni.showToast({
            title: '分享成功',
            icon: 'none',
          });
        },
      });
    }
  });
};
export default {
  queryWechatConfig,
  customWxShare,
};
