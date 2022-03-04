<template>
  <view class="page">
    <!-- 顺序练习模式 -->
    <u-navbar title="顺序练习" v-if="options.paperType == 1">
      <view class="navbar-right" slot="right">
        <view
          class="right-item"
          :class="!hideAnalysis ? '' : 'right-item-success'"
          @click="onHideAnalysis"
        >
          <u-image
            width="40rpx"
            height="40rpx"
            :src="!hideAnalysis ? `${ossUrl}exam-answer_1.png` : `${ossUrl}exam-answer_2.png`"
          ></u-image>
          <view class="right-item-r">看答案</view>
        </view>
      </view>
    </u-navbar>
    <!-- 错题模式 -->
    <u-navbar
      :title="rightWrongType == 0 ? '只看错题' : '查看试卷'"
      v-else-if="wrongMode"
    ></u-navbar>
    <!-- 模拟考试 -->
    <u-navbar v-else>
      <view class="slot-wrap">
        剩余时间
        <u-count-down :timestamp="timestamp" :show-days="false" :show-hours="false"></u-count-down>
      </view>
      <view class="navbar-right" slot="right">
        <view
          class="right-item"
          :class="hideAnalysis ? '' : 'right-item-success'"
          @click="onHideAnalysis"
        >
          <u-image
            width="40rpx"
            height="40rpx"
            :src="hideAnalysis ? `${ossUrl}exam-answer_1.png` : `${ossUrl}exam-answer_2.png`"
          ></u-image>
          <view class="right-item-r">看答案</view>
        </view>
      </view>
    </u-navbar>

    <!-- 题干 -->
    <view class="question-title">
      <text class="question-type">{{ examList[examIndex].questionTypeName }}</text>
      <text class="question-content" v-html="examList[examIndex].title"></text>
    </view>
    <!-- 选项 -->
    <view class="options-wrap">
      <view
        class="options"
        @click="chooseAnswer(index)"
        v-for="(item, index) in examList[examIndex].answerVOList"
        :key="index"
      >
        <!-- 不看答案 -->
        <block v-if="!hideAnalysis && !hideAnswerAnalysis">
          <view v-show="!item.checked" class="radio">
            <!-- 判断题类型不显示answerNo -->
            {{ examList[examIndex].questionType === 3 ? '' : item.answerNo }}
          </view>
          <u-image
            v-show="item.checked"
            width="64rpx"
            height="64rpx"
            :src="`${ossUrl}exam-answer_success.png`"
          ></u-image>
        </block>
        <!-- 看答案 -->
        <block v-if="hideAnalysis || hideAnswerAnalysis">
          <view v-show="item.rightChoicesFlag == 0 && !item.checked" class="radio">
            <!-- 判断题类型不显示answerNo -->
            {{ examList[examIndex].questionType === 3 ? '' : item.answerNo }}
          </view>
          <u-image
            v-show="item.rightChoicesFlag == 0 && item.checked"
            width="64rpx"
            height="64rpx"
            :src="`${ossUrl}exam-answer_error.png`"
          ></u-image>
          <u-image
            v-show="item.rightChoicesFlag == 1"
            width="64rpx"
            height="64rpx"
            :src="`${ossUrl}exam-answer_success.png`"
          ></u-image>
        </block>

        <view class="options-content">{{ item.content }}</view>
      </view>
      <!-- 答案 -->
      <view class="answer-wrap" v-show="hideAnalysis || hideAnswerAnalysis">
        <view>
          答案:
          <text class="right">{{ examList[examIndex].rightChoicesList.toString() }}</text>
        </view>
        <view v-show="userChooseOptions.length && !wrongMode">
          您选择
          <text class="error">{{ userChooseOptions }}</text>
        </view>
        <view v-show="examList[examIndex].studentAnswerList.length && wrongMode">
          您选择
          <text class="error">
            <block v-for="(v, index) in examList[examIndex].studentAnswerList" :key="index">{{
              v
            }}</block>
          </text>
        </view>
      </view>
    </view>

    <!-- 解析 -->
    <view class="line" v-show="hideAnalysis || hideAnswerAnalysis"></view>
    <view class="analysis-wrap" v-show="hideAnalysis || hideAnswerAnalysis">
      <view class="analysis-title">官方解析</view>
      <view class="analysis-content">{{ examList[examIndex].parse || '暂无官方解析' }}</view>
    </view>

    <!-- 切换题目 -->
    <view class="change-question-btn">
      <u-button
        v-show="examIndex !== 0"
        plain
        type="primary"
        shape="circle"
        @click="onChangeQuestion('last')"
        >上一题
      </u-button>
      <u-button
        v-show="examIndex !== examList.length - 1"
        type="primary"
        shape="circle"
        @click="onChangeQuestion('next')"
        >下一题</u-button
      >
    </view>

    <!-- 底部题目对错统计 -->
    <QuestionStatWrap
      v-if="!wrongMode"
      :examinePaperObj="examinePaperObj"
      :options="options"
      @onSubmitExamResult="onSubmitExamResult"
    ></QuestionStatWrap>
    <WrongStatWrap
      v-if="wrongMode"
      :examinePaperObj="examinePaperObj"
      :examIndex="examIndex"
    ></WrongStatWrap>

    <!-- 弹窗 -->
    <u-popup v-model="showExamResult" mode="center" width="664" height="790" border-radius="16">
      <ExamResultPopup
        :examinePaperObj="examinePaperObj"
        @onSubmitPaper="onSubmitPaper"
      ></ExamResultPopup>
    </u-popup>

    <u-toast ref="uToast" />
  </view>
