<template>
  <view class="page">
    <view class="swiper-wrap">
      <u-swiper
        height="226"
        :indicatorStyle="indicatorStyle"
        :list="AdvertisingList"
        name="picUrl"
      ></u-swiper>
    </view>

    <view class="menu-wrap">
      <view class="menu-item" v-for="(item, index) in menuList" :key="index" @click="routerInfo">
        <u-image width="96rpx" height="96rpx" :src="`${ossUrl}${item.icon}`"></u-image>
        <view class="menu-name">{{ item.name }}</view>
      </view>
    </view>

    <view class="notice-wrap">
      <view class="notice-wrap-top">
        <u-image width="32rpx" height="32rpx" :src="`${ossUrl}index-notice.png`"></u-image>
        <u-notice-bar
          bg-color="#fff"
          type="primary"
          mode="vertical"
          :volume-icon="false"
          :list="noticeList"
        ></u-notice-bar>
      </view>
      <view class="notice-wrap-bottom" v-for="(item, index) in examineschedule" :key="index">
        <text>{{ item.title }}&nbsp;&nbsp;{{ item.applyStopTime }}报名截止</text>
        <u-button class="notice-btn" type="primary" shape="circle" @click="apply(item)"
          >立即报名</u-button
        >
      </view>
    </view>

    <view class="exam-wrap">
      <view class="exam-wrap-title">
        <view class="exam-title">相关认定项目</view>
        <view class="more-btn">
          更多
          <u-image width="24rpx" height="24rpx" :src="`${ossUrl}right-arrows.png`"></u-image>
        </view>
      </view>
      <u-tabs
        :list="certTypeList"
        :current="examCurrent"
        @change="examChange"
        name="professionalName"
        inactive-color="#999"
        active-color="#0052D9"
        font-size="28"
        height="48"
        bar-width="20"
        bar-height="4"
        gutter="24"
      ></u-tabs>
      <view class="exam-card">
        <view class="exam-card-header">
          <view class="exam-course">{{ certificateList.professionalName }}</view>
          <view class="exam-price">{{ certificateList.supervisorCost }}元</view>
        </view>
        <view class="exam-num">10000人关注中</view>
        <view class="exam-des">{{ certificateList.supervisorIntro }}</view>
        <u-button @click="apply('')" class="exam-btn" type="primary" shape="circle"
          >立即报考</u-button
        >
      </view>
    </view>

    <view class="school-wrap" v-if="distanceList.length">
      <view class="school-wrap-title">
        <view class="school-title">推荐培训学校</view>
        <view class="more-btn">
          更多
          <u-image width="24rpx" height="24rpx" :src="`${ossUrl}right-arrows.png`"></u-image>
        </view>
      </view>
      <block v-for="(item, index) in distanceList" :key="index">
        <SchoolCard :schoolItem="item"></SchoolCard>
      </block>
    </view>

    <PageFooter></PageFooter>

    <u-tabbar
      v-model="current"
      :list="tabbarList"
      :icon-size="54"
      active-color="#0052d9"
      inactive-color="#666"
    ></u-tabbar>
  </view>
</template>

