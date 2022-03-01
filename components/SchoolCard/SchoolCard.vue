<template>
  <view class="school-card">
    <u-image width="176rpx" height="176rpx" :src="schoolItem.schoolLogo"></u-image>
    <view class="school-card-r">
      <view class="school-card-r-header">
        <view class="school-card-r-header-title">{{ schoolItem.name }}</view>
        <view class="school-card-r-header-call" @click="call(schoolItem.phone)">
          <u-image width="32rpx" height="32rpx" :src="`${ossUrl}phone.png`"></u-image>
        </view>
      </view>
      <view class="school-card-num">培训人数 {{ schoolItem.trainNum }}人</view>
      <view class="school-card-tips">
        <text class="school-card-tips-item">养老护理员</text>
      </view>
      <view class="school-card-address">
        <view class="school-card-location">{{ schoolItem.address }}</view>
        <view class="school-card-distance">{{ schoolItem.distance | filterDistance }}</view>
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
    filters: {
      filterDistance(val) {
        let distance = parseInt(val);
        if (distance < 100) {
          return `<100m`;
        } else if (distance > 1000) {
          return `${parseInt(val / 1000)}km`;
        }
      },
    },
    data() {
      return {
        ossUrl: config.ossUrl,
      };
    },
    methods: {
      call(value) {
        uni.makePhoneCall({
          phoneNumber: value,
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .school-card {
    display: flex;
    justify-content: space-between;
    padding: 24rpx;
    background: #fff;
    border-radius: 16rpx;
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
