<template>
  <view class="page">
    <view class="order-state-wrap">
      <view class="order-state">
        <view class="order-state-t">支付成功</view>
        <view class="order-state-b">订单已完成，谢谢您的支持</view>
      </view>
      <u-image width="152rpx" height="120rpx" :src="`${ossUrl}order-detail-1.png`"></u-image>
    </view>
    <view class="order-wrap">
      <view class="order-header">
        <view class="order-header-l">报名编号：202109929299291</view>
      </view>
      <view class="order-content-wrap">
        <u-image width="216rpx" height="144rpx" src="/static/images/wx-code.png"></u-image>
        <view class="order-content">
          <view class="order-content-t">育婴师 五级/初级证书</view>
          <view class="order-content-m">报名时间：2019年10月1日</view>
          <view class="order-content-m">支付方式：微信支付</view>
          <view class="order-content-b">
            <text class="order-content-b-l">实付金额：</text>
            <text class="order-content-b-r">¥260.00</text>
          </view>
        </view>
      </view>
    </view>

    <view class="order-info-wrap">
      <view class="order-info-header">
        <view class="order-info-title">报名信息</view>
        <u-button class="order-info-editor" plain type="primary" shape="circle" @click="routerApply"
          >修改扩展信息</u-button
        >
      </view>
      <view class="order-info">
        <view class="order-info-li">
          <view class="order-info-li-l">姓名</view>
          <view class="order-info-li-r">xx</view>
        </view>
        <view class="order-info-li">
          <view class="order-info-li-l">姓名</view>
          <view class="order-info-li-r"
            >xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import config from '@/config/config';
  export default {
    data() {
      return {
        ossUrl: config.ossUrl,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .order-state-wrap {
    display: flex;
    justify-content: space-between;
    height: 224rpx;
    background: linear-gradient(95.08deg, #0052d9 0%, #bbd3fb 100%);
    .order-state {
      padding: 56rpx 32rpx;
      color: #ffffff;
      .order-state-t {
        font-weight: 600;
        font-size: 36rpx;
        line-height: 50rpx;
      }
      .order-state-b {
        font-size: 24rpx;
        line-height: 34rpx;
        letter-spacing: 1rpx;
      }
    }
    .u-image {
      margin: 24rpx 64rpx;
    }
  }

  .order-wrap {
    position: relative;
    top: -40rpx;
    margin: 0 24rpx;
    border-radius: 16rpx;
    background: #fff;
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx;
      border-bottom: 1rpx solid $u-form-item-border-color;
      font-size: 24rpx;
      line-height: 32rpx;
      .order-header-l {
        color: $u-content-color;
      }
    }
    .order-content-wrap {
      display: flex;
      padding: 24rpx;
      .u-image {
        border-radius: 8rpx;
      }
    }
    .order-content {
      margin-left: 24rpx;
      .order-content-t {
        margin-bottom: 8rpx;
        font-weight: 500;
        font-size: 32rpx;
        line-height: 44rpx;
        color: $u-main-color;
      }
      .order-content-m {
        margin-bottom: 8rpx;
        font-size: 24rpx;
        line-height: 32rpx;
        color: $u-content-color;
      }
      .order-content-b {
        line-height: 36rpx;
        color: $u-main-color;
      }
      .order-content-b-l {
        font-weight: 500;
        font-size: 24rpx;
      }
      .order-content-b-r {
        font-size: 28rpx;
      }
    }
  }

  .order-info-wrap {
    margin: 8rpx 24rpx 24rpx;
    .order-info-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 32rpx;
      line-height: 40rpx;
      color: $u-content-color;
      .order-info-editor {
        margin: 0;
        width: 192rpx;
        height: 48rpx;
        border-radius: 40rpx;
        font-size: 24rpx;
        background: #f7f7f7 !important;
      }
    }
    .order-info {
      margin-top: 32rpx;
      padding: 24rpx;
      border-radius: 16rpx;
      background: #fff;
    }
    .order-info-li {
      display: flex;
      justify-content: space-between;
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-main-color;
      .order-info-li-r {
        width: 320rpx;
        word-wrap: break-word;
      }
      & + .order-info-li {
        margin-top: 24rpx;
      }
    }
  }
</style>
