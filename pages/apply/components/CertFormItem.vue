<!--
 * @Author: your name
 * @Date: 2022-02-27 10:27:48
 * @LastEditTime: 2022-03-02 17:55:37
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \credit-cert-h5\pages\apply\components\CertFormItem.vue
-->
<template>
  <u-form-item :label="label" :prop="prop" :required="required">
    <u-input
      :value="value"
      :input-align="inputAlign"
      :placeholder-style="placeholderStyle"
      :placeholder="placeholder"
      :type="type"
      :select-open="selectShow"
      @click="selectShow = true"
      @input="handleInput"
    />
    <u-select
      v-if="type === 'select'"
      mode="single-column"
      :list="selectList"
      v-model="selectShow"
      @confirm="selectConfirm"
    ></u-select>
    <u-picker v-if="type === 'time'" mode="time" v-model="show" :params="params"></u-picker>
  </u-form-item>
</template>

<script>
  /**
   * input 输入框
   * @description 此组件为一个输入框，默认没有边框和样式，是专门为配合表单组件u-form而设计的，利用它可以快速实现表单验证，输入内容，下拉选择等功能。
   * @tutorial http://uviewui.com/components/input.html
   * @property {String} label 左侧提示文字
   * @property {String} prop 表单域model对象的属性名，在使用 validate、resetFields 方法的情况下，该属性是必填的
   * @property {String} required 是否显示左边的"*"号，这里仅起展示作用，如需校验必填，请通过rules配置必填规则
   * @property {String} placeholder placeholder显示值(默认 '请输入内容')
   * @property {String} type select / password / textarea / number
   * @property {Array} selectList 下拉选择框内容
   * @property {event} inputValueChange 同步修改绑定内容
   */
  export default {
    props: {
      label: {
        type: String,
        default: '',
      },
      prop: {
        type: String,
        default: '',
      },
      required: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        default: '请输入',
      },
      type: {
        type: String,
        default: '',
      },
      selectList: {
        type: Array,
        default: () => [],
      },
      value: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        selectShow: false,
        inputAlign: 'right',
        placeholderStyle: 'fontSize:16px;lineHeight:20px;color:#ccc',
      };
    },
    methods: {
      handleInput(value) {
        this.$emit('inputValueChange', value);
      },
      selectConfirm(e) {
        this.$emit('selectConfirm', e);
      },
    },
  };
</script>
