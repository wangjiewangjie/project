<!--
 * @Author: your name
 * @Date: 2022-03-04 16:45:13
 * @LastEditTime: 2022-03-04 17:11:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \credit-cert-h5\pages\test\components\questionStatWrap.vue
-->
<template>
  <view class="question-stat-wrap">
    <view class="question-stat">
      <view class="right-stat">
        <u-image width="52rpx" height="52rpx" :src="`${ossUrl}exam-answer_success.png`"></u-image>
        {{ examinePaperObj.rightAnswerCount }}
      </view>
      <view class="error-stat">
        <u-image width="52rpx" height="52rpx" :src="`${ossUrl}exam-answer_error.png`"></u-image>
        {{ examinePaperObj.wrongAnswerCount }}
      </view>
      <view class="total-stat">
        <u-image width="52rpx" height="52rpx" :src="`${ossUrl}exam-num.png`"></u-image>
        {{ examinePaperObj.answerCount }}/{{ examinePaperObj.allQuestionCount }}
      </view>
    </view>
    <view v-if="options.paperType == 2" class="paper-btn" @click="onSubmitExamResult">
      <u-image width="40rpx" height="40rpx" :src="`${ossUrl}exam-submit.png`"></u-image>交卷
    </view>
  </view>
</template>

<script>
  import config from '@/config/config';
  export default {
    props: {
      examinePaperObj: {
        type: Object,
        default: () => {},
      },
      options: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        ossUrl: config.ossUrl,
      };
    },
    methods: {
      onSubmitExamResult() {
        this.$emit('onSubmitExamResult');
      },
    },
  };
</script>
