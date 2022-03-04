<template>
  <view class="tabs-1">
    <view class="tabs-1_bg1"></view>
    <view class="tabs-1_bg2"></view>
    <view class="tabs-1_bg3"></view>
    <view class="tabs-1_bg4"></view>
    <view class="tabs-1_bg5"></view>
    <view class="query-title"></view>
    <view class="query-form-wrap">
      <view class="query-form-title">
        <u-image width="16rpx" height="16rpx" :src="`${ossUrl}query-form_title.png`"></u-image>
        <view class="query-form-name">search information</view>
        <u-image width="16rpx" height="16rpx" :src="`${ossUrl}query-form_title.png`"></u-image>
      </view>
      <view class="query-form">
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
            @inputValueChange="inputValueChange($event, item.prop)"
          ></CertFormItem>
        </u-form>

        <u-button class="query-btn" type="primary" shape="circle" @click="submit"
          >立即查询</u-button
        >
      </view>
    </view>
  </view>
</template>

<script>
  /* eslint-disable no-console */
  import config from '@/config/config';
  import CertFormItem from '../../apply/components/CertFormItem.vue';
  export default {
    components: {
      CertFormItem,
    },
    data() {
      return {
        form: {
          name: '',
        },
        formList: [
          {
            label: '姓名',
            prop: 'name',
            required: false,
            placeholder: '请输入姓名',
            type: '',
            selectList: [],
          },
          {
            label: '考试科目',
            prop: 'input1',
            required: false,
            placeholder: '请选择您的考试科目',
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
          {
            label: '查询期数',
            prop: 'input2',
            required: false,
            placeholder: '请选择您的查询期数',
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
        },
        /* 表单样式 */
        errorType: ['toast'],
        labelStyle: {
          fontSize: '32rpx',
          lineHeight: '40rpx',
          color: '#333333',
        },
        ossUrl: config.ossUrl,
      };
    },
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    },
    methods: {
      inputValueChange(e, prop) {
        this.form[prop] = e;
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
  .tabs-1 {
    position: relative;
    width: 100%;
    height: calc(100% - 50px);
    border-radius: 0 0 160rpx 0;
    background: linear-gradient(180deg, #2460f5 0%, #0412bf 100%);
    .tabs-1_bg1 {
      position: absolute;
      width: 262rpx;
      height: 292rpx;
      background: url($ossUrl + 'query-bg1_1.png') no-repeat;
      background-size: contain;
    }
    .tabs-1_bg2 {
      position: absolute;
      right: 0;
      width: 288rpx;
      height: 327rpx;
      background: url($ossUrl + 'query-bg1_2.png') no-repeat;
      background-size: contain;
    }
    .tabs-1_bg3 {
      position: absolute;
      top: 444rpx;
      right: 0;
      width: 200rpx;
      height: 244rpx;
      background: url($ossUrl + 'query-bg1_3.png') no-repeat;
      background-size: contain;
    }
    .tabs-1_bg4 {
      position: absolute;
      top: 842rpx;
      right: 0;
      width: 184rpx;
      height: 172rpx;
      background: url($ossUrl + 'query-bg1_4.png') no-repeat;
      background-size: contain;
    }
    .tabs-1_bg5 {
      position: absolute;
      bottom: 0;
      width: 464rpx;
      height: 518rpx;
      background: url($ossUrl + 'query-bg1_5.png') no-repeat;
      background-size: contain;
    }

    .query-title {
      position: absolute;
      top: 64rpx;
      left: 54rpx;
      width: 640rpx;
      height: 222rpx;
      background: url($ossUrl + 'query-title.png') no-repeat;
      background-size: contain;
    }

    .query-form-wrap {
      position: absolute;
      top: 162px;
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .query-form-title {
        display: flex;
        padding: 16rpx 32rpx;
        background: #5797ff;
        border-radius: 16rpx 16rpx 0 0;
        font-weight: 500;
        font-size: 22rpx;
        line-height: 32rpx;
        letter-spacing: 8rpx;
        color: rgba(#fff, 0.6);
      }
      .query-form-name {
        padding: 0 18rpx;
      }
      .query-form {
        padding: 48rpx 24rpx;
        width: 686rpx;
        height: 600rpx;
        background: #dbe5f8;
        box-shadow: 0rpx 4rpx 24rpx rgba(37, 56, 88, 0.5);
        border-radius: 16rpx;
      }
      /deep/.u-form-item {
        padding: 17rpx 24rpx;
        height: 104rpx;
        background: #ffffff;
        border-radius: 16rpx;
        & + .u-form-item {
          margin-top: 16rpx;
        }
      }
      .query-btn {
        margin-top: 64rpx;
        width: 542rpx;
        height: 96rpx;
        border-radius: 48rpx;
      }
    }
  }
</style>
