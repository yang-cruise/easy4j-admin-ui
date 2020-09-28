<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">

        <a-form-model
          layout="vertical"
          ref="editForm"
          :model="editForm"
          :rules="rules"
        >
          <a-form-model-item
            label="旧密码"
            prop="originPassword"
          >
            <a-input placeholder="请输入密码" :maxLength="20" v-model.trim="editForm.originPassword"/>
          </a-form-model-item>
          <a-form-model-item
            label="新密码"
            prop="newPassword"
          >
            <a-input placeholder="请输入密码" :maxLength="20" v-model.trim="editForm.newPassword"/>
          </a-form-model-item>
          <a-form-model-item
            label="确认密码"
            prop="confirmPassword"
          >
            <a-input placeholder="请输入密码" :maxLength="20" v-model.trim="editForm.confirmPassword"/>
          </a-form-model-item>

          <a-form-model-item>
            <a-button type="primary" :loading="loading" @click="handleSubmit">提交</a-button>
          </a-form-model-item>
        </a-form-model>

      </a-col>
    </a-row>
  </div>
</template>

<script>
import {
  putSelfPassword
} from '@/framework/api/user'

export default {
  components: {
  },
  data () {
    const validateOriginPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        if (value.length < 6 || value.length > 20) {
          callback(new Error('请输入6~20个字符'))
        }
        callback()
      }
    }

    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (value.length < 6 || value.length > 20) {
          callback(new Error('请输入6~20个字符'))
        }

        if (this.editForm.confirmPassword !== '') {
          this.$refs.editForm.validateField('confirmPassword')
        }
        callback()
      }
    }

    const validateRepeatPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.editForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('请输入6~20个字符'))
      } else {
        callback()
      }
    }

    return {
      rules: {
        originPassword: [
          { validator: validateOriginPass, required: true, trigger: 'change' }
        ],
        newPassword: [
          { validator: validatePass, required: true, trigger: 'change' }
        ],
        confirmPassword: [
          { validator: validateRepeatPass, required: true, trigger: 'change' }
        ]
      },
      editForm: {
        originPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      loading: false
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.editForm.validate(valid => {
        if (!valid) {
          return
        }

        this.putSelfPassword()
      })
    },

    // 修改个人密码
    putSelfPassword () {
      this.loading = true
      putSelfPassword(this.editForm).then(res => {
        this.loading = false
        this.$message.info('修改成功')

        // TODO
        // 修改密码完之后是否要重新登录？？？
        // 操作成功，请重新登录！

        // 重置表单
        this.editForm = {
          originPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
