<template>
  <view class="page">
    <view class="ul">
      <view
        class="li"
        @click="routerInfoDetail(item)"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <view class="li-t">{{ item.title }}</view>
        <view class="li-m">{{ item.content | formatText }}</view>
        <view class="li-b">{{ item.addTime | filterDay }}</view>
      </view>
    </view>
    <PageFooter></PageFooter>
  </view>
</template>

<script>
  import { queryInformationPageList } from '@/util/ajax/services';
  import PageFooter from '@/components/PageFooter/PageFooter';
  import dayjs from 'dayjs';
  let hasMoreData = true;

  export default {
    component: {
      PageFooter,
    },
    filters: {
      filterDay(val) {
        return val ? dayjs(Number(val)).format('YYYY年MM月DD日') : '-';
      },
      formatText(val) {
        return val ? val.replace(/<\/?.+?\/?>/g, '') : '';
      },
    },
    data() {
      return {
        pageNum: 0,
        dataList: [],
      };
    },
    onLoad(options) {
      this.options = options;
      uni.setNavigationBarTitle({
        title: options.name,
      });
    },
    onShow() {
      this.queryInformationPageListApi({});
    },
    onPullDownRefresh() {
      this.dataList = [];
      this.queryInformationPageListApi({ pageNum: 0 });
    },
    onReachBottom() {
      if (hasMoreData) {
        this.queryInformationPageListApi({ pageNum: this.pageNum });
      }
    },
    methods: {
      routerInfoDetail(params) {
        this.$u.route({
          url: 'pages/infoDetail/index',
          params: params,
        });
      },
      async queryInformationPageListApi(params) {
        let { pageNum = 0, pageSize = 10, columnId = this.options.columnId } = params;

        const data = await queryInformationPageList({ pageNum, pageSize, columnId });

        if (data) {
          uni.stopPullDownRefresh();
          let dataList = data.data.dataList || [];
          if (this.pageNum == 0) {
            this.dataList = dataList;
          } else {
            this.dataList = this.dataList.concat(dataList);
          }

          if (this.dataList.length < data.totalCount) {
            hasMoreData = true;
            this.pageNum++;
          } else {
            hasMoreData = false;
          }
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .page {
    height: 100%;
    overflow: scroll;
  }
  .ul {
    margin: 24rpx;
    .li {
      padding: 24rpx;
      background: #ffffff;
      border-radius: 16rpx;
    }
    .li-t {
      margin-bottom: 24rpx;
      font-weight: 500;
      font-size: 32rpx;
      line-height: 48rpx;
      color: $u-main-color;
    }
    .li-m {
      margin-bottom: 24rpx;
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-content-color;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .li-b {
      font-size: 24rpx;
      line-height: 32rpx;
      color: $u-tips-color;
    }
  }
  .follow-wrap {
    position: fixed;
    bottom: 0;
  }
</style>
