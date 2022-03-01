<template>
  <view class="paper-type1">
    <u-circle-progress
      active-color="#00a870"
      inactive-color="#E6F6F1"
      width="308"
      border-width="16"
      :percent="percent"
    >
      <view class="u-progress-content">
        <text class="u-progress-score">
          {{ percent }}
          <text class="u-progress-score-r">%</text>
        </text>
        <text class="u-progress-info">正确率</text>
      </view>
    </u-circle-progress>
    <view class="exam-name">{{ examResult.examName }}考试题库练习</view>
    <view class="exam-result-content">
      <view class="exam-result-li">
        <view class="exam-result-num">
          <view class="exam-result-num-l">{{ examResult.answerCount || '0' }}</view>
          <view class="exam-result-num-r">题</view>
        </view>
        <view class="exam-result-title">练习题数</view>
      </view>
      <view class="exam-result-li">
        <view class="exam-result-num">
          <view class="exam-result-num-l">{{ examTime | filterExamTime }}</view>
        </view>
        <view class="exam-result-title">本次练习时间</view>
      </view>
      <view class="exam-result-li">
        <view class="exam-result-num">
          <view class="exam-result-num-l">{{ examSpeed }}</view>
          <view class="exam-result-num-r">秒/题</view>
        </view>
        <view class="exam-result-title">答题速配</view>
      </view>
    </view>
    <button class="error-btn" @click="routerTest"
      >查看错题({{ examResult.wrongAnswerCount }}题)</button
    >
    <view class="question-count">
      <view class="question-count-l">累计答题 {{ examResult.answerCount }} 题</view>
      <view class="question-count-r"
        >剩余未做 {{ examResult.allQuestionCount - examResult.answerCount }}题</view
      >
    </view>
    <view class="exam-progress">
      <u-line-progress
        :percent="questionProgress"
        height="12"
        active-color="#0052D9"
        inactive-color="#E6EEFB"
        :show-percent="false"
      ></u-line-progress>
      <view class="exam-progress-r">{{ questionProgress }}%</view>
    </view>
  </view>
</template>

<script>
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
        return `${Math.floor(val / 1000 / 60)}′${Math.floor((val / 1000) % 60)}`;
      },
    },
    data() {
      return {
        percent: 0,
        questionProgress: 0,
        ossUrl: config.ossUrl,
      };
    },
    created() {
      this.percent = parseInt(
        (this.examResult.rightAnswerCount / this.examResult.answerCount) * 100
      );
      this.questionProgress = parseInt(
        (this.examResult.answerCount / this.examResult.allQuestionCount) * 100
      );
      this.examTime = this.examResult.endTime - this.examResult.startTime;
      this.examSpeed = parseInt(this.examTime / this.examResult.answerCount / 1000);
    },
    methods: {
      routerTest() {
        let params = {
          id: this.examResult.id,
          rightWrongType: 0,
        };
        this.$u.route({
          url: '/pages/test/index',
          params: params,
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .paper-type1 {
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
  .exam-name {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #333333;
  }

  .exam-result-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 48rpx;
    width: 100%;
    .exam-result-li {
      display: flex;
      flex-direction: column;
      align-items: center;
      .exam-result-num {
        display: flex;
        align-items: flex-end;
        .exam-result-num-l {
          font-weight: bold;
          font-size: 48rpx;
          color: #121212;
        }
        .exam-result-num-r {
          margin-left: 4rpx;
          font-size: 22rpx;
          color: #999999;
        }
      }
      .exam-result-title {
        margin-top: 12rpx;
        font-size: 22rpx;
        color: #999999;
      }
    }
  }
  .error-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px 0 36px;
    width: 124px;
    height: 34px;
    background: rgba(227, 77, 89, 0.1);
    border-radius: 30px;
    font-size: 14px;
    color: #e34d59;
  }

  .question-count {
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
    width: 100%;
    font-size: 13px;
    line-height: 18px;
    .question-count-l {
      color: #333333;
    }
    .question-count-r {
      color: #999999;
    }
  }

  .exam-progress {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    width: 100%;
    font-size: 14px;
    line-height: 18px;
    color: #0052d9;
    .u-progress {
      width: 295px;
    }
  }
</style>
