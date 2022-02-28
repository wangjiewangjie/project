<template>
  <view class="paper-type2">
    <u-circle-progress
      active-color="#00a870"
      inactive-color="#E6F6F1"
      width="308"
      border-width="16"
      :percent="percent"
    >
      <view class="u-progress-content">
        <text class="u-progress-score">
          {{ examResult.studentScore || '0' }}
          <text class="u-progress-score-r">分</text>
        </text>
        <text class="u-progress-info">用时{{ examTime | filterExamTime }}</text>
      </view>
    </u-circle-progress>
    <view class="exam-endtime">{{ examResult.examName }}考试 {{ endTime }}</view>
    <view class="ul">
      <view class="li">
        <view class="li-t">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}exam-finish_1.png`"></u-image>
        </view>
        <view class="li-b">炫成绩</view>
      </view>
      <view class="li" @click="routerTest('1')">
        <view class="li-t">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}exam-finish_2.png`"></u-image>
        </view>
        <view class="li-b">查试卷</view>
      </view>
      <view class="li" @click="routerTest('0')">
        <view class="li-t">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}exam-finish_3.png`"></u-image>
        </view>
        <view class="li-b">看错题</view>
      </view>
      <view class="li" @click="routerExam">
        <view class="li-t">
          <u-image width="48rpx" height="48rpx" :src="`${ossUrl}exam-finish_4.png`"></u-image>
        </view>
        <view class="li-b">重新考</view>
      </view>
    </view>
  </view>
</template>

<script>
  import dayjs from 'dayjs';
  import config from '@/config/config';
  export default {
    props: {
      examResult: {
        type: Object,
        default: () => {},
      },
    },
    filters: {
      filterExamTime(val) {
        return `${Math.floor(val / 1000 / 60)}′${Math.floor(val / 1000) % 60}`;
      },
    },
    data() {
      return {
        examTime: '',
        endTime: '',
        ossUrl: config.ossUrl,
      };
    },
    created() {
      this.percent = parseInt((this.examResult.studentScore / this.examResult.totalScore) * 100);

      this.examTime = this.examResult.endTime - this.examResult.startTime;
      this.endTime = dayjs(Number(this.examResult.endTime)).format('YYYY/MM/DD HH:mm:ss');
    },
    methods: {
      routerTest(value) {
        let params = {
          id: this.examResult.id,
          rightWrongType: value,
        };
        this.$u.route({
          url: '/pages/test/index',
          params: params,
        });
      },
      routerExam() {
        this.$u.route({
          url: '/pages/exam/index',
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .paper-type2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .u-circle-progress {
    margin: 24px 0;
  }
  .u-progress-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #333333;

    .u-progress-score {
      font-size: 60px;
    }
    .u-progress-score-r {
      font-size: 14px;
    }
    .u-progress-info {
      font-size: 14px;
      line-height: 18px;
    }
  }
  .exam-endtime {
    font-size: 16px;
    line-height: 20px;
    color: #666666;
  }
  .ul {
    display: flex;
    justify-content: space-between;
    margin-top: 36px;
    padding: 0 20px;
    width: 100%;
    .li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 12px;
    }
    .li-b {
      margin-top: 6px;
      font-size: 14px;
      line-height: 18px;
      color: #666666;
    }
  }
</style>
