<template>
  <view class="page">
    <view class="search">
      <view class="input">
        <u-image width="48rpx" height="48rpx" :src="`${ossUrl}search.png`"></u-image>
        <u-input
          v-model="nameLike"
          placeholder="请输入单位名称或姓名"
          :placeholder-style="placeholderStyle"
          @input="$u.debounce(onSearch, 500)"
        />
      </view>
      <view class="cancel-btn" @click="onCancelSearch">取消</view>
    </view>
    <block v-for="(item, index) in dataList" :key="index">
      <SchoolCard :schoolItem="item"></SchoolCard>
    </block>
  </view>
</template>

<script>
  import config from '@/config/config';
  import { queryDistancePageList } from '@/util/ajax/services';
  let hasMoreData = true;
  export default {
    data() {
      return {
        pageNum: 0,
        dataList: [],
        ossUrl: config.ossUrl,
        nameLike: '',
        placeholderStyle: 'fontSize: 28rpx;color: #999999;',
      };
    },
    onShow() {
      this.queryDistancePageListApi({ pageNum: 0 });
    },
    onPullDownRefresh() {
      this.dataList = [];
      this.queryDistancePageListApi({ pageNum: 0 });
    },
    onReachBottom() {
      if (hasMoreData) {
        this.queryDistancePageListApi({ pageNum: this.pageNum });
      }
    },
    methods: {
      onSearch() {
        this.queryDistancePageListApi({ pageNum: 0 });
      },
      onCancelSearch() {
        this.nameLike = '';
      },
      async queryDistancePageListApi(value) {
        let data;
        uni.getLocation({
          type: 'gcj02',
          success: async (res) => {
            let params = {
              longitude: res.longitude,
              latitude: res.latitude,
              pageSize: 10,
              nameLike: this.nameLike,
              ...value,
            };
            data = await queryDistancePageList(params);
          },
        });

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

  .search {
    display: flex;
    align-items: center;
    padding: 8px 0;
    background: #fff;
    .input {
      flex: 1;
      display: flex;
      align-items: center;
      margin-left: 12px;
      padding: 4px 8px;
      height: 64rpx;
      box-sizing: border-box;
      background: #f5f5f5;
      border-radius: 16px;
      .u-image {
        margin-right: 4px;
      }
    }
    .cancel-btn {
      padding: 6px 12px;
      font-size: 15px;
      line-height: 20px;
      color: #333333;
    }
  }
</style>
