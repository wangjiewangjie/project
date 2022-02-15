// const jweixin = require('jweixin-module');
import $platform from '@/util/platform';
import { buildOrder } from '@/util/ajax/services';

/**
 * 聚合支付
 * ---
 * - 					wxOfficialAccount	       wxMiniProgram		 H5
 * - 	wechat			公众号JSSDK支付				小程序支付				H5网页支付
 * -	alipay			复制网址					复制网址			   直接跳转链接
 *
 * @return { Promise<[err, res]> }
 * @property { String } err 错误信息
 * @property { Object } res 拉起支付调用支付平台返回支付信息
 * - 微信内H5支付
 * - 微信内支付宝复制链接支付
 * - 微信小程序支付
 * - 微信小程序内支付宝复制链接支付
 * - 浏览器内wap版微信支付
 * - 浏览器内跳转wap版支付宝支付
 *
 * @example
 * ```js
 * async toPay() {
 *   const [err, res] = await polyPay('wechat', {
 *     orderId: this.orderId,
 *     wayId: this.getPayWayCode(),
 *     sceneType: 1,
 *     appId: 'wxad70ff3f86bb7801',
 *   });
 *   if (err) {
 *     // 跳转到错误页
 *   } else {
 *     // 跳转到支付成页面
 *   }
 * },
 * ```
 * 浏览器内微信支付是接收回跳地址，不需要处理
 *
 */
export default async function polyPay(payment, orderInfo) {
  return new Promise((rs) => {
    const platform = $platform.get();
    const payMehod = getPayMethod();
    payMehod();
    function getPayMethod() {
      const payMethod = {
        wxOfficialAccount: {
          wechat: () => {
            wxOfficialAccountPay();
          },
          alipay: () => {
            copyPayLink();
          },
        },
        wxMiniProgram: {
          wechat: () => {
            wxMiniProgramPay();
          },
          alipay: () => {
            copyPayLink();
          },
        },
        H5: {
          wechat: () => {
            wechatWapPay();
          },
          alipay: () => {
            goToPayLink();
          },
        },
      };
      return payMethod[platform][payment];
    }
    /**
     * // TODO 微信内H5支付
     */
    async function wxOfficialAccountPay() {
      // const result = await prepay();
      // const data = { ...result };
      // console.log('data: ', data);
      // jweixin.ready(function () {
      //   jweixin.chooseWXPay({
      //     timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      //     nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
      //     package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      //     signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      //     paySign: data.paySign, // 支付签名
      //     success: function () {},
      //     fail: function () {},
      //     cancel: function () {},
      //   });
      // });
    }
    /**
     * // TODO 浏览器内微信支付
     */
    async function wechatWapPay() {
      const result = await prepay();
      // TODO 调试浏览器内微信支付流程
      // eslint-disable-next-line no-useless-escape
      const url = result.data.pay_data.match(/url\=\'(\S*)\'/);
      const reg = new RegExp('&amp;', 'g');
      const wechatWapPayUrl = url[1].replace(reg, '&');
      const redirectUrl = encodeURIComponent(
        `${window.location.origin}#/pages/order/payment/result?orderId=${orderInfo.id}&type=${payment}`
      );
      window.location.href = wechatWapPayUrl + '&redirect_url=' + redirectUrl;
    }
    /**
     * // TODO 微信小程序支付
     */
    async function wxMiniProgramPay() {
      const result = await prepay();
      const { timestamp, packageName, noncestr, sign } = result.data.payResult;
      uni.requestPayment({
        provider: 'wxpay',
        timeStamp: timestamp,
        nonceStr: noncestr,
        package: packageName,
        paySign: sign,
        signType: 'MD5',
        success: (res) => {
          rs([null, res]);
        },
        fail: (err) => {
          rs([err, null]);
        },
      });
    }
    /**
     * // TODO 微信小程序内内支付宝复制链接支付
     */
    async function copyPayLink() {
      const result = await prepay();
      if (result.code === 1) {
        //引入showModal 点击确认 复制链接；
        uni.showModal({
          title: '支付宝支付',
          content: '复制链接到外部浏览器',
          confirmText: '复制链接',
          success: (res) => {
            if (res.confirm) {
              uni.setClipboardData({
                data: result.data.pay_data,
                success: () => {
                  uni.showToast({
                    title: '已复制到剪切板',
                    icon: 'none',
                  });
                },
              });
            }
          },
        });
      }
    }
    /**
     * // TODO 浏览器内跳转支付宝支付
     */
    async function goToPayLink() {
      const result = await prepay();
      if (result) {
        window.location = result.data.pay_data;
      }
    }
    /**
     * 预支付
     * ---
     * 1.请求商家后台获取签名code等
     *  - next 获取code后拉起支付请求微信支付接口
     *
     */
    function prepay() {
      return new Promise((resolve) => {
        buildOrder(orderInfo).then((res) => {
          if (res.rescode !== 200) {
            uni.showToast({
              title: res.msg,
              icon: 'none',
            });
            rs([res.msg, null]);
          } else {
            resolve(res);
          }
        });
      });
    }
  });
}
