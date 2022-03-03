<!--
 * @Author: your name
 * @Date: 2022-02-22 17:18:09
 * @LastEditTime: 2022-03-03 14:19:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \credit-cert-h5\components\PageFooter\PageFooter.vue
-->
<template>
  <view class="page-footer">
    <view class="follow-wrap">
      <u-image width="224rpx" height="224rpx" src="/static/images/wx-code.png"></u-image>
      <view class="follow-wrap-r">
        <view class="follow-tips">长按识别二维码</view>
        <view class="follow-tips">关注官方公众号</view>
        <view class="follow-wx">阜城市家庭服务业协会认定中心</view>
      </view>
    </view>
    <view class="footer">- 绝影天行科技公司技术支持 -</view>
  </view>
</template>

<style lang="scss" scoped>
  .page-footer {
    width: 100%;
  }
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
      margin-top: 16rpx;
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-tips-color;
    }
  }

  .footer {
    padding: 24rpx 0;
    border-top: 1rpx solid #eaeaea;
    font-size: 24rpx;
    line-height: 28rpx;
    color: $u-light-color;
    text-align: center;
  }
</style>
