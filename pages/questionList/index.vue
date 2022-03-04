<template>
  <view class="page">
    <view class="ul">
      <view class="li" @click="routerInfoDetail">
        <view class="li-t">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}question.png`"></u-image>
          <view class="li-t-r">为什么我的考试费不能退费？</view>
        </view>
        <view class="li-b">
          <view class="li-b-l">官方发布</view>
          <view class="li-b-r">今天 10:29</view>
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
    methods: {
      routerInfoDetail() {
        this.$u.route({
          url: 'pages/infoDetail/index',
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .ul {
    margin: 24rpx;

    .li {
      padding: 24rpx;
      background: #ffffff;
      border-radius: 16rpx;
    }

    .li-t {
      display: flex;
      align-items: center;
      margin-bottom: 24rpx;

      .li-t-r {
        margin-left: 16rpx;
        font-weight: 500;
        font-size: 32rpx;
        line-height: 48rpx;
        color: $u-main-color;
      }
    }

    .li-b {
      display: flex;
      font-size: 24rpx;
      line-height: 32rpx;
      color: $u-tips-color;

      .li-b-l {
        margin-right: 16rpx;
      }
    }
  }
</style>
