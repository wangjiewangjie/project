<template>
  <view class="page">
    <view>
      <view class="title">{{ options.title }}</view>
      <view class="basic-info">
        <view class="basic-info-l">官方发布</view>
        <view class="basic-info-r">发布时间: {{ options.addTime | filterDay }}</view>
      </view>
      <view class="content" v-html="options.content"></view>
      <view class="share">
        <view class="share-btn" @click="onWXShare">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}wx-share_1.png`"></u-image>
        </view>
        <view class="share-btn" @click="onWXShare(1)">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}wx-share_2.png`"></u-image>
        </view>
      </view>
    </view>
    <PageFooter></PageFooter>
  </view>
</template>

<script>
  import PageFooter from '@/components/PageFooter/PageFooter';
  import dayjs from 'dayjs';
  import config from '@/config/config';
  import wx from '@/util/wx';
  export default {
    component: {
      PageFooter,
    },
    filters: {
      filterDay(val) {
        return val ? dayjs(Number(val)).format('YYYY-MM-DD HH:MM:ss') : '-';
      },
    },
    data() {
      return {
        ossUrl: config.ossUrl,
      };
    },
    onLoad(options) {
      this.options = options;
      wx.queryWechatConfig();
    },
    methods: {
      onWXShare(e) {
        wx.customWxShare({
          shareType: e,
          title: this.options.title,
          desc: this.options.content,
          imgUrl: '',
          link: `${config.shareH5BaseUrl}#/pages/infoDetail/index?title=${this.options.title}&addTime=${this.options.addTime}&content=${this.options.content}`,
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

  .share {
    position: fixed;
    right: 24rpx;
    bottom: 50%;
    .share-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 96rpx;
      height: 96rpx;
      background: #fff;
      border-radius: 100%;
      & + .share-btn {
        margin-top: 32rpx;
      }
    }
  }
</style>
