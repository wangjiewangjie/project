<template>
  <view class="page">
    <ProgressBar :current="4"></ProgressBar>
    <view class="success-wrap card">
      <u-image
        width="240rpx"
        height="240rpx"
        :src="`${ossUrl}apply_4-submit_success.png`"
      ></u-image>
      <view class="success-tips">恭喜，报名成功！</view>
      <view class="success-time">您于2022年1月13日提交的报名支付成功</view>
      <view class="success-btn">
        <u-button plain type="primary" shape="circle" @click="submit">返回首页</u-button>
        <u-button type="primary" shape="circle" @click="submit">立即查看</u-button>
      </view>
    </view>

    <view class="school-wrap">
      <view class="school-wrap-title">
        <view class="school-title">推荐培训学校</view>
        <view class="more-btn">
          更多
          <u-image width="24rpx" height="24rpx" :src="`${ossUrl}right-arrows.png`"></u-image>
        </view>
      </view>
      <SchoolCard></SchoolCard>
    </view>

    <Contact></Contact>
  </view>
</template>

<script>
  import config from '@/config/config';
  import ProgressBar from './components/ProgressBar.vue';
  import Contact from './components/Contact.vue';
  export default {
    components: {
      ProgressBar,
      Contact,
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

  .card {
    margin: 24rpx 24rpx 0;
    border-radius: 16rpx;
    background: #fff;
  }
  .success-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24rpx;
    .u-image {
      margin-top: 96rpx;
    }
    .success-tips {
      font-weight: 500;
      font-size: 40rpx;
      line-height: 56rpx;
      color: $u-type-primary;
    }
    .success-time {
      margin: 16rpx 0 80rpx;
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-tips-color;
    }
    .success-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .u-btn {
        margin: 0;
        width: 310rpx;
        height: 80rpx;
      }
    }
  }

  .school-wrap {
    margin: 48rpx 24rpx 0;
  }

  .school-wrap-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx;
    font-weight: 600;
    font-size: 36rpx;
    line-height: 48rpx;
    color: $u-main-color;
  }

  .more-btn {
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: 24rpx;
    line-height: 32rpx;
    color: $u-tips-color;
  }

  .school-card {
    background: #fff;
    border-radius: 16rpx;
  }
</style>
