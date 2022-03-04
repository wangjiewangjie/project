<!--
 * @Author: your name
 * @Date: 2022-03-03 16:54:55
 * @LastEditTime: 2022-03-04 11:27:53
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \credit-cert-h5\pages\query\resultList\index.vue
-->
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
  @import './index.scss';
</style>
