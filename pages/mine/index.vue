<template>
  <view class="page">
    <view class="header-wrap">
      <view class="header" @click="routerLogin">
        <u-image
          shape="circle"
          width="100rpx"
          height="100rpx"
          :src="userInfo.headImgUrl || `${ossUrl}mine-avatar.png`"
        ></u-image>
        <view class="name">{{ userInfo.phone || '点击登录/注册' }}</view>
        <u-image width="32rpx" height="32rpx" :src="`${ossUrl}right-arrows_2.png`"></u-image>
      </view>
    </view>
    <view class="ul">
      <view class="li" @click="routerOrder">
        <view class="li-l">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}mine-list_1.png`"></u-image>报名记录
        </view>
        <u-image width="32rpx" height="32rpx" :src="`${ossUrl}right-arrows_3.png`"></u-image>
      </view>
      <view class="li">
        <view class="li-l">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}mine-list_2.png`"></u-image>联系客服
        </view>
        <u-image width="32rpx" height="32rpx" :src="`${ossUrl}right-arrows_3.png`"></u-image>
      </view>
      <view class="li" @click="routerQuestion">
        <view class="li-l">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}mine-list_3.png`"></u-image>常见问题
        </view>
        <u-image width="32rpx" height="32rpx" :src="`${ossUrl}right-arrows_3.png`"></u-image>
      </view>
    </view>

    <view class="school-wrap" v-if="!isLogin">
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

    <u-button v-if="isLogin" @click="onQuit" class="login-out" type="primary" shape="circle" plain
      >退出登录</u-button
    >

    <u-tabbar
      v-model="current"
      :list="tabbarList"
      :icon-size="54"
      active-color="#0052d9"
      inactive-color="#666"
    >
    </u-tabbar>
  </view>
</template>

<script>
  import config from '@/config/config';
  import SchoolCard from '@/components/SchoolCard/SchoolCard';
  import commonInfo from '@/util/commonInfo';
  import { queryDistancePageList } from '@/util/ajax/services';
  export default {
    component: {
      SchoolCard,
    },
    data() {
      return {
        userInfo: {},
        schoolList: [],
        isLogin: false,

        ossUrl: config.ossUrl,
        tabbarList: config.tabbarList,
        current: 4,
      };
    },
    onLoad() {
      this.userInfo = commonInfo.getUser();
      this.isLogin = Boolean(commonInfo.getToken());
      this.queryDistancePageListApi();
    },
    methods: {
      routerLogin() {
        if (!commonInfo.getToken()) {
          this.$u.route({
            url: 'pages/login/index',
            type: 'redirectTo',
          });
        }
      },
      onQuit() {
        commonInfo.setToken('');
        commonInfo.setUser('');

        this.$u.route({
          url: 'pages/login/index',
          type: 'redirectTo',
        });
      },
      routerOrder() {
        this.$u.route({
          url: 'pages/order/index',
        });
      },
      routerQuestion() {
        this.$u.route({
          url: 'pages/questionList/index',
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
  @import './index.scss';
</style>
