<template>
  <view class="page">
    <view class="order-wrap" v-for="item in dataList" :key="item.orderNo">
      <view class="order-header">
        <view class="order-header-l">报名编号：{{ item.orderNo }}</view>
        <view class="order-header-r">{{ item.state ? '支付成功' : '待支付' }}</view>
      </view>
      <view class="order-content-wrap">
        <u-image width="216rpx" height="144rpx" src="/static/images/cert.png"></u-image>
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
        <u-button class="pay" plain type="info" shape="circle" @click="onShowDelete(item.id)"
          >取消订单</u-button
        >
        <u-button
          class="pay"
          plain
          type="primary"
          shape="circle"
          @click="routerOrderDetail(item.id)"
          >查看详情
        </u-button>
        <u-button
          v-show="item.state == 0"
          class="pay"
          plain
          type="primary"
          shape="circle"
          @click="routerApply3(item.id)"
          >立即支付</u-button
        >
      </view>
    </view>
    <u-modal
      v-model="showDelete"
      content="确定删除订单?"
      :show-cancel-button="true"
      @confirm="onConfirmDelete"
    ></u-modal>

    <u-toast ref="uToast" />
  </view>
</template>

<script>
  import { queryCertificatereservationPageList, deleteCert } from '@/util/ajax/services';
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
        showDelete: false,
        itemId: '',
      };
    },
    onShow() {
      this.queryCertificatereservationPageListApi({});
    },
    onPullDownRefresh() {
      this.dataList = [];
      this.queryCertificatereservationPageListApi({
        pageNum: 0,
      });
    },
    onReachBottom() {
      if (hasMoreData) {
        this.queryCertificatereservationPageListApi({
          pageNum: this.pageNum,
        });
      }
    },
    methods: {
      onShowDelete(id) {
        this.showDelete = true;
        this.itemId = id;
      },
      async onConfirmDelete() {
        let params = {
          id: this.itemId,
        };
        let res = await deleteCert(params);
        if (res.rescode === 200) {
          this.$refs.uToast.show({
            title: '删除订单成功',
            type: 'success',
          });
          this.queryCertificatereservationPageListApi({});
        } else {
          this.$refs.uToast.show({
            title: res.msg,
            type: 'error',
          });
        }
      },
      routerOrderDetail(id) {
        this.$u.route({
          url: 'pages/order/orderDetail/orderDetail',
          params: {
            id: id,
          },
        });
      },
      routerApply3(id) {
        this.$u.route({
          url: '/pages/apply/apply_3',
          params: {
            id: id,
          },
        });
      },

      async queryCertificatereservationPageListApi(params) {
        let { pageNum = 0, pageSize = 10 } = params;

        const data = await queryCertificatereservationPageList({
          pageNum,
          pageSize,
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
  @import './index.scss';
</style>
