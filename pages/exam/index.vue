<template>
  <view class="page">
    <u-tabs
      :list="certTypeList"
      :current="examCurrent"
      @change="examChange"
      inactive-color="#999"
      active-color="#333"
      font-size="40"
      height="100"
      bar-width="32"
      bar-height="8"
      gutter="24"
    ></u-tabs>
    <view class="level">
      <view
        class="level-li"
        :class="levelCurrent === index ? 'level-selected' : ''"
        v-for="(item, index) in certLevelArray"
        :key="index"
        @click="chooseLevel(index)"
        >{{ item.levelName }}</view
      >
    </view>

    <view class="exam-num-wrap">
      <view class="exam-num-item-l">
        <view class="exam-num-name">未做题</view>
        <view class="exam-num">{{ examInfo.practiceAllCount - examInfo.practiceDoCount }}</view>
      </view>
      <view class="exam-num-item-r">
        <view class="exam-num-name">错题</view>
        <view class="exam-num">{{ examInfo.practiceWrongCount }}</view>
      </view>
    </view>

    <view class="exam-card" @click="routerTest">
      <view class="card-content">
        <view class="card-content-l">
          <view class="card-content-l-t">顺序练习</view>
          <view class="card-content-l-b">答题进度</view>
        </view>
        <u-image width="48rpx" height="48rpx" :src="`${ossUrl}right-arrows_4.png`"></u-image>
      </view>
      <view class="progress-wrap">
        <u-line-progress
          :percent="(examInfo.practiceDoCount / examInfo.practiceAllCount) * 100"
          height="12"
          active-color="#fff"
          :show-percent="false"
        ></u-line-progress>
        <view class="progress">{{ examInfo.practiceDoCount }}/{{ examInfo.practiceAllCount }}</view>
      </view>
    </view>

    <view class="exam-card card-success" @click="routerMockTest">
      <view class="card-content">
        <view class="card-content-l">
          <view class="card-content-l-t">模拟考试</view>
          <view class="card-content-l-b">模拟平均分</view>
        </view>
        <u-image width="48rpx" height="48rpx" :src="`${ossUrl}right-arrows_4.png`"></u-image>
      </view>
      <view class="progress-wrap">
        <u-line-progress
          :percent="examInfo.mockExamAvgScore"
          height="12"
          active-color="#fff"
          :show-percent="false"
        ></u-line-progress>
        <view class="progress">{{ examInfo.mockExamAvgScore }}分</view>
      </view>
    </view>

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
  import {
    queryCertTypeList,
    queryInfoByCertId,
    pullRandomMockTestPater,
  } from '@/util/ajax/services';
  export default {
    data() {
      return {
        certTypeList: [], //顶部证书tab
        certLevelList: [], //证书等级tab
        certLevelArray: [], //当前选中的证书等级
        examInfo: {}, //当前选中证书等级信息
        examCurrent: 0,
        certId: '', //证书id

        levelList: [{ level: '五级' }, { level: '四级' }, { level: '三级' }],
        levelCurrent: 0,

        ossUrl: config.ossUrl,
        tabbarList: config.tabbarList,
        current: 2,
      };
    },
    onLoad() {
      this.queryCertTypeListApi();
    },
    methods: {
      examChange(index) {
        this.examCurrent = index;
        this.certLevelArray = this.certLevelList[index];
        this.certId = this.certLevelArray[0].id;
        let params = {
          id: this.certId,
        };
        this.queryInfoByCertIdApi(params);
      },
      chooseLevel(index) {
        this.levelCurrent = index;

        let params = {
          id: this.certLevelArray[index].id,
        };
        this.queryInfoByCertIdApi(params);
      },
      routerTest() {
        let params = {
          certId: this.certId,
          paperType: 1,
        };
        this.$u.route({
          url: '/pages/test/index',
          params: params,
        });
      },
      async routerMockTest() {
        let params = {
          certId: this.certId,
        };
        let res = await pullRandomMockTestPater(params);
        if (res.rescode === 200) {
          let params1 = {
            id: res.data.id,
          };
          this.$u.route({
            url: '/pages/test/mocktest/index',
            params: params1,
          });
        } else {
          this.$refs.uToast.show({
            title: res.msg,
            type: 'error',
          });
        }
      },
      async queryCertTypeListApi() {
        let res = await queryCertTypeList();

        res.data.forEach((el) => {
          this.certTypeList.push({ name: el.professionalName });
          this.certLevelList.push(el.certInfoList);
          this.certLevelArray = this.certLevelList[0];
          this.certId = this.certLevelArray[0].id;
        });
        let params = {
          id: this.certId,
        };
        this.queryInfoByCertIdApi(params);
      },
      async queryInfoByCertIdApi(params) {
        let res = await queryInfoByCertId(params);
        this.examInfo = res.data;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .level {
    display: flex;
    margin: 24rpx;
    .level-li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 218rpx;
      height: 96rpx;
      background: #fff;
      border-radius: 16rpx;
      font-size: 36rpx;
      color: $u-main-color;
      & + .level-li {
        margin-left: 24rpx;
      }
    }
    .level-selected {
      background: $u-type-primary;
      color: #fff;
    }
  }

  .exam-num-wrap {
    display: flex;
    justify-content: space-between;
    margin: 0 24rpx;
    .exam-num-item-l,
    .exam-num-item-r {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 340rpx;
      height: 200rpx;
      border-radius: 16rpx;
      font-weight: 600;
      font-size: 36rpx;
      line-height: 48rpx;
      color: #333333;
      .exam-num {
        margin-top: 32rpx;
        font-weight: bold;
        font-size: 80rpx;
        line-height: 80rpx;
      }
    }
    .exam-num-item-l {
      background: rgba(0, 82, 217, 0.05);
      .exam-num {
        color: $u-type-primary;
      }
    }
    .exam-num-item-r {
      background: rgba(227, 77, 89, 0.05);
      .exam-num {
        color: $u-type-error;
      }
    }
  }

  .exam-card {
    margin: 24rpx 24rpx 0;
    padding: 32rpx 24rpx;
    background: linear-gradient(113deg, #4787f0 1.71%, #266fe8 70.21%);
    border-radius: 16rpx;
    color: #fff;
    .card-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8rpx;
    }
    .card-content-l-t {
      margin-bottom: 32rpx;
      font-weight: 500;
      font-size: 52rpx;
      line-height: 60rpx;
    }
    .card-content-l-b {
      font-size: 36rpx;
      line-height: 48rpx;
    }
    .progress-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .u-progress {
        width: 482rpx;
        background: rgba(#fff, 0.2) !important;
        .u-active {
          background: rgba(#fff, 0.6) !important;
        }
      }
      .progress {
        flex-shrink: 0;
        font-size: 40rpx;
        line-height: 56rpx;
      }
    }
  }
  .card-success {
    background: linear-gradient(113deg, #48c79c 1.71%, #00a870 70.21%);
  }
</style>