<script>
  import config from '@/config/config';
  import commonInfo from '@/util/commonInfo';
  import SchoolCard from '@/components/SchoolCard/SchoolCard';
  import PageFooter from '@/components/PageFooter/PageFooter';
  import {
    queryExamIneScheduleList,
    queryDistancePageList,
    queryCertificateList,
    queryCertTypeList,
    queryAdvertisingList,
    // columnContactUs,
    // queryColumn,
    // queryColumnNode,
  } from '@/util/ajax/services';
  export default {
    component: {
      SchoolCard,
      PageFooter,
    },
    data() {
      return {
        userInfo: {},
        ossUrl: config.ossUrl,

        indicatorStyle: {
          indicatorStyle: 'dot',
        },

        examineschedule: [],
        distanceList: [],
        certificateList: {},
        AdvertisingList: [],

        menuList: [
          {
            icon: 'index-menu_1.png',
            name: '考试流程',
            path: '',
          },
          {
            icon: 'index-menu_2.png',
            name: '重要通知',
            path: '',
          },
          {
            icon: 'index-menu_3.png',
            name: '相关政策',
            path: '',
          },
          {
            icon: 'index-menu_4.png',
            name: '关于我们',
            path: '',
          },
        ],

        noticeList: [
          '赵**已报名  保育员师级/二级',
          '钱**已报名  保育员师级/二级',
          '孙**已报名  保育员师级/二级',
          '李*已报名  保育员师级/二级',
        ],

        certTypeList: [],
        examCurrent: 0,

        tabbarList: config.tabbarList,
        current: 1,
      };
    },
    methods: {
      examChange(index) {
        this.examCurrent = index;

        let params = { id: this.certTypeList[index].id };

        this.queryExamIneScheduleListApi(params);
      },
      apply(item) {
        let params = item ? item : this.examineschedule[0];
        this.$u.route({
          url: 'pages/apply/index',
          params: params,
        });
      },
      routerInfo() {
        this.$u.route({
          url: 'pages/info/index',
        });
      },
      async queryExamIneScheduleListApi(params) {
        let res = await queryExamIneScheduleList(params);
        this.examineschedule = res.data;
      },
      queryDistancePageListApi() {
        uni.getLocation({
          type: 'gcj02',
          success: async (res) => {
            let params = {
              longitude: res.longitude,
              latitude: res.latitude,
            };
            let result = await queryDistancePageList(params);
            this.distanceList = result.data;
          },
        });
      },

      async queryCertTypeListApi() {
        let res = await queryCertTypeList();

        res.data.forEach((el) => {
          this.certTypeList.push(el.certInfoList);
        });
        this.certTypeList = this.certTypeList.flat();
        let params = { id: this.certTypeList[0].id };
        this.queryCertificateListApi(params);
        this.queryExamIneScheduleListApi(params);
      },
      async queryCertificateListApi(params) {
        let res = await queryCertificateList(params);
        this.certificateList = res.data;
      },
      async queryAdvertisingListApi() {
        let res = await queryAdvertisingList();
        this.AdvertisingList = res.data.dataList;
      },
      // async columnContactUsApi() {
      //   let res = await columnContactUs();
      // },
      // async queryColumn() {
      //   let res = await queryColumn();
      // },
      // async queryColumnNode() {
      //   let res = await queryColumnNode();
      // },
    },
    onLoad() {
      this.userInfo = commonInfo.getUser();
      this.queryExamIneScheduleListApi();
      this.queryDistancePageListApi();
      this.queryCertTypeListApi();
      this.queryAdvertisingListApi();
      // this.columnContactUsApi();
      // this.queryColumn();
      // this.queryColumnNode();
    },
  };
</script>

<style lang="scss" scoped>
  $margin: 24rpx 24rpx 0rpx;
  $background: #fff;
  $borderRadius: 16rpx;

  .swiper-wrap {
    margin: $margin;
  }

  .menu-wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: $margin;
    padding: 24rpx 0;
    background: $background;
    border-radius: $borderRadius;
    font-weight: 500;
    font-size: 24rpx;
    line-height: 32rpx;
    color: $u-content-color;
    .menu-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .menu-name {
        margin-top: 16rpx;
      }
    }
  }

  .notice-wrap {
    margin: $margin;
    background: $background;
    border-radius: $borderRadius;
    overflow: hidden;
    .notice-wrap-top {
      display: flex;
      align-items: center;
      padding: 16rpx 24rpx;
      border-bottom: 1rpx solid $u-border-color;
      .u-notice-bar-wrap {
        flex: 1;
      }
    }
    .notice-wrap-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 24rpx;
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-main-color;
      .notice-btn {
        margin: 0;
        width: 160rpx;
        height: 64rpx;
      }
    }
  }

  .exam-wrap,
  .school-wrap {
    margin: $margin;
    background: $background;
    border-radius: $borderRadius;
    overflow: hidden;

    .u-tabs {
      margin: 24rpx 0 16rpx;
    }
  }

  .exam-wrap-title,
  .school-wrap-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx;
    font-weight: 600;
    font-size: 36rpx;
    line-height: 48rpx;
    color: $u-main-color;
  }

  .more-btn {
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: 24rpx;
    line-height: 32rpx;
    color: $u-tips-color;
  }

  .exam-card {
    margin: 0 24rpx 24rpx;
    padding: 28rpx 24rpx 24rpx;
    background: linear-gradient(180deg, #ecf2fe 0%, rgba(236, 242, 254, 0) 100%);
    border-radius: 16rpx;
    .exam-card-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4rpx;
      .exam-course {
        font-weight: 500;
        font-size: 32rpx;
        line-height: 40rpx;
        color: $u-main-color;
      }
      .exam-price {
        font-weight: 500;
        font-size: 36rpx;
        line-height: 48rpx;
        text-align: right;
        color: $u-type-primary;
      }
    }
    .exam-num {
      margin-bottom: 24rpx;
      font-size: 24rpx;
      line-height: 32rpx;
      color: $u-tips-color;
    }
    .exam-des {
      margin-bottom: 48rpx;
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-content-color;
    }
  }
</style>
