<!--
 * @Author: your name
 * @Date: 2022-02-22 17:18:09
 * @LastEditTime: 2022-03-03 17:45:18
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \credit-cert-h5\pages\query\index.vue
-->
<template>
  <view class="page">
    <!-- <u-tabs
      :list="queryList"
      :current="queryCurrent"
      @change="queryChange"
      :is-scroll="false"
      inactive-color="#999"
      active-color="#333"
      font-size="28"
      height="84"
      bar-width="32"
      bar-height="4"
    ></u-tabs> -->
    <Tab1 v-if="queryCurrent === 0"></Tab1>
    <Tab2 v-if="queryCurrent === 1"></Tab2>
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
  import Tab1 from './components/Tab_1.vue';
  import Tab2 from './components/Tab_2.vue';
  export default {
    components: {
      Tab1,
      Tab2,
    },
    data() {
      return {
        queryList: [
          // {
          //   name: '成绩查询',
          // },
          {
            name: '证书查询',
          },
        ],
        queryCurrent: 1,

        ossUrl: config.ossUrl,
        tabbarList: config.tabbarList,
        current: 3,
      };
    },
    methods: {
      // queryChange(index) {
      //   this.queryCurrent = index;
      // },
    },
  };
</script>

<style lang="scss" scoped>
  .page {
    height: 100%;
    overflow: hidden;
  }
</style>
