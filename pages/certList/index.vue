<template>
  <view class="page">
    <view class="cert-card" v-for="item in dataList" :key="item.id" @click="apply(item)">
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
          <view class="card-ft-li-r">{{ item.examineMonth | filterDay }}</view>
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
      this.queryCertificatePageListApi({
        pageNum: 0,
      });
    },
    onReachBottom() {
      if (hasMoreData) {
        this.queryCertificatePageListApi({
          pageNum: this.pageNum,
        });
      }
    },
    methods: {
      apply(item) {
        let params = {
          certId: item.id,
        };
        this.$u.route({
          url: 'pages/apply/index',
          params: params,
        });
      },
      async queryCertificatePageListApi(params) {
        let { pageNum = 0, pageSize = 10 } = params;

        const data = await queryCertificatePageList({
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
