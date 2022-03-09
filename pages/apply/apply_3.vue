<template>
  <view class="page">
    <ProgressBar :current="3"></ProgressBar>

    <view class="exam-info-wrap card">
      <view class="exam-info-header">
        <view class="exam-num">报名编号：{{ certificatereservation.orderNo }}</view>
        <view class="exam-time">{{ certificatereservation.addTime | filterDay }}</view>
      </view>
      <view class="exam-content-wrap">
        <u-image width="216rpx" height="144rpx" src="/static/images/cert.png"></u-image>
        <view class="exam-content">
          <view class="exam-name">
            {{ certificatereservation.professionalName }}
            {{ certificatereservation.levelName }}
          </view>
          <view class="exam-price">¥{{ certificatereservation.supervisorCost | calcPrice }}</view>
        </view>
      </view>
      <view class="exam-li">
        <view class="exam-li-l">考试期数</view>
        <view class="exam-li-r">{{ certificatereservation.examineScheduleVO.title }}</view>
      </view>
      <view class="exam-li">
        <view class="exam-li-l">考试时间</view>
        <view class="exam-li-r">{{ certificatereservation.examineScheduleVO.examineTime }}</view>
      </view>
      <view class="exam-li">
        <view class="exam-li-l">考试场地</view>
        <view class="exam-li-r">{{
          certificatereservation.examineScheduleVO.examineRoomName
        }}</view>
      </view>
    </view>
    <!-- <view class="exam-ul card">
      <view class="exam-li">
        <view class="exam-li-l">优惠</view>
        <view class="exam-li-r">{{ certificatereservation.supervisorCost }}</view>
      </view>
      <view class="exam-li">
        <view class="exam-li-l">总计</view>
        <view class="exam-li-r">{{ certificatereservation.supervisorCost }}</view>
      </view>
    </view>-->
    <view class="exam-ul card">
      <view class="exam-ul-title">报名须知</view>
      <view class="exam-ol">1.请确认考试信息和考试时间无误,购买成功后将不予退换</view>
      <view class="exam-ol">
        2.下单即代表你同意
        <text class="a">《xxxx协议》</text>
      </view>
    </view>

    <Contact></Contact>

    <!-- 支付 -->
    <view class="footer">
      <view class="price-wrap">
        实付金额：
        <view class="price">
          <text class="price-rmb">¥</text>
          {{ certificatereservation.supervisorCost | calcPrice }}
        </view>
      </view>
      <u-button class="pay" type="error" shape="circle" @click="submit">去支付</u-button>
    </view>
  </view>
</template>

<script>
  import config from '@/config/config';
  import ProgressBar from './components/ProgressBar.vue';
  import Contact from './components/Contact.vue';
  import { queryCertificatereservation, buildOrder } from '@/util/ajax/services';
  import dayjs from 'dayjs';
  import commonInfo from '@/util/commonInfo';
  const jweixin = require('jweixin-module');
  export default {
    filters: {
      filterDay(val) {
        return dayjs(Number(val)).format('YYYY/MM/DD HH:mm:ss');
      },
      calcPrice(val) {
        return commonInfo.calcPrice(val);
      },
    },
    components: {
      ProgressBar,
      Contact,
    },
    data() {
      return {
        certificatereservation: {},
        ossUrl: config.ossUrl,
        options: {},
      };
    },
    onLoad(options) {
      this.options = options;
      let params = {
        id: options.id,
      };
      this.queryCertificatereservationApi(params);
    },
    methods: {
      async queryCertificatereservationApi(params) {
        let res = await queryCertificatereservation(params);
        this.certificatereservation = res.data;
      },
      async submit() {
        let params = {
          appId: config.h5wxAppId,
          openId: 'oRGnWw8_abKRh6ZHBahFJ64Qm4NE',
          paySource: 2, // 支付来源: 1、上岗卡；2、证书；3、订单
          payWayId: 6, // 支付方式编号：4、微信app支付；5、微信公众号支付；6、微信小程序支付；7、微信扫码支付；
          orderId: this.certificatereservation.orderNo,
        };
        let res = await buildOrder(params);
        if (res.rescode === 200) {
          let payResult = res.data.payResult;
          jweixin.config({
            debug: true,
            appId: payResult.appid, // 必填，公众号的唯一标识
            timestamp: payResult.timestamp, // 必填，生成签名的时间戳
            nonceStr: payResult.noncestr, // 必填，生成签名的随机串
            signature: payResult.sign, // 必填，签名，见附录1
            jsApiList: ['chooseWXPay'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          jweixin.chooseWXPay({
            timestamp: payResult.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: payResult.noncestr, // 支付签名随机串，不长于 32 位
            package: payResult.packageName, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: payResult.sign, // 支付签名
            success: () => {
              this.$refs.uToast.show({
                title: '支付成功',
                type: 'success',
                url: '/pages/apply/apply_4',
                params: {
                  id: this.options.id,
                },
              });
            },
            cancel: () => {
              // console.log('cancel=====', r);
            },
            fail: () => {
              // console.log('payfail=====', err);
            },
          });
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import './css/apply_3.scss';
</style>
