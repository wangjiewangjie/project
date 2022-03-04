<!--
 * @Author: your name
 * @Date: 2022-02-22 17:18:09
 * @LastEditTime: 2022-03-04 11:18:57
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \credit-cert-h5\pages\apply\apply_4.vue
-->
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
      <view class="success-time">您于{{ new Date() | filterDay }}提交的报名支付成功</view>
      <view class="success-btn">
        <u-button plain type="primary" shape="circle" @click="routerIndex">返回首页</u-button>
        <u-button type="primary" shape="circle" @click="routerOrderDetail">立即查看</u-button>
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
      <block v-for="(item, index) in schoolList" :key="index">
        <SchoolCard :schoolItem="item"></SchoolCard>
      </block>
    </view>

    <Contact></Contact>
  </view>
</template>

<script>
  import config from '@/config/config';
  import ProgressBar from './components/ProgressBar.vue';
  import Contact from './components/Contact.vue';
  import dayjs from 'dayjs';
  import commonInfo from '@/util/commonInfo';
  import { queryDistancePageList } from '@/util/ajax/services';
  export default {
    components: {
      ProgressBar,
      Contact,
    },
    filters: {
      filterDay(val) {
        return dayjs(Number(val)).format('YYYY年MM月DD日');
      },
    },
    data() {
      return {
        options: {},
        schoolList: [],
        ossUrl: config.ossUrl,
      };
    },
    onLoad(options) {
      this.options = options;
      this.queryDistancePageListApi();
    },
    methods: {
      routerIndex() {
        this.$u.route({
          url: 'pages/index/index',
          type: 'switchTab',
        });
      },
      routerOrderDetail() {
        this.$u.route({
          url: 'pages/order/orderDetail/orderDetail',
          params: {
            id: this.options.id,
          },
        });
      },
      async queryDistancePageListApi() {
        let params = {
          ...commonInfo.getLocaiton(),
        };
        let result = await queryDistancePageList(params);
        this.schoolList = result.data.dataList;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import './css/apply_4.scss';
</style>
