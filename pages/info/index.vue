<template>
  <view class="page">
    <view class="ul">
      <view class="li" @click="routerInfoDetail">
        <view class="li-t">为什么我的考试费不能退费？</view>
        <view class="li-m"
          >2022年上半年中小学教师资格考试（笔试）报名工作将于1月24日开始，此次笔试在30个省（自治区2022年上半年中小学教师资格考试（笔试）报名工作将于1月24日开始，此次笔试在30个省（自治区...</view
        >
        <view class="li-b">今天 10:29</view>
      </view>
    </view>
    <PageFooter></PageFooter>
  </view>
</template>

<script>
  import config from '@/config/config';
  import PageFooter from '@/components/PageFooter/PageFooter';
  export default {
    component: {
      PageFooter,
    },
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
      margin-bottom: 24rpx;
      font-weight: 500;
      font-size: 32rpx;
      line-height: 48rpx;
      color: $u-main-color;
    }
    .li-m {
      margin-bottom: 24rpx;
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-content-color;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .li-b {
      font-size: 24rpx;
      line-height: 32rpx;
      color: $u-tips-color;
    }
  }
</style>
