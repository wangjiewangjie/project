<!--
 * @Author: your name
 * @Date: 2022-03-03 15:40:12
 * @LastEditTime: 2022-03-03 15:49:07
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \credit-cert-h5\pages\test\components\examResultPopup.vue
-->
<template>
  <view class="exam-result-wrap">
    <view
      class="title"
      :class="
        examinePaperObj.passScore > examinePaperObj.studentScore ||
        examinePaperObj.studentScore === 0
          ? ''
          : 'exam-pass'
      "
    >
      {{
        examinePaperObj.passScore > examinePaperObj.studentScore ||
        examinePaperObj.studentScore === 0
          ? '成绩不合格'
          : '成绩合格'
      }}
    </view>
    <u-image width="340rpx" height="282rpx" :src="`${ossUrl}exam-default.png`"></u-image>
    <view class="exam-result-content">
      <view class="exam-result-li">
        <view class="exam-result-num">
          <view class="exam-result-num-l">{{ examinePaperObj.unAnswerCount || '0' }}</view>
          <view class="exam-result-num-r">题</view>
        </view>
        <view class="exam-result-title">未答题数</view>
      </view>
      <view class="exam-result-li">
        <view class="exam-result-num">
          <view class="exam-result-num-l">{{ examinePaperObj.wrongAnswerCount || '0' }}</view>
          <view class="exam-result-num-r">题</view>
        </view>
        <view class="exam-result-title">答错题数</view>
      </view>
      <view class="exam-result-li">
        <view class="exam-result-num">
          <view class="exam-result-num-l">{{ examinePaperObj.studentScore || '0' }}</view>
          <view class="exam-result-num-r">分</view>
        </view>
        <view class="exam-result-title">考试得分</view>
      </view>
    </view>
    <view class="btn-wrap">
      <u-button plain type="primary" shape="circle" @click="onSubmitPaper(false)"
        >继续考试</u-button
      >
      <u-button type="primary" shape="circle" @click="onSubmitPaper(true)">现在交卷</u-button>
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
    },
    data() {
      return {
        ossUrl: config.ossUrl,
      };
    },
    methods: {
      onSubmitPaper(e) {
        this.$emit('onSubmitPaper', e);
      },
    },
  };
</script>
