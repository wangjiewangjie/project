export default {
  // 获取当前运行平台
  get() {
    let platform = '';
    // #ifdef H5
    // TODO 判断是在微信浏览器中
    if (0) {
      platform = 'wxOfficialAccount';
    } else {
      platform = 'H5';
    }
    // #endif
    // #ifdef APP-PLUS
    platform = 'App';
    // #endif
    // #ifdef MP-WEIXIN
    platform = 'wxMiniProgram';
    // #endif
    // #ifdef MP-ALIPAY
    platform = 'alipayMiniProgram';
    // #endif
    if (platform !== '') {
      uni.setStorageSync('platform', platform);
    } else {
      uni.showToast({
        title: '暂不支持该平台',
        icon: 'none',
      });
    }
    return platform;
  },

  set(platform) {
    uni.setStorageSync('platform', platform);
    return platform;
  },

  // 检测当前运行机型
  device() {
    return uni.getSystemInfoSync().platform;
  },

  // 处理wechat jssdk 签名网址(针对IOS微信浏览器做优化)
  entry() {
    let entryUrl = location.href;
    if (this.device() === 'ios') {
      if (typeof location.entryUrl !== 'undefined') {
        entryUrl = location.entryUrl;
      } else {
        location.entryUrl = entryUrl;
      }
    }
    return entryUrl;
  },
};
