<template>
  <view class="page">
    <view class="title">{{ options.title }}</view>
    <view class="basic-info">
      <view class="basic-info-l">官方发布</view>
      <view class="basic-info-r">发布时间: {{ options.addTime | filterDay }}</view>
    </view>
    <view class="content" v-html="options.content"></view>
    <PageFooter></PageFooter>
  </view>
</template>

<script>
  import PageFooter from '@/components/PageFooter/PageFooter';
  import dayjs from 'dayjs';
  export default {
    component: {
      PageFooter,
    },
    filters: {
      filterDay(val) {
        return val ? dayjs(Number(val)).format('YYYY-MM-DD HH:MM:ss') : '-';
      },
    },
    onLoad(options) {
      this.options = options;
    },
  };
</script>

<style lang="scss" scoped>
  .page {
    height: 100%;
    .title {
      margin: 24rpx 24rpx 16rpx;
      font-weight: 500;
      font-size: 40rpx;
      line-height: 56rpx;
      color: #222222;
    }
    .basic-info {
      display: flex;
      align-items: center;
      margin: 0 24rpx 16rpx;
      .basic-info-l {
        margin-right: 32rpx;
        padding-right: 32rpx;
        font-size: 24rpx;
        line-height: 32rpx;
        color: $u-type-primary;
        border-right: 2rpx solid #dcdcdc;
      }
      .basic-info-r {
        font-size: 24rpx;
        line-height: 32rpx;
        color: $u-tips-color;
      }
    }
    .content {
      padding: 24rpx;
    }
  }
</style>
