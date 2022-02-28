<template>
  <view class="page">
    <view class="cert-card" v-for="item in dataList" :key="item.id">
      <view class="card-hd">
        <u-image
          width="240rpx"
          height="160rpx"
          border-radius="8"
          :src="item.imgUrl ? item.imgUrl : '/static/images/cert.png'"
        ></u-image>
        <view class="card-hd-r">
          <view class="card-hd-r-t"
            >{{ item.professionalName }}/{{ item.levelName }} 职业培训证书</view
          >
          <view class="card-hd-r-b">¥{{ item.supervisorCost | calcPrice }}</view>
        </view>
      </view>
      <view class="card-ft">
        <view class="card-ft-li">
          <view class="card-ft-li-l">考试时间：</view>
          <view class="card-ft-li-r">{{ item.examineTime | filterDay }}</view>
        </view>
        <view class="card-ft-li">
          <view class="card-ft-li-l">考试地点：</view>
          <view class="card-ft-li-r">{{ item.examineRoomName || '-' }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { queryCertificatePageList } from '@/util/ajax/services';
  import commonInfo from '@/util/commonInfo';
  import dayjs from 'dayjs';
  let hasMoreData = true;

  export default {
    filters: {
      filterDay(val) {
        return val ? dayjs(Number(val)).format('YYYY年MM月DD日') : '-';
      },
      calcPrice(val) {
        return commonInfo.calcPrice(val);
      },
    },
    data() {
      return {
        pageNum: 0,
        dataList: [],
      };
    },
    onShow() {
      this.queryCertificatePageListApi({});
    },
    onPullDownRefresh() {
      this.dataList = [];
      this.queryCertificatePageListApi({ pageNum: 0 });
    },
    onReachBottom() {
      if (hasMoreData) {
        this.queryCertificatePageListApi({ pageNum: this.pageNum });
      }
    },
    methods: {
      async queryCertificatePageListApi(params) {
        let { pageNum = 0, pageSize = 10 } = params;

        const data = await queryCertificatePageList({ pageNum, pageSize });

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

  .cert-card {
    margin: 12px 12px 0;
    border-radius: 8px;
    background: #fff;
    &:last-child {
      margin-bottom: 12px;
    }
    .card-hd,
    .card-ft {
      padding: 12px;
    }
    .card-hd {
      display: flex;
      border-bottom: 0.5px solid #eaeaea;
      .card-hd-r {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        margin-left: 12px;
      }
      .card-hd-r-t {
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #333333;
      }
      .card-hd-r-b {
        font-size: 16px;
        line-height: 24px;
        color: #e34d59;
      }
    }
    .card-ft-li {
      display: flex;
      font-size: 14px;
      line-height: 18px;
      color: #666666;
      & + .card-ft-li {
        margin-top: 8px;
      }
    }
  }
</style>
