<template>
  <view>
    <u-tabbar
      v-model="current"
      :list="tabbarList"
      :icon-size="50"
      active-color="#F75959"
      inactive-color="#666"
    ></u-tabbar>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        tabbarList: [
          {
            iconPath: 'listing-content',
            selectedIconPath: 'listing-content-fill',
            text: '报名',
            isDot: false,
            customIcon: true,
            pagePath: '/pages/index/index',
          },
          {
            iconPath: 'smile',
            selectedIconPath: 'smile-fill',
            text: '考试',
            isDot: false,
            customIcon: true,
            pagePath: '/pages/exam/index',
          },
          {
            iconPath: 'listing-content',
            selectedIconPath: 'listing-content-fill',
            text: '查询',
            isDot: false,
            customIcon: true,
            pagePath: '/pages/query/index',
          },
          {
            iconPath: 'smile',
            selectedIconPath: 'smile-fill',
            text: '我的',
            isDot: false,
            customIcon: true,
            pagePath: '/pages/mine/index',
          },
        ],
        current: 4,
      };
    },
  };
</script>
