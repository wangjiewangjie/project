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
      <!-- <view class="li" @click="routerQuestion">
        <view class="li-l">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}mine-list_2.png`"></u-image>常见问题
        </view>
        <u-image width="32rpx" height="32rpx" :src="`${ossUrl}right-arrows_3.png`"></u-image>
      </view> -->
    </view>

    <view class="school-wrap" v-if="!isLogin">
      <view class="school-wrap-title">
        <view class="school-title">推荐培训学校</view>
        <view class="more-btn">
          更多
          <u-image width="24rpx" height="24rpx" :src="`${ossUrl}right-arrows.png`"></u-image>
        </view>
      </view>
      <SchoolCard></SchoolCard>
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
    ></u-tabbar>
  </view>
</template>

<script>
  import config from '@/config/config';
  import SchoolCard from '@/components/SchoolCard/SchoolCard';
  import commonInfo from '@/util/commonInfo';
  export default {
    component: {
      SchoolCard,
    },
    data() {
      return {
        userInfo: {},
        isLogin: false,

        ossUrl: config.ossUrl,
        tabbarList: config.tabbarList,
        current: 4,
      };
    },
    onLoad() {
      this.userInfo = commonInfo.getUser();
      this.isLogin = Boolean(commonInfo.getToken());
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
    },
  };
</script>

<style lang="scss" scoped>
  $margin: 24rpx 24rpx 0rpx;
  $background: #fff;
  $borderRadius: 16rpx;
  .header-wrap {
    width: 750rpx;
    height: 400rpx;
    background: url($ossUrl + 'mine-bg.png') no-repeat;
    background-size: 750rpx 400rpx;
    .header {
      display: flex;
      align-items: center;
      padding: 192rpx 0 0 48rpx;
    }
    .name {
      margin-left: 24rpx;
      font-weight: 500;
      font-size: 40rpx;
      line-height: 56rpx;
      color: #ffffff;
    }
  }

  .ul {
    position: relative;
    top: -60rpx;
    margin: 0 24rpx;
    width: calc(100% - 48rpx);
    border-radius: 16rpx;
    background: #fff;
    .li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32rpx;
      height: 112rpx;
      font-size: 32rpx;
      line-height: 44rpx;
      color: #363d46;
      .li-l {
        display: flex;
        align-items: center;
        .u-image {
          margin-right: 16rpx;
        }
      }
      & + .li {
        border-top: 1rpx solid $u-form-item-border-color;
      }
    }
  }

  .school-wrap {
    position: relative;
    top: -60rpx;
    margin: $margin;
    overflow: hidden;

    .u-tabs {
      margin: 24rpx 0 16rpx;
    }
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
    border-radius: $borderRadius;
  }

  .login-out {
    position: fixed;
    bottom: 160rpx;
    margin: 0 24rpx;
    width: calc(100% - 48rpx);
    background: none !important;
  }
</style>
