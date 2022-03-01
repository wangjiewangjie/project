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
  import { queryCertificatereservation } from '@/util/ajax/services';
  import dayjs from 'dayjs';
  import polyPay from '@/util/pay';
  import $platform from '@/util/platform';
  import commonInfo from '@/util/commonInfo';
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
        this.paying = true;
        const [err, res] = await polyPay('wechat', {
          orderId: this.certificatereservation.orderNo,
          wayId: 5,
          sceneType: this.getEnvScene(),
          appId: config.miniAppId,
          openId: JSON.parse(uni.getStorageSync('wechatGrantInfo')).openid,
        });
        this.paying = false;
        if (err) {
          // 取消支付
        }
        if (res) {
          // this.$Router.push({
          //   path: '/pages/order/payway/payResult/index',
          //   query: {
          //     payState: 'success',
          //     orderId: this.orderId,
          //   },
          // });
          // return;
        }
      },
      /**
       * 小程序平台场景 临时写1
       * - 1：c端 H5
       * - 2：C端小程序
       * - 3：s端小程序
       */
      getEnvScene() {
        if ($platform.get() === 'wxMiniProgram') {
          return 2;
        }
        if ($platform.get() === 'H5') {
          return 1;
        }
        return;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .page {
    height: 100%;
  }

  .card {
    margin: 24rpx 24rpx 0;
    border-radius: 16rpx;
    background: #fff;
  }

  .exam-info-wrap {
    .exam-info-header {
      display: flex;
      justify-content: space-between;
      padding: 24rpx;
      font-size: 24rpx;
      line-height: 32rpx;
      color: $u-content-color;
      border-bottom: 2rpx solid #f5f5f5;
    }
    .exam-content-wrap {
      display: flex;
      padding: 24rpx 24rpx 40rpx;
      .exam-content {
        flex: 1;
        margin-left: 16rpx;
        font-weight: 500;
        font-size: 32rpx;
        line-height: 40rpx;
        color: $u-main-color;
        .exam-price {
          font-size: 28rpx;
          line-height: 44rpx;
          color: $u-type-error;
        }
      }
    }

    .exam-li {
      padding: 0 24rpx 24rpx;
      color: $u-content-color;
    }
  }

  .exam-li {
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
    line-height: 36rpx;
  }

  .exam-ul {
    padding: 24rpx;
    .exam-li {
      color: $u-main-color;
      & + .exam-li {
        padding-top: 24rpx;
      }
      .exam-li-r {
        font-weight: bold;
      }
      &:nth-child(1) {
        .exam-li-r {
          color: $u-type-error;
        }
      }
    }
    .exam-ul-title {
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-main-color;
    }
    .exam-ol {
      padding-top: 24rpx;
      font-size: 24rpx;
      line-height: 32rpx;
      color: $u-content-color;
      .a {
        color: $u-type-primary;
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16rpx 24rpx 0;
    width: 100%;
    border-top: 1rpx solid #e0e0e0;
    background: #f7f7f7;
    .price-wrap {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      line-height: 32rpx;
      color: $u-main-color;
      .price {
        font-weight: bold;
        font-size: 48rpx;
        line-height: 48rpx;
        color: $u-type-error;
      }
      .price-rmb {
        font-size: 28rpx;
      }
    }
    .pay {
      margin: 0;
      width: 284rpx;
      height: 80rpx;
    }
  }
</style>
