<template>
  <view class="school-card">
    <u-image width="176rpx" height="176rpx" src="/static/images/school.png"></u-image>
    <view class="school-card-r">
      <view class="school-card-r-header">
        <view class="school-card-r-header-title">南京弘顶职业培训学校南京弘顶职业培训学校</view>
        <view class="school-card-r-header-call">
          <u-image width="32rpx" height="32rpx" :src="`${ossUrl}phone.png`"></u-image>
        </view>
      </view>
      <view class="school-card-num">培训人数 2999人</view>
      <view class="school-card-tips">
        <text class="school-card-tips-item">养老护理员</text>
      </view>
      <view class="school-card-address">
        <view class="school-card-location">中山东路300号长发中心A栋101</view>
        <view class="school-card-distance">&lt;100米</view>
      </view>
    </view>
  </view>
</template>

<script>
  import config from '@/config/config';
  export default {
    props: {
      schoolItem: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        ossUrl: config.ossUrl,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .school-card {
    display: flex;
    justify-content: space-between;
    padding: 24rpx;
    .school-card-r {
      flex: 1;
      margin-left: 24rpx;
    }
    .school-card-r-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12rpx;
      .school-card-r-header-title {
        width: 360rpx;
        font-weight: 500;
        font-size: 32rpx;
        line-height: 40rpx;
        color: $u-main-color;
      }
      .school-card-r-header-call {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 64rpx;
        height: 40rpx;
        background: #ecf2fe;
        border-radius: 20rpx;
      }
    }
    .school-card-num {
      margin-bottom: 14rpx;
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-main-color;
    }
    .school-card-tips {
      margin-bottom: 14rpx;
      font-size: 24rpx;
      line-height: 28rpx;
      color: #ed7b2f;
      .school-card-tips-item {
        padding: 2rpx 8rpx;
        background: #fef3e6;
        border-radius: 2rpx;
      }
    }

    .school-card-address {
      display: flex;
      justify-content: space-between;
      font-size: 24rpx;
      line-height: 32rpx;
      color: $u-tips-color;
    }
  }
</style>
