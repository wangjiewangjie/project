<template>
  <view class="page">
    <ProgressBar :current="1"></ProgressBar>
    <view class="tips">
      <u-image width="32rpx" height="32rpx" :src="`${ossUrl}apply-tips.png`"></u-image
      >以下数据已加密，放心填写
    </view>

    <u-form
      :model="form"
      ref="uForm"
      :error-type="errorType"
      :label-style="labelStyle"
      label-width="192"
    >
      <CertFormItem
        v-for="(item, index) in formList"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :required="item.required"
        :placeholder="item.placeholder"
        :type="item.type"
        :selectList="item.selectList"
        :value="item.value"
        @inputValueChange="inputValueChange($event, item.prop)"
        @selectConfirm="selectConfirm($event, item.prop)"
      ></CertFormItem>
    </u-form>

    <view class="exam-info">
      <view class="exam-info-li">考试时间：{{ examIneSchedule.examineTime || '-' }}</view>
      <view class="exam-info-li">考试地点：{{ examIneSchedule.examineRoomName || '-' }}</view>
    </view>

    <view class="footer">
      <u-checkbox v-model="checked" shape="circle" @change="change">
        已阅读协议
        <text class="a">《报名须知》</text>
      </u-checkbox>
      <u-button type="primary" shape="circle" @click="submit">立即提交</u-button>
    </view>

    <u-toast ref="uToast" />
  </view>
</template>

