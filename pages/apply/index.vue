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
        :required="true"
        :placeholder="item.placeholder"
        :type="item.type"
        :selectList="item.selectList"
        @inputValueChange="inputValueChange($event, item.prop)"
      ></CertFormItem>
      <u-form-item label="姓名" prop="name" required>
        <u-input
          v-model="form.name"
          :input-align="inputAlign"
          :placeholder-style="placeholderStyle"
          placeholder="请输入姓名"
        />
      </u-form-item>
      <u-form-item label="项目" prop="input1" required>
        <u-input
          v-model="form.input1"
          :input-align="inputAlign"
          :placeholder-style="placeholderStyle"
          placeholder="请选择"
          type="select"
          :select-open="input1selectShow"
          @click="input1selectShow = true"
        />
      </u-form-item>
      <u-form-item label="等级" prop="input2" required>
        <u-input
          v-model="form.input2"
          :input-align="inputAlign"
          :placeholder-style="placeholderStyle"
          placeholder="请选择"
          type="select"
          :select-open="input2selectShow"
          @click="input2selectShow = true"
        />
      </u-form-item>
      <u-form-item label="电话" prop="input3" required>
        <u-input
          v-model="form.input3"
          :input-align="inputAlign"
          :placeholder-style="placeholderStyle"
          placeholder="很重要，用于短信通知"
        />
      </u-form-item>
      <u-form-item label="身份证号" prop="input4" required>
        <u-input
          v-model="form.input4"
          :input-align="inputAlign"
          :placeholder-style="placeholderStyle"
          placeholder="请正确输入您的身份证号码"
        />
      </u-form-item>
      <u-form-item label="考试期数" prop="input5" required :border-bottom="false">
        <u-input
          v-model="form.input5"
          :input-align="inputAlign"
          :placeholder-style="placeholderStyle"
          placeholder="请选择"
          type="select"
          :select-open="input5selectShow"
          @click="input5selectShow = true"
        />
      </u-form-item>
    </u-form>
    <u-select
      mode="single-column"
      :list="input1List"
      v-model="input1selectShow"
      @confirm="input1selectConfirm"
    ></u-select>

    <u-select
      mode="single-column"
      :list="input2List"
      v-model="input2selectShow"
      @confirm="input2selectConfirm"
    ></u-select>

    <u-select
      mode="single-column"
      :list="input5List"
      v-model="input5selectShow"
      @confirm="input5selectConfirm"
    ></u-select>

    <view class="exam-info">
      <view class="exam-info-li">考试时间：3月22日 20:30</view>
      <view class="exam-info-li">考试地点：渝中区百货大楼2楼</view>
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
  /* eslint-disable no-console */
  import config from '@/config/config';
  import CertFormItem from './components/CertFormItem.vue';
  import ProgressBar from './components/ProgressBar.vue';
  export default {
    components: {
      CertFormItem,
      ProgressBar,
    },
    data() {
      return {
        form: {
          name: '',
          input1: '',
          input2: '',
          input3: '',
          input4: '',
          input5: '',
        },
        formList: [
          {
            label: '姓名',
            prop: 'name',
            required: true,
            placeholder: '请输入姓名',
            type: '',
            selectList: [],
          },
          {
            label: '文化程度',
            prop: 'input1',
            required: true,
            placeholder: '请选择',
            type: 'select',
            selectList: [
              {
                value: '小学',
                label: '小学',
              },
              {
                value: '初中',
                label: '初中',
              },
              {
                value: '高中',
                label: '高中',
              },
              {
                value: '大学',
                label: '大学',
              },
            ],
          },
        ],
        input1selectShow: false,
        input1List: [
          {
            value: '电子产品',
            label: '电子产品',
          },
          {
            value: '服装',
            label: '服装',
          },
          {
            value: '工艺品',
            label: '工艺品',
          },
        ],
        input2selectShow: false,
        input2List: [
          {
            value: '电子产品',
            label: '电子产品',
          },
          {
            value: '服装',
            label: '服装',
          },
          {
            value: '工艺品',
            label: '工艺品',
          },
        ],

        input5selectShow: false,
        input5List: [
          {
            value: '电子产品',
            label: '电子产品',
          },
          {
            value: '服装',
            label: '服装',
          },
          {
            value: '工艺品',
            label: '工艺品',
          },
        ],

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
          input1: [
            {
              required: true,
              message: '对不起，项目填写不能空，请填写相关内容。',
              trigger: 'blur,change',
            },
          ],
          input2: [
            {
              required: true,
              message: '对不起，等级填写不能空，请填写相关内容。',
              trigger: 'blur,change',
            },
          ],
          input3: [
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
              // 触发器可以同时用blur和change，二者之间用英文逗号隔开
              trigger: ['change', 'blur'],
            },
          ],
          input4: [
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
              // 触发器可以同时用blur和change，二者之间用英文逗号隔开
              trigger: ['change', 'blur'],
            },
          ],
          input5: [
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
          fontSize: '16px',
          lineHeight: '20px',
          color: '#333333',
        },
        inputAlign: 'right',
        placeholderStyle: 'fontSize:16px;lineHeight:20px;color:#ccc',
        ossUrl: config.ossUrl,
      };
    },
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    },
    methods: {
      input1selectConfirm(e) {
        this.form.input1 = '';
        e.map((val) => {
          this.form.input1 += this.form.input1 == '' ? val.label : '-' + val.label;
        });
      },

      input2selectConfirm(e) {
        this.form.input2 = '';
        e.map((val) => {
          this.form.input2 += this.form.input1 == '' ? val.label : '-' + val.label;
        });
      },

      input5selectConfirm(e) {
        this.form.input2 = '';
        e.map((val) => {
          this.form.input2 += this.form.input1 == '' ? val.label : '-' + val.label;
        });
      },

      change(e) {
        this.checked = e.value;
      },
      submit() {
        this.$refs.uForm.validate((valid) => {
          if (valid) {
            console.log('成功');
          } else {
            console.log('验证失败');
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .tips {
    display: flex;
    align-items: center;
    margin: 12px 12px 0;
    padding: 4px 8px 6px;
    background: rgba(237, 123, 47, 0.1);
    border-radius: 4px;
    font-size: 14px;
    line-height: 18px;
    color: #ed7b2f;
    .u-image {
      margin-right: 4px;
    }
  }

  .u-form {
    margin: 12px 12px 0;
    padding: 0 12px;
    background: #fff;
    border-radius: 8px;
  }

  .exam-info {
    margin: 12px 12px 76px;
    padding: 12px;
    background: #ffffff;
    border-radius: 8px;
    font-size: 14px;
    line-height: 18px;
    color: #999999;
    .exam-info-li {
      & + .exam-info-li {
        margin-top: 8px;
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    padding: 8px 12px 0;
    width: 100%;
    border-top: 0.5px solid #e0e0e0;
    background: #f7f7f7;
    .u-checkbox {
      margin-bottom: 12px;
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
