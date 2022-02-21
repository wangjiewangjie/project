<template>
  <view class="page">
    <ProgressBar :current="2"></ProgressBar>
    <view class="tips">如暂时没有准备资料，可缴费后通过我的-报名管理处上传和修改</view>

    <u-form
      :model="form"
      ref="uForm"
      :error-type="errorType"
      :label-style="labelStyle"
      label-width="192"
    >
      <u-form-item prop="photo" class="photo-wrap">
        <view class="h2">证件照片（1寸照片）</view>
        <u-upload :custom-btn="true" :action="action" :file-list="fileList">
          <view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
            <u-image width="240rpx" height="336rpx" :src="`${ossUrl}apply_2-upload.png`"></u-image>
          </view>
        </u-upload>
        <view class="h3">照片规范</view>
        <view class="ul">
          <view class="li" v-for="(item, index) in photosampleList" :key="index">
            <u-image
              width="156rpx"
              height="218rpx"
              :src="`${ossUrl}${item.photosamplePic}`"
            ></u-image>
            <view class="li-tips">{{ item.tips }}</view>
          </view>
        </view>
        <view class="contact">
          <view class="contact-tips">您还可以联系在线客服，由认定中心工作人员上传。</view>
          <button class="contact-btn">
            <u-image width="32rpx" height="32rpx" :src="`${ossUrl}apply_2-contact.png`"></u-image
            >联系客服
          </button>
        </view>
      </u-form-item>
      <view class="basics-info-title">基本信息</view>
      <view class="basics-info-wrap">
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
        <view class="more-wrap" v-show="!more" @click="more = true">
          <view class="more-btn">
            展开继续完善信息
            <u-image width="32rpx" height="32rpx" :src="`${ossUrl}down-arrows.png`"></u-image>
          </view>
        </view>
        <view v-show="more">
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
        </view>
      </view>
    </u-form>

    <view class="footer">
      <u-button type="primary" shape="circle" @click="submit">知悉上传，下一步</u-button>
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
        },
        photosampleList: [
          { photosamplePic: 'apply_2-upload_1.png', tips: '纯色背景白色最佳' },
          { photosamplePic: 'apply_2-upload_2.png', tips: '光线均匀' },
          { photosamplePic: 'apply_2-upload_3.png', tips: '正对镜头双耳露出' },
          { photosamplePic: 'apply_2-upload_4.png', tips: '发型整洁不浓妆' },
        ],
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

        more: false,

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
          fontSize: '16px',
          lineHeight: '20px',
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
          console.log(this.form);
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
  .page {
    overflow: scroll;
  }

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

  .photo-wrap {
    margin: 12px;
    padding: 0;
    background: #fff;
    border-radius: 8px;
    /deep/.u-form-item--right__content__slot {
      display: flex;
      flex-direction: column;
    }
    .h2 {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      line-height: 20px;
      color: #333333;
    }
    .u-upload {
      margin: 12px 0 24px;
    }
    .h3 {
      width: 100%;
      padding: 12px;
      font-size: 14px;
      line-height: 18px;
      color: #999999;
    }
    .ul {
      display: flex;
      justify-content: space-between;
      padding: 0 12px 12px;
      width: 100%;
      font-size: 12px;
      line-height: 16px;
      color: #999999;
      .li {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 0.5px solid #dcdcdc;
      }
      .li-tips {
        padding: 4px 0;
        width: 48px;
      }
    }

    .contact {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 12px 12px;
      padding: 8px;
      width: calc(100% - 24px);
      background: #f5f5f5;
      border-radius: 4px;
      font-size: 14px;
      line-height: 18px;
      color: #666666;
      .contact-btn {
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 12px;
        width: 100px;
        height: 32px;
        border-radius: 16px;
        background: $u-type-primary;
        font-size: 12px;
        line-height: 16px;
        color: #ffffff;
        .u-image {
          margin-right: 4px;
        }
      }
    }
  }

  .basics-info-title {
    padding: 12px;
    font-size: 16px;
    line-height: 20px;
    color: #666666;
  }
  .basics-info-wrap {
    margin: 12px 12px 60px;
    padding: 0 12px;
    background: #fff;
    border-radius: 8px;
  }

  .more-wrap {
    display: flex;
    justify-content: center;
    padding: 16px;
    .more-btn {
      display: flex;
      align-items: center;
      margin-right: 6px;
      padding: 7px 16px;
      background: #f5f5f5;
      border-radius: 24px;
      font-size: 14px;
      line-height: 18px;
      color: #999999;
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    z-index: 999;
    padding: 8px 12px 0;
    width: 100%;
    border-top: 0.5px solid #e0e0e0;
    background: #f7f7f7;
  }
</style>