<script>
  import config from '@/config/config';
  import CertFormItem from './components/CertFormItem.vue';
  import ProgressBar from './components/ProgressBar.vue';
  import {
    addCertificatereservation,
    queryExamIneScheduleList,
    queryCertTypeList,
  } from '@/util/ajax/services';
  export default {
    components: {
      CertFormItem,
      ProgressBar,
    },
    data() {
      return {
        form: {
          name: '',
          professionalName: '',
          level: '',
          phone: '',
          idcard: '',
          scheduleId: '',
        },
        formList: [
          {
            label: '姓名',
            prop: 'name',
            required: true,
            placeholder: '请输入姓名',
            type: '',
            selectList: [],
            value: '',
          },
          {
            label: '项目',
            prop: 'professionalName',
            required: true,
            placeholder: '请选择',
            type: 'select',
            selectList: [],
            value: '',
          },
          {
            label: '等级',
            prop: 'level',
            required: true,
            placeholder: '请选择',
            type: 'select',
            selectList: [],
            value: '',
          },
          {
            label: '电话',
            prop: 'phone',
            required: true,
            placeholder: '很重要，用于短信通知',
            type: '',
            selectList: [],
            value: '',
          },
          {
            label: '身份证号',
            prop: 'idcard',
            required: true,
            placeholder: '请正确输入您的身份证号码',
            type: '',
            selectList: [],
            value: '',
          },
          {
            label: '考试期数',
            prop: 'scheduleId',
            required: true,
            placeholder: '请选择',
            type: 'select',
            selectList: [],
            value: '',
          },
        ],
        certTypeList: [],
        levelList: [],
        examIneScheduleList: [],
        examIneSchedule: {},
        checked: false,

        /* 表单校验 */
        rules: {
          name: [
            {
              required: true,
              message: '对不起，姓名填写不能空，请填写相关内容。',
              trigger: 'blur,change',
            },
            {
              validator: (rule, value) => {
                return this.$u.test.chinese(value);
              },
              message: '对不起，姓名填写格式有误，请检查并重新填写。',
              trigger: ['change', 'blur'],
            },
            {
              max: 10,
              message: '姓名长度最大10个字符',
            },
          ],
          professionalName: [
            {
              required: true,
              message: '对不起，项目填写不能空，请填写相关内容。',
              trigger: 'blur,change',
            },
          ],
          level: [
            {
              required: true,
              message: '对不起，等级填写不能空，请填写相关内容。',
              trigger: 'blur,change',
            },
          ],
          phone: [
            {
              required: true,
              message: '对不起，电话填写不能空，请填写相关内容。',
              trigger: 'blur,change',
            },
            {
              validator: (rule, value) => {
                return this.$u.test.mobile(value);
              },
              message: '对不起，电话填写格式有误，请检查并重新填写。',
              trigger: ['change', 'blur'],
            },
          ],
          idcard: [
            {
              required: true,
              message: '对不起，身份证填写不能空，请填写相关内容。',
              trigger: 'blur,change',
            },
            {
              validator: (rule, value) => {
                return this.$u.test.idCard(value);
              },
              message: '对不起，身份证填写格式有误，请检查并重新填写。',
              trigger: ['change', 'blur'],
            },
          ],
          scheduleId: [
            {
              required: true,
              message: '对不起，考试期数填写不能空，请填写相关内容。',
              trigger: 'blur,change',
            },
          ],
        },
        /* 表单样式 */
        errorType: ['toast'],
        labelStyle: {
          fontSize: '32rpx',
          lineHeight: '40rpx',
          color: '#333333',
        },
        inputAlign: 'right',
        placeholderStyle: 'fontSize:32rpx;lineHeight:40rpx;color:#ccc',
        ossUrl: config.ossUrl,
      };
    },
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    },
    onLoad(options) {
      this.loadChangeValueFn('professionalName', options.certName);
      this.loadChangeValueFn('level', options.certLevelName);
      this.loadChangeValueFn('scheduleId', options.title);

      this.examIneSchedule.examineTime = options.examineTime;
      this.examIneSchedule.examineRoomName = options.examineRoomName;

      this.queryCertTypeListApi(options);

      if (options.certId) {
        this.queryExamIneScheduleListApi(options.certId);
      }
    },
    methods: {
      change(e) {
        this.checked = e.value;
      },

      inputValueChange(e, prop) {
        this.form[prop] = e;
      },

      selectConfirm(e, prop) {
        this.form[prop] = e[0].label;
        this.selectChangeValueFn(prop, e);

        if (e[0].label !== null) {
          if (prop === 'professionalName') {
            this.selectCleanFn('level');
            this.selectCleanFn('scheduleId');

            let formListIndex = this.formList.findIndex((item) => {
              return item.prop == 'level';
            });

            this.levelList = this.certTypeList[e[0].value].certInfoList;
            this.levelList.forEach((el) => {
              this.formList[formListIndex].selectList.push({
                label: el.levelName,
                value: el.id,
              });
            });
          }

          if (prop === 'level') {
            this.queryExamIneScheduleListApi(e[0].value);
            this.selectCleanFn('scheduleId');
          }

          if (prop === 'scheduleId') {
            let index = this.examIneScheduleList.findIndex((item) => {
              return item.value == e.value;
            });
            this.examIneSchedule = this.examIneScheduleList[index];
          }
        }
      },

      /* 改变下拉选中的值 */
      selectChangeValueFn(prop, e) {
        let index = this.formList.findIndex((item) => {
          return item.prop == prop;
        });
        this.formList[index].value = e[0].label;
      },
      /* 选中联动清空下拉框 */
      selectCleanFn(prop) {
        let index = this.formList.findIndex((item) => {
          return item.prop == prop;
        });
        this.formList[index].selectList = [];
        this.formList[index].value = '';
        this.form[prop] = '';
      },
      /* 生命周期加载获取证书信息 */
      loadChangeValueFn(prop, value) {
        let index = this.formList.findIndex((item) => {
          return item.prop == prop;
        });
        this.formList[index].value = value;
        this.form[prop] = value;
      },

      submit() {
        if (!this.checked) {
          this.$u.toast(' 请阅读协议《报名须知》');
          return;
        }
        this.$refs.uForm.validate(async (valid) => {
          if (valid) {
            let params = { ...this.form };
            let examIneSchedule = this.examIneScheduleList.find((item) => {
              return item.title == this.form.scheduleId;
            });
            params.scheduleId = examIneSchedule.id;
            params.certificateId = examIneSchedule.certId;
            delete params.level;
            delete params.professionalName;
            let res = await addCertificatereservation(params);
            if (res.rescode === 200) {
              this.$refs.uToast.show({
                title: '提交成功',
                type: 'success',
                url: '/pages/apply/apply_2',
                params: {
                  id: res.data,
                  certName: this.form.professionalName,
                },
              });
            } else {
              this.$refs.uToast.show({
                title: res.msg,
                type: 'error',
              });
            }
          }
        });
      },

      async queryCertTypeListApi(options) {
        let res = await queryCertTypeList();
        this.certTypeList = res.data;

        /* 查找当前prop对应的索引 */
        let formListIndex = this.formList.findIndex((item) => {
          return item.prop == 'professionalName';
        });
        /* push selectList所需要的数据 */
        this.certTypeList.forEach((el, index) => {
          this.formList[formListIndex].selectList.push({
            label: el.professionalName,
            value: index,
          });
        });

        if (options.certId) {
          let levelIndex = this.formList.findIndex((item) => {
            return item.prop == 'level';
          });
          let certTypeIndex = this.certTypeList.findIndex((item) => {
            return item.professionalName == options.certName;
          });
          this.levelList = this.certTypeList[certTypeIndex].certInfoList;

          this.levelList.forEach((el) => {
            this.formList[levelIndex].selectList.push({
              label: el.levelName,
              value: el.id,
            });
          });
        }
      },
      async queryExamIneScheduleListApi(certId) {
        let params = {
          certId: certId,
        };
        let res = await queryExamIneScheduleList(params);
        this.examIneScheduleList = res.data;
        /* 查找当前prop对应的索引 */
        let formListIndex = this.formList.findIndex((item) => {
          return item.prop == 'scheduleId';
        });
        /* push selectList所需要的数据 */
        this.examIneScheduleList.forEach((el) => {
          this.formList[formListIndex].selectList.push({
            label: el.title,
            value: el.id,
          });
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .tips {
    display: flex;
    align-items: center;
    margin: 24rpx 24rpx 0;
    padding: 8rpx 16rpx 12rpx;
    background: rgba(237, 123, 47, 0.1);
    border-radius: 8rpx;
    font-size: 28rpx;
    line-height: 36rpx;
    color: #ed7b2f;
    .u-image {
      margin-right: 8rpx;
    }
  }

  .u-form {
    margin: 24rpx 24rpx 0;
    padding: 0 24rpx;
    background: #fff;
    border-radius: 16rpx;
  }

  .exam-info {
    margin: 24rpx 24rpx 152rpx;
    padding: 24rpx;
    background: #ffffff;
    border-radius: 16rpx;
    font-size: 28rpx;
    line-height: 36rpx;
    color: $u-tips-color;
    .exam-info-li {
      & + .exam-info-li {
        margin-top: 16rpx;
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    padding: 16rpx 24rpx 0;
    width: 100%;
    border-top: 1rpx solid #e0e0e0;
    background: #f7f7f7;
    .u-checkbox {
      margin-bottom: 24rpx;
    }
    .u-checkbox__label {
      font-size: 24rpx;
      line-height: 32rpx;
      color: $u-content-color;
    }
    .a {
      color: $u-type-primary;
    }
  }
</style>
