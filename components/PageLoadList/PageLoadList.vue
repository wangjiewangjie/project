<template>
  <view class="content_box">
    <scroll-view
      style="height: calc(100vh - 80rpx)"
      scroll-y="true"
      enable-back-to-top
      @scrolltolower="loadMore"
    >
      <view v-for="(it, idx) in dataList" :key="idx">
        <slot name="item" :model="it"></slot>
      </view>
      <u-empty :show="isEmpty" style="height: 90vh" text="暂无数据" mode="list"></u-empty>
      <u-loadmore
        v-if="dataList.length"
        height="80rpx"
        :status="loadStatus"
        icon-type="flower"
        color="#ccc"
      />
    </scroll-view>
  </view>
</template>
<script>
  /**
   * 分页加载列表
   * @property {String} reqApi - 请求接口方法
   * @property {String} reqParams - 请求接口带的参数
   */
  export default {
    props: {
      // 请求接口的方法
      reqApi: {
        type: Function,
        default: () => {},
      },
      // 请求接口带的参数
      reqParams: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        // loadmore-加载前的状态，loading-加载中的状态，nomore-没有更多的状态
        loadStatus: 'loadmore',
        // 当前页
        currentPage: 0,
        // 最后一页
        lastPage: 0,
        // 列表数据
        dataList: [],
      };
    },
    computed: {
      isEmpty: function () {
        return this.dataList.length === 0;
      },
    },
    watch: {
      reqParams() {
        this.currentPage = 0;
        this.dataList = [];
        this.getOrderList();
      },
      reqApi() {
        this.currentPage = 0;
        this.dataList = [];
        this.getOrderList();
      },
    },
    methods: {
      loadMore() {
        if (this.currentPage < this.lastPage) {
          this.currentPage += 1;
          this.getOrderList();
        }
      },
      async getOrderList() {
        this.loadStatus = 'loading';
        const res = await this.reqApi({
          ...this.reqParams,
          pageNum: this.currentPage,
        });
        if (res.rescode === 200) {
          const { dataList, totalCount, pageSize } = res.data;
          this.dataList = this.dataList.concat(dataList);
          this.lastPage = Math.ceil(totalCount / pageSize);
          this.$nextTick(() => {
            this.loadStatus = this.dataList.length < totalCount ? 'loadmore' : 'nomore';
          });
        }
      },
    },
  };
</script>
<style lang="scss"></style>
