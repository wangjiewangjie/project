<template>
  <view class="page">
    <view class="order-wrap">
      <view class="order-header">
        <view class="order-header-l">报名编号：202109929299291</view>
        <view class="order-header-r">待支付</view>
      </view>
      <view class="order-content-wrap">
        <u-image width="216rpx" height="144rpx" src="/static/images/wx-code.png"></u-image>
        <view class="order-content">
          <view class="order-content-t">育婴师 五级/初级证书</view>
          <view class="order-content-m">报名时间：2019年10月1日</view>
          <view class="order-content-b">
            <text class="order-content-b-l">实付金额：</text>
            <text class="order-content-b-r">¥260.00</text>
          </view>
        </view>
      </view>
      <view class="order-btn">
        <u-button class="pay" plain type="info" shape="circle" @click="submit">取消订单</u-button>
        <u-button class="pay" plain type="primary" shape="circle" @click="routerOrderDetail"
          >查看详情</u-button
        >
        <u-button class="pay" plain type="primary" shape="circle" @click="submit"
          >立即支付</u-button
        >
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {
      routerOrderDetail() {
        this.$u.route({
          url: 'pages/order/orderDetail/orderDetail',
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .order-wrap {
    margin: 24rpx 24rpx 0;
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
      .order-header-r {
        color: $u-type-error;
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

  .order-btn {
    display: flex;
    justify-content: flex-end;
    padding: 0 24rpx 24rpx;
    .u-btn {
      margin: 0;
      width: 160rpx;
      height: 64rpx;
      font-size: 24rpx;
      & + .u-btn {
        margin-left: 24rpx;
      }
    }
    .u-btn--info--plain {
      color: $u-tips-color !important;
      border-color: $u-tips-color !important;
    }
    .u-btn--info--plain,
    .u-btn--primary--plain {
      background: #fff !important;
    }
  }
</style>
