<!--
 * @Author: your name
 * @Date: 2022-03-03 16:54:55
 * @LastEditTime: 2022-03-04 11:25:11
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \credit-cert-h5\pages\infoDetail\index.vue
-->
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
  @import './index.scss';
</style>