</template>

<script>
  import config from '@/config/config';
  import {
    loadExaminePaper,
    submitSingleQuestion,
    submitPaper,
    queryExaminecertpaper,
    queryPracticeQuestion,
  } from '@/util/ajax/services';
  import ExamResultPopup from './components/ExamResultPopup.vue';
  import QuestionStatWrap from './components/QuestionStatWrap.vue';
  import WrongStatWrap from './components/WrongStatWrap.vue';
  export default {
    components: {
      ExamResultPopup,
      QuestionStatWrap,
      WrongStatWrap,
    },
    data() {
      return {
        examinePaperObj: {
          endTime: '',
        },
        examList: [
          {
            studentAnswerList: [],
            questionTypeName: '',
            rightChoicesList: [],
          },
        ],
        examIndex: 0,
        hideAnalysis: false,
        hideAnswerAnalysis: false,
        rightChoices: '',
        userChooseOptions: '',
        showExamResult: false,
        options: {},
        examName: '',
        wrongMode: false, //查看错题模式
        rightWrongType: null,

        ossUrl: config.ossUrl,

        timestamp: '',
      };
    },
    onLoad(options) {
      if (options.rightWrongType) {
        if (options.certWrong) {
          let params = options;
          this.queryPracticeQuestionApi(params);
          this.hideAnalysis = true;
          this.wrongMode = true;
          this.rightWrongType = options.rightWrongType;
        } else {
          let params = {
            id: Number(options.id),
            rightWrongType: options.rightWrongType == 0 ? Number(options.rightWrongType) : '',
          };
          this.queryExaminecertpaperApi(params);
          this.hideAnalysis = true;
          this.wrongMode = true;
          this.rightWrongType = options.rightWrongType;
        }
      } else {
        this.loadExaminePaperApi(options);
      }

      this.options = options;
    },
    methods: {
      /* 选择题目答案 */
      chooseAnswer(val) {
        let questionIndexObj = this.examList[this.examIndex];
        /* 判断题目类型 */
        if (questionIndexObj.questionType === 2) {
          /* 多选 */
          if (questionIndexObj.answerVOList[val].checked === false) {
            questionIndexObj.answerVOList[val].checked = true;
          } else {
            questionIndexObj.answerVOList[val].checked = false;
          }
        } else {
          /* 单选 */
          questionIndexObj.answerVOList.forEach((el, index) => {
            if (val === index) {
              if (questionIndexObj.answerVOList[val].checked === false) {
                questionIndexObj.answerVOList[val].checked = true;
              } else {
                questionIndexObj.answerVOList[val].checked = false;
              }
            } else {
              el.checked = false;
            }
          });
        }
        this.getUserChooseOptions();

        /* 更新数组 */
        this.$set(this.examList, this.examIndex, this.examList[this.examIndex]);

        /* 判断选中题目是否正确 */
        if (
          questionIndexObj.answerVOList[val].rightChoicesFlag === 1 &&
          this.examIndex !== this.examList.length - 1
        ) {
          this.onChangeQuestion('next');
        } else {
          this.hideAnswerAnalysis = true;
        }
      },

      /* 查看答案 */
      onHideAnalysis() {
        this.hideAnalysis = !this.hideAnalysis;
      },
      /* 切换题目 */
      onChangeQuestion(e) {
        let answerVOList = this.examList[this.examIndex].answerVOList;

        let studentAnswerList = [];

        answerVOList.forEach((el) => {
          if (el.checked) {
            studentAnswerList.push(el.answerNo);
          }
        });

        if (studentAnswerList.length && !this.wrongMode) {
          let params = {
            id: this.examinePaperObj.id,
            paperQuestionRelId: this.examList[this.examIndex].id,
            studentAnswerList: studentAnswerList,
          };
          this.submitSingleQuestionApi(params);
        }

        this.hideAnswerAnalysis = false;
        if (e === 'next') {
          this.examIndex++;
        } else {
          this.examIndex--;
        }

        this.getUserChooseOptions();
      },

      onSubmitPaper(e) {
        if (e) {
          let params = {
            id: this.examinePaperObj.id,
          };
          this.submitPaperApi(params);
        } else {
          this.showExamResult = false;
        }
      },
      /* 交卷提交当前题目 */
      onSubmitExamResult() {
        let answerVOList = this.examList[this.examIndex].answerVOList;

        let studentAnswerList = [];

        answerVOList.forEach((el) => {
          if (el.checked) {
            studentAnswerList.push(el.answerNo);
          }
        });

        if (studentAnswerList.length) {
          let params = {
            id: this.examinePaperObj.id,
            paperQuestionRelId: this.examList[this.examIndex].id,
            studentAnswerList: studentAnswerList,
          };
          this.submitSingleQuestionApi(params);
        }

        this.getUserChooseOptions();
        this.showExamResult = true;
      },

      /* 解析用户选择试题答案 */
      getUserChooseOptions() {
        this.userChooseOptions = '';
        let answerVOList = this.examList[this.examIndex].answerVOList;
        answerVOList.forEach((el) => {
          if (el.checked && el.rightChoicesFlag === 0) {
            this.userChooseOptions += `${el.answerNo},`;
          }
        });

        this.userChooseOptions = this.userChooseOptions.slice(
          0,
          this.userChooseOptions.lastIndexOf(',')
        );
      },

      /* 顺序练习 */
      async loadExaminePaperApi(params) {
        let res = await loadExaminePaper(params);
        this.examinePaperObj = res.data;

        this.examName = `${this.examinePaperObj.certName}${this.examinePaperObj.certLevelName}`;
        this.examList = this.examinePaperObj.examineCertPaperRelDetailList;
        this.examList.forEach((el) => {
          el.answerVOList.forEach((v) => {
            v.checked = false;
          });
        });

        if (this.examinePaperObj.endTime) {
          this.timestamp =
            (Date.parse(new Date(this.examinePaperObj.endTime.replace(/-/g, '/'))) -
              Date.parse(new Date())) /
            1000;
        }

        this.examIndex = this.examList.findIndex((item) => {
          return item.state == 0;
        });
        this.examIndex = this.examIndex == -1 ? 0 : this.examIndex;
      },

      /* 单个提交 */
      async submitSingleQuestionApi(params) {
        let res = await submitSingleQuestion(params);
        this.examinePaperObj = {
          ...res.data,
        };
      },
      /* 整个提交试卷 */
      async submitPaperApi(params) {
        let res = await submitPaper(params);
        if (res.rescode === 200) {
          let examResult = res.data;
          examResult.paperType = this.options.paperType;
          examResult.examName = this.examName;
          examResult.mockTestPaperId = this.options.mockTestPaperId;
          this.$u.route({
            url: '/pages/test/examResult/index',
            type: 'redirectTo',
            params: examResult,
          });
        } else {
          this.$refs.uToast.show({
            title: res.msg,
            type: 'error',
          });
        }
      },

      /* 试卷错题 */
      async queryExaminecertpaperApi(params) {
        let res = await queryExaminecertpaper(params);
        this.examinePaperObj = res.data;

        this.examName = `${this.examinePaperObj.certName}${this.examinePaperObj.certLevelName}`;
        this.examList = this.examinePaperObj.examineCertPaperRelDetailList;
        this.examList.forEach((el) => {
          el.answerVOList.forEach((v) => {
            if (this.examList[this.examIndex].studentAnswerList.indexOf(v.answerNo)) {
              v.checked = false;
            } else {
              v.checked = true;
            }
          });
        });
      },

      async queryPracticeQuestionApi(params) {
        let res = await queryPracticeQuestion(params);
        this.examinePaperObj = res.data;

        this.examName = `${this.examinePaperObj.certName}${this.examinePaperObj.certLevelName}`;
        this.examList = this.examinePaperObj.examineCertPaperRelDetailList;
        this.examList.forEach((el) => {
          el.answerVOList.forEach((v) => {
            if (this.examList[this.examIndex].studentAnswerList.indexOf(v.answerNo)) {
              v.checked = false;
            } else {
              v.checked = true;
            }
          });
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
