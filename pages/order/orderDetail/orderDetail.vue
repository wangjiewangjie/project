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
    height: 112px;
    background: linear-gradient(95.08deg, #0052d9 0%, #bbd3fb 100%);
    .order-state {
      padding: 28px 16px;
      color: #ffffff;
      .order-state-t {
        font-weight: 600;
        font-size: 18px;
        line-height: 25px;
      }
      .order-state-b {
        font-size: 12px;
        line-height: 17px;
        letter-spacing: 0.5px;
      }
    }
    .u-image {
      margin: 12px 32px;
    }
  }

  .order-wrap {
    position: relative;
    top: -20px;
    margin: 0 12px;
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

  .order-info-wrap {
    margin: 4px 12px 12px;
    .order-info-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      line-height: 20px;
      color: #666;
      .order-info-editor {
        margin: 0;
        width: 96px;
        height: 24px;
        border-radius: 20px;
        font-size: 12px;
        background: #f7f7f7 !important;
      }
    }
    .order-info {
      margin-top: 16px;
      padding: 12px;
      border-radius: 8px;
      background: #fff;
    }
    .order-info-li {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      line-height: 18px;
      color: #333333;
      .order-info-li-r {
        width: 160px;
        word-wrap: break-word;
      }
      & + .order-info-li {
        margin-top: 12px;
      }
    }
  }
</style>
