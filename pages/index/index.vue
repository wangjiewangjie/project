<template>
  <view class="page">
    <view class="swiper-wrap">
      <u-swiper
        height="226"
        :indicatorStyle="indicatorStyle"
        :list="AdvertisingList"
        :border-radius="16"
        mode="dot"
        name="picUrl"
      ></u-swiper>
    </view>

    <view class="menu-wrap">
      <view
        class="menu-item"
        v-for="(item, index) in menuList"
        :key="index"
        @click="routerInfo(item)"
      >
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
        >
        </u-notice-bar>
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
        <view class="more-btn" @click="routerCert">
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
      <swiper class="swiper">
        <swiper-item v-for="(item, index) in certInfoList" :key="index">
          <view class="exam-card">
            <view class="exam-card-header">
              <view class="exam-course">{{ item.professionalName }}</view>
              <view class="exam-price">{{ item.supervisorCost || 0 }}元</view>
            </view>
            <view class="exam-num">10000人关注中</view>
            <view class="exam-des">{{ item.supervisorIntro }}</view>
            <u-button @click="apply('')" class="exam-btn" type="primary" shape="circle"
              >立即报考</u-button
            >
          </view>
        </swiper-item>
      </swiper>
    </view>

    <view class="school-wrap" v-if="schoolList.length">
      <view class="school-wrap-title">
        <view class="school-title">推荐培训学校</view>
        <view class="more-btn" @click="routerSchool">
          更多
          <u-image width="24rpx" height="24rpx" :src="`${ossUrl}right-arrows.png`"></u-image>
        </view>
      </view>
      <block v-for="(item, index) in schoolList" :key="index">
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
    >
    </u-tabbar>
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
    queryCertTypeList,
    queryAdvertisingList,
    queryConfiguration,
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
        schoolList: [],
        certificateList: {},
        AdvertisingList: [],
        certInfoList: [],

        menuList: [
          {
            icon: 'index-menu_1.png',
            name: '考试流程',
            columnId: '',
          },
          {
            icon: 'index-menu_2.png',
            name: '重要通知',
            columnId: '',
          },
          {
            icon: 'index-menu_3.png',
            name: '相关政策',
            columnId: '',
          },
          {
            icon: 'index-menu_4.png',
            name: '关于我们',
            columnId: '',
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

        this.certInfoList = this.certTypeList[index].certInfoList;
      },
      apply(item) {
        let params = item ? item : this.examineschedule[0];
        this.$u.route({
          url: 'pages/apply/index',
          params: params,
        });
      },
      routerInfo(item) {
        this.$u.route({
          url: 'pages/info/index',
          params: {
            columnId: item.columnId,
            name: item.name,
          },
        });
      },
      routerCert() {
        this.$u.route({
          url: 'pages/certList/index',
        });
      },
      routerSchool() {
        this.$u.route({
          url: 'pages/schoolList/index',
        });
      },
      async queryExamIneScheduleListApi(params) {
        let res = await queryExamIneScheduleList(params);
        this.examineschedule = res.data;
      },
      async queryDistancePageListApi() {
        let params = {
          ...commonInfo.getLocaiton(),
          recommendState: 1,
        };
        let result = await queryDistancePageList(params);
        this.schoolList = result.data.dataList;
      },

      async queryCertTypeListApi() {
        let res = await queryCertTypeList();
        this.certTypeList = res.data;
        this.examCurrent = 0;
        this.certInfoList = this.certTypeList[0].certInfoList;
      },
      async queryAdvertisingListApi() {
        let res = await queryAdvertisingList();
        this.AdvertisingList = res.data.dataList;
      },

      async queryConfigurationApi() {
        let res = await queryConfiguration();
        res.data.forEach((e) => {
          this.menuList.forEach((v) => {
            if (e.name === v.name) {
              v.columnId = e.columnId;
            }
          });
        });
      },
    },
    onShow() {
      this.userInfo = commonInfo.getUser();
      this.queryExamIneScheduleListApi();
      this.queryDistancePageListApi();
      this.queryCertTypeListApi();
      this.queryAdvertisingListApi();
      this.queryConfigurationApi();
    },
  };
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
