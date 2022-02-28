<template>
  <view class="page">
    <view class="order-wrap" v-for="item in dataList" :key="item.orderNo">
      <view class="order-header">
        <view class="order-header-l">报名编号：{{ item.orderNo }}</view>
        <view class="order-header-r">待支付</view>
      </view>
      <view class="order-content-wrap">
        <u-image width="216rpx" height="144rpx" src="/static/images/school.png"></u-image>
        <view class="order-content">
          <view class="order-content-t">{{ item.professionalName }}/{{ item.levelName }}</view>
          <view class="order-content-m">报名时间：{{ item.addTime | filterDay }}</view>
          <view class="order-content-b">
            <text class="order-content-b-l">实付金额：</text>
            <text class="order-content-b-r">¥{{ item.supervisorCost | calcPrice }}</text>
          </view>
        </view>
      </view>
      <view class="order-btn">
        <u-button class="pay" plain type="info" shape="circle" @click="submit">取消订单</u-button>
        <u-button
          class="pay"
          plain
          type="primary"
          shape="circle"
          @click="routerOrderDetail(item.id)"
          >查看详情</u-button
        >
        <u-button class="pay" plain type="primary" shape="circle" @click="submit"
          >立即支付</u-button
        >
      </view>
    </view>
  </view>
</template>

<script>
  import { queryCertificatereservationPageList } from '@/util/ajax/services';
  import commonInfo from '@/util/commonInfo';
  import dayjs from 'dayjs';
  let hasMoreData = true;
  export default {
    filters: {
      filterDay(val) {
        return dayjs(Number(val)).format('YYYY年MM月DD日');
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
      this.queryCertificatereservationPageListApi({});
    },
    onPullDownRefresh() {
      this.dataList = [];
      this.queryCertificatereservationPageListApi({ pageNum: 0 });
    },
    onReachBottom() {
      if (hasMoreData) {
        this.queryCertificatereservationPageListApi({ pageNum: this.pageNum });
      }
    },
    methods: {
      routerOrderDetail(id) {
        this.$u.route({
          url: 'pages/order/orderDetail/orderDetail',
          params: {
            id: id,
          },
        });
      },

      async queryCertificatereservationPageListApi(params) {
        let { pageNum = 0, pageSize = 10 } = params;

        const data = await queryCertificatereservationPageList({ pageNum, pageSize });

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
  .order-wrap {
    margin: 24rpx 24rpx 0;
    border-radius: 16rpx;
    background: #fff;
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx;
      border-bottom: 1rpx solid $u-form-item-border-color;
      font-size: 24rpx;
      line-height: 32rpx;
      .order-header-l {
        color: $u-content-color;
      }
      .order-header-r {
        color: $u-type-error;
      }
    }
    .order-content-wrap {
      display: flex;
      padding: 24rpx;
      .u-image {
        border-radius: 8rpx;
      }
    }
    .order-content {
      margin-left: 24rpx;
      .order-content-t {
        margin-bottom: 8rpx;
        font-weight: 500;
        font-size: 32rpx;
        line-height: 44rpx;
        color: $u-main-color;
      }
      .order-content-m {
        margin-bottom: 8rpx;
        font-size: 24rpx;
        line-height: 32rpx;
        color: $u-content-color;
      }
      .order-content-b {
        line-height: 36rpx;
        color: $u-main-color;
      }
      .order-content-b-l {
        font-weight: 500;
        font-size: 24rpx;
      }
      .order-content-b-r {
        font-size: 28rpx;
      }
    }
  }

  .order-btn {
    display: flex;
    justify-content: flex-end;
    padding: 0 24rpx 24rpx;
    .u-btn {
      margin: 0;
      width: 160rpx;
      height: 64rpx;
      font-size: 24rpx;
      & + .u-btn {
        margin-left: 24rpx;
      }
    }
    .u-btn--info--plain {
      color: $u-tips-color !important;
      border-color: $u-tips-color !important;
    }
    .u-btn--info--plain,
    .u-btn--primary--plain {
      background: #fff !important;
    }
  }
</style>
