<template>
  <u-image class="contact" width="168rpx" height="144rpx" :src="`${ossUrl}contact_2.png`"></u-image>
</template>

<script>
  import config from '@/config/config';
  export default {
    data() {
      return {
        ossUrl: config.ossUrl,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .contact {
    position: fixed;
    right: 24rpx;
    bottom: 152rpx;
  }
</style>
