<template>
  <view class="page">
    <u-navbar :title="`${mockTest.certName}/${mockTest.certLevelName}`"></u-navbar>
    <view class="mocktest">
      <view class="mocktest-t">
        <u-image width="64rpx" height="64rpx" :src="`${ossUrl}exam-header.png`"></u-image>
        <view class="student-phone" v-if="userInfo.phone">{{ userInfo.phone | filterPhone }}</view>
      </view>
      <view class="li">
        <view class="li-l">考试科目</view>
        <view class="li-r">{{ mockTest.certName }}/{{ mockTest.certLevelName }}</view>
      </view>
      <view class="li">
        <view class="li-l">考试标准</view>
        <view class="li-r"
          >{{ mockTest.questionCount }}题，{{ mockTest.examinationTimes }}分钟</view
        >
      </view>
      <view class="li">
        <view class="li-l">合格标准</view>
        <view class="li-r">{{ mockTest.passScore }}分及格（满分{{ mockTest.totalScore }}分）</view>
      </view>
      <view class="li">
        <view class="li-l">出题规则</view>
        <view class="li-r">根据人社部规定出题规则组卷</view>
      </view>

      <u-button type="primary" shape="circle" @click="startTest">
        <!-- 不用组件原因图片无法居中 -->
        <image :src="`${ossUrl}exam-start.png`" />开始考试
      </u-button>
      <!-- <view class="mocktest-checkbox">
        <u-checkbox v-model="checked" shape="circle" @change="change">优先考未做题</u-checkbox>
      </view>-->
    </view>
    <view class="tips">考试一旦开始，计时不中断 ，请勿关闭页面。</view>

    <u-popup v-model="showPopup" mode="center" width="664" border-radius="16">
      <view class="exam-result-wrap">
        <view class="title">有未做完的题⽬，是否继续</view>
        <view class="btn-wrap">
          <u-button plain type="primary" shape="circle" @click="routerTest">继续考试</u-button>
          <u-button type="primary" shape="circle" @click="routerTest('continue')"
            >重新考试</u-button
          >
        </view>
      </view>
    </u-popup>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
  import config from '@/config/config';
  import commonInfo from '@/util/commonInfo';
  import {
    queryCertmocktestpaper,
    loadExaminePaper,
    startExamine,
    createMockTestExaminePaper,
  } from '@/util/ajax/services';
  export default {
    filters: {
      filterPhone(val) {
        return val ? ` ${val.substr(0, 3)}****${val.substr(7)}` : '';
      },
    },
    data() {
      return {
        userInfo: {},
        examResult: {},
        mockTest: {},
        continueExamObj: {},
        showPopup: false,
        options: {},
        ossUrl: config.ossUrl,
      };
    },
    onLoad(options) {
      this.userInfo = commonInfo.getUser();
      this.options = options;
    },
    onShow() {
      let params = {
        id: this.options.id,
      };
      this.queryCertmocktestpaperApi(params);
    },
    methods: {
      async queryCertmocktestpaperApi(params) {
        let res = await queryCertmocktestpaper(params);
        this.mockTest = res.data;
      },
      async loadExaminePaperApi(params) {
        let res = await loadExaminePaper(params);
        this.continueExamObj = res.data;
        if (res.rescode === 200) {
          if (res.data.isNewExaminePaper == 0) {
            this.showPopup = true;
          } else {
            await startExamine({
              id: res.data.id,
            });
            this.routerTest();
          }
        } else {
          this.$refs.uToast.show({
            title: res.msg,
            type: 'error',
          });
        }
      },
      async routerTest(val) {
        this.showPopup = false;
        if (val === 'continue') {
          let params1 = {
            examineCertPaperId: this.continueExamObj.id,
            mockTestPaperId: this.continueExamObj.mockPaperId,
          };
          let res1 = await createMockTestExaminePaper(params1);
          let res2 = await startExamine({
            id: res1.data.id,
          });

          if (res2.rescode === 200) {
            let params2 = {
              mockTestPaperId: res1.data.mockPaperId,
              paperType: 2,
            };
            this.$u.route({
              url: '/pages/test/index',
              params: params2,
            });
          } else {
            this.$refs.uToast.show({
              title: res2.msg,
              type: 'error',
            });
          }
        } else {
          let params = {
            mockTestPaperId: this.mockTest.id,
            paperType: 2,
          };
          this.$u.route({
            url: '/pages/test/index',
            params: params,
          });
        }
      },
      startTest() {
        let params = {
          mockTestPaperId: this.mockTest.id,
          paperType: 2,
        };
        this.loadExaminePaperApi(params);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
