<template>
  <view class="page">
    <view class="result-header">
      <view class="result-li">
        <u-image width="32rpx" height="32rpx" :src="`${ossUrl}result_user.png`"></u-image>
        <view class="result-li-r">{{ examineStudentObj.name }}</view>
      </view>
      <view class="result-li">
        <u-image width="32rpx" height="32rpx" :src="`${ossUrl}result_idcard.png`"></u-image>
        <view class="result-li-r">{{ examineStudentObj.idcard }}</view>
      </view>
    </view>
    <view
      class="query-list"
      v-for="(item, index) in examineStudentObj.examineStudentVOList"
      :key="index"
    >
      <view class="query-list-header"
        >共有{{ examineStudentObj.examineStudentVOList.length }}个考试成绩</view
      >
      <view class="query-list-li">
        <view class="li-t">
          <view class="li-t-l">{{ item.professionalName }}</view>
          <view class="li-t-r" v-if="item.certificateStatus === 1">制作中</view>
        </view>
        <view class="li-m">技能等级：{{ item.levelName }}</view>
        <view class="li-m">考试时间：{{ item.applyExamineDate | filterDay }}</view>
        <view class="li-b">
          <view class="score" :class="item.theoryScore >= 60 ? 'exam-success' : 'exam-error'">
            <view class="score-l">笔试成绩</view>
            <view class="score-r">
              {{ item.theoryScore || 0 }}
              <text class="score-r-text">分</text>
            </view>
          </view>
          <view class="score" :class="item.fieldScore >= 60 ? 'exam-success' : 'exam-error'">
            <view class="score-l">实操成绩</view>
            <view class="score-r">
              {{ item.fieldScore || 0 }}
              <text class="score-r-text">分</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import config from '@/config/config';
  import dayjs from 'dayjs';
  import { queryExaminestudentScore } from '@/util/ajax/services';
  export default {
    filters: {
      filterDay(val) {
        return dayjs(Number(val)).format('YYYY/MM/DD HH:mm:ss');
      },
    },
    data() {
      return {
        ossUrl: config.ossUrl,
        score: 60,
        examineStudentObj: {
          examineStudentVOList: [],
        },
      };
    },
    onLoad(options) {
      this.queryExaminestudentScoreApi(options);
    },
    methods: {
      async queryExaminestudentScoreApi(params) {
        let res = await queryExaminestudentScore(params);
        if (res.rescode === 200) {
          this.examineStudentObj = res.data;
        } else {
          this.$refs.uToast.show({
            title: res.msg,
            type: 'error',
          });
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  $margin: 24rpx 24rpx 0;
  $borderRadius: 16rpx;
  .page {
    height: 100%;
  }
  .result-header {
    margin: $margin;
    padding: 24rpx;
    border-radius: $borderRadius;
    background: #fff;
    .result-li {
      display: flex;
      align-items: center;
      .result-li-r {
        margin-left: 16rpx;
        font-weight: 600;
        font-size: 36rpx;
        line-height: 48rpx;
        color: $u-main-color;
      }
      & + .result-li {
        margin-top: 8rpx;
      }
    }
  }

  .query-list {
    margin: $margin;
    .query-list-header {
      font-size: 28rpx;
      line-height: 36rpx;
      color: $u-tips-color;
    }
  }

  .query-list-li {
    margin-top: 24rpx;
    padding: 24rpx;
    border-radius: $borderRadius;
    background: #fff;
    .li-t {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8rpx;
      .li-t-l {
        font-weight: 500;
        font-size: 32rpx;
        line-height: 40rpx;
        color: $u-main-color;
      }
      .li-t-r {
        padding: 0 8rpx;
        background: rgba(255, 180, 51, 0.1);
        border: 1rpx solid #ffb433;
        border-radius: 4rpx;
        font-size: 22rpx;
        color: #ffb433;
      }
    }
    .li-m {
      margin-bottom: 8rpx;
      font-size: 24rpx;
      line-height: 32rpx;
      color: $u-content-color;
    }
    .li-b {
      display: flex;
      justify-content: space-between;
    }
    .score {
      display: flex;
      justify-content: space-between;
      padding: 16rpx 24rpx;
      width: 320rpx;
      border-radius: 8rpx;
      .score-l {
        font-size: 24rpx;
        line-height: 36rpx;
        color: #365148;
      }
      .score-r {
        font-size: 36rpx;
        line-height: 36rpx;
      }
      .score-r-text {
        margin-right: 4rpx;
        font-size: 24rpx;
        line-height: 36rpx;
      }
    }
    .exam-success {
      background: rgba(0, 168, 112, 0.1);
      .score-r {
        color: $u-type-success;
      }
    }
    .exam-error {
      background: rgba(227, 77, 89, 0.1);
      .score-r {
        color: $u-type-error;
      }
    }
  }
</style>
