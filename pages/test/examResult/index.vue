<template>
  <view class="page">
    <u-navbar :title="userInfo.phone | filterPhone"></u-navbar>
    <PaperType1 v-if="examResult.paperType == 1" :examResult="examResult"></PaperType1>
    <PaperType2 v-if="examResult.paperType == 2" :examResult="examResult"></PaperType2>
  </view>
</template>

<script>
  import config from '@/config/config';
  import commonInfo from '@/util/commonInfo';
  import PaperType1 from '../components/PaperType1.vue';
  import PaperType2 from '../components/PaperType2.vue';
  export default {
    components: {
      PaperType1,
      PaperType2,
    },
    filters: {
      filterPhone(val) {
        return ` ${val.substr(0, 3)}****${val.substr(7)}`;
      },
    },
    data() {
      return {
        userInfo: {},
        examResult: {},
        ossUrl: config.ossUrl,
      };
    },
    onLoad(options) {
      this.userInfo = commonInfo.getUser();
      this.examResult = options;
    },
  };
</script>

<style lang="scss" scoped>
  .page {
    height: 100%;
    background: #fff;
  }
</style>
