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
    margin: 12px 12px 0;
    border-radius: 8px;
    background: #fff;
  }
  .success-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    .u-image {
      margin-top: 48px;
    }
    .success-tips {
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
      color: #0052d9;
    }
    .success-time {
      margin: 8px 0 40px;
      font-size: 14px;
      line-height: 18px;
      color: #999999;
    }
    .success-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .u-btn {
        margin: 0;
        width: 155px;
        height: 40px;
      }
    }
  }

  .school-wrap {
    margin: 24px 12px 0;
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
