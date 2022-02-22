<template>
  <view>
    <view class="follow-wrap">
      <u-image width="224rpx" height="224rpx" src="/static/images/wx-code.png"></u-image>
      <view class="follow-wrap-r">
        <view class="follow-tips">长按识别二维码</view>
        <view class="follow-tips">关注官方公众号</view>
        <view class="follow-wx">阜城市家庭服务业协会认定中心</view>
      </view>
    </view>
    <view class="page-footer">- 绝影天行科技公司技术支持 -</view>
  </view>
</template>

<style lang="scss" scoped>
  .follow-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 160rpx;
    padding: 24rpx;
    .follow-wrap-r {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .follow-tips {
      font-weight: 500;
      font-size: 32rpx;
      line-height: 40rpx;
      color: $u-main-color;
    }
    .follow-wx {
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-tips-color;
    }
  }

  .page-footer {
    padding: 24rpx 0;
    font-size: 24rpx;
    line-height: 28rpx;
    color: $u-tips-color;
    text-align: center;
  }
</style>
