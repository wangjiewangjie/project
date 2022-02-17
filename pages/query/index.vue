<template>
  <view>
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
  export default {
    data() {
      return {
        tabbarList: config.tabbarList,
        current: 3,
      };
    },
  };
</script>
