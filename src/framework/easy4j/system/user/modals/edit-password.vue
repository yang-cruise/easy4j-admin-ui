<template>
  <div v-if="editModel">
    <a-modal
      :title="editFormObj.title"
      v-model="editModel"
    >
      <a-form-model
        @submit="handleSubmit"
        ref="ruleForm"
        :model="editForm"
        :rules="rules"
      >
        <template v-for="(item, index) in formEidt">
          <a-form-model-item
            :key="index"
            :label="item.name"
            :labelCol="{lg: {span: 7}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 17}, sm: {span: 20} }"
            :prop="item.decorator"
            :required="item.required"
          >
            <a-input-search
              v-model.trim="editForm[item.decorator]"
              :placeholder="item.placeholder"
              :maxLength="20"
              @search="generatePassword"
            >
              <a-button slot="enterButton">
                随机密码
              </a-button>
            </a-input-search>
          </a-form-model-item>
        </template>
      </a-form-model>

      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          取消
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleSubmit">
          确定
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import {
  putSysUserPassword
} from '@/framework/api/user'

const formEidt = [
  {
    name: '新密码',
    message: '请输入密码',
    decorator: 'password',
    placeholder: '请输入密码',
    type: 'text',
    required: true,
    inputType: 'password'
  }
]

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (value.length < 6 || value.length > 20) {
      callback(new Error('请输入6~20个字符'))
    }

    callback()
  }
}

const rules = {
  password: [{ validator: validatePass, trigger: 'blur' }]
}

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    editFormObj: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      editModel: false,
      editForm: {
        password: ''
      },
      formEidt,
      rules,
      loading: false
    }
  },
  watch: {
    show (o, n) {
      this.editModel = this.show
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          return
        }

        this.putSysUserPassword()
      })
    },

    // 生成随机字符串
    generateCode (len) {
      const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      let str = ''
      for (let i = 0; i < len; i++) {
        str += arr[Math.floor(Math.random() * arr.length)]
      }
      return str
    },

    generatePassword () {
      const password = this.generateCode(6)
      this.$set(this.editForm, 'password', password)
    },

    putSysUserPassword () {
      const params = {
        userId: this.editFormObj.row.id,
        newPassword: this.editForm.password
      }

      this.loading = true
      putSysUserPassword(params).then(res => {
        this.loading = false
        this.$message.info('重置成功')
        this.submitSuccess()
      })
    },

    // 表单提交成功后的操作
    submitSuccess () {
      // 重置表单
      this.editForm.password = ''

      this.handleCancel()
    },

    // 关闭弹窗
    handleCancel () {
      this.$emit('closeDicFrom')
    }
  }
}
</script>
