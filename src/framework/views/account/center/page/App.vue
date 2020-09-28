<template>
  <div class="app-list">
    <a-card :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="账号"
          :required="false"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-input
            v-decorator="['account', { initialValue: formData.account }]"
            name="account"
            placeholder=""
            disabled />
        </a-form-item>
        <a-form-item
          label="姓名"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'realname',
              { initialValue: formData.realname },
              {rules: [{ required: true, message: '请输入姓名' }]}
            ]"
            name="realname"
          />
        </a-form-item>
        <a-form-item
          label="手机"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'mobile',
              { initialValue: formData.mobile },
              {rules: [{ required: true, message: ' ',trigger: 'blur' },{validator: validatePhone}]}
            ]"
            name="mobile"
          />
        </a-form-item>
        <a-form-item
          label="email"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'email',
              { initialValue: formData.email },
              {rules: [{ required: true, message: ' ' }, { validator : validateEmail }]}
            ]"
            name="name"
          />
        </a-form-item>
        <a-form-item
          label="目标公开"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }"
          :required="false"
        >
          <a-radio-group v-decorator="['sex', { initialValue: formData.sex }]">
            <a-radio value="M">男</a-radio>
            <a-radio value="F">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :wrapperCol="{lg: {span: 24}, sm: {span: 24} }"
          style="text-align: center"
        >
          <a-button htmlType="submit" type="primary">更新个人信息</a-button>
        </a-form-item>
      </a-form>
    </a-card>

  </div>
</template>

<script>
import { putUserInfo } from '@/framework/api/user'

export default {
  name: 'Article',
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {},
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  filters: {
    strFmt (val, prop) {
      if (!val || !val.length) {
        return ''
      }
      return val.map(item => item[prop]).join()
    }
  },
  methods: {
    // handler
    handleSubmit (e) {
      const self = this
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          putUserInfo(Object.assign({ id: self.formData.id }, values))
          .then(res => {
            self.$emit('updateInfo')
          })
        }
      })
    },
    validatePhone (rule, value, callback) {
      const regex = /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9])|(16[6]))\d{8}$/
      if (!regex.test(value)) {
        callback(new Error('请输入正确的手机号'))
      }
      callback()
    },
    validateEmail (rule, value, callback) {
      /* eslint-disable */
      if (!(/^([a-zA-Z0-9]+[-|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value))) {
        callback(new Error('请输入正确的邮箱'))
      }
      callback()
    }
  }
}
</script>

<style lang="less" scoped>

  .app-list {

    .meta-cardInfo {
      zoom: 1;
      margin-top: 16px;

      > div {
        position: relative;
        text-align: left;
        float: left;
        width: 50%;

        p {
          line-height: 32px;
          font-size: 24px;
          margin: 0;

          &:first-child {
            color: rgba(0, 0, 0, .45);
            font-size: 12px;
            line-height: 20px;
            margin-bottom: 4px;
          }
        }

      }
    }
  }

</style>
