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
    margin: 12px 12px 0;
    border-radius: 8px;
    background: #fff;
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-bottom: 0.5px solid #eaeaea;
      font-size: 12px;
      line-height: 16px;
      .order-header-l {
        color: #666666;
      }
      .order-header-r {
        color: #e34d59;
      }
    }
    .order-content-wrap {
      display: flex;
      padding: 12px;
      .u-image {
        border-radius: 4px;
      }
    }
    .order-content {
      margin-left: 12px;
      .order-content-t {
        margin-bottom: 4px;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #333333;
      }
      .order-content-m {
        margin-bottom: 4px;
        font-size: 12px;
        line-height: 16px;
        color: #666666;
      }
      .order-content-b {
        line-height: 18px;
        color: #333333;
      }
      .order-content-b-l {
        font-weight: 500;
        font-size: 12px;
      }
      .order-content-b-r {
        font-size: 14px;
      }
    }
  }

  .order-btn {
    display: flex;
    justify-content: flex-end;
    padding: 0 12px 12px;
    .u-btn {
      margin: 0;
      width: 80px;
      height: 32px;
      font-size: 12px;
      & + .u-btn {
        margin-left: 12px;
      }
    }
    .u-btn--info--plain {
      color: #999 !important;
      border-color: #999 !important;
    }
    .u-btn--info--plain,
    .u-btn--primary--plain {
      background: #fff !important;
    }
  }
</style>
