<template>
  <view class="page">
    <ProgressBar :current="3"></ProgressBar>

    <view class="exam-info-wrap">
      <view class="exam-info-header">
        <view class="exam-num">报名编号：EB8332819982192</view>
        <view class="exam-time">02-08 15:33</view>
      </view>
      <view class="exam-content-wrap">
        <u-image width="224rpx" height="224rpx" src="/static/images/wx-code.png"></u-image>
        <view class="exam-content">
          <view class="exam-name">育婴师 初级/五级</view>
          <view class="exam-price">¥260.00</view>
        </view>
      </view>
      <view class="exam-li">
        <view class="exam-li-l">考试期数</view>
        <view class="exam-li-r">¥260.00</view>
      </view>
      <view class="exam-li">
        <view class="exam-li-l">考试时间</view>
        <view class="exam-li-r">¥260.00</view>
      </view>
      <view class="exam-li">
        <view class="exam-li-l">考试产地</view>
        <view class="exam-li-r">¥260.00</view>
      </view>
    </view>
    <view class="exam-ul">
      <view class="exam-li">
        <view class="exam-li-l">优惠</view>
        <view class="exam-li-r">¥260.00</view>
      </view>
      <view class="exam-li">
        <view class="exam-li-l">总计</view>
        <view class="exam-li-r">¥260.00</view>
      </view>
    </view>
  </view>
</template>

<script>
  import config from '@/config/config';
  import ProgressBar from './components/ProgressBar.vue';
  export default {
    components: {
      ProgressBar,
    },
    data() {
      return {
        ossUrl: config.ossUrl,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .page {
    height: 100%;
  }
</style>
