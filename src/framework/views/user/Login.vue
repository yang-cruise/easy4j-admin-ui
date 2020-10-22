<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-card
        style="width:100%"
      >
        <div>
          <a-tabs
            :activeKey="customActiveKey"
            :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
            @change="handleTabClick"
          >
            <a-tab-pane key="tab1" tab="账号密码登录">
              <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="用户名或密码错误" />
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  placeholder="用户名"
                  v-decorator="[
                    'account',
                    {rules: [{ required: true, message: '请输入用户名' }], validateTrigger: 'blur'}
                  ]"
                >
                  <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>

              <a-form-item>
                <a-input-password
                  size="large"
                  placeholder="密码"
                  v-decorator="[
                    'password',
                    {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
                  ]"
                >
                  <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input-password>
              </a-form-item>
            </a-tab-pane>
            <!-- <a-tab-pane key="tab2" tab="扫码登录">
              <div class="code-content">
                <img src="@/framework/assets/install.png" />
              </div>
            </a-tab-pane> -->
          </a-tabs>
        </div>
        <div>
          <a-form-item v-if="customActiveKey==='tab1'" style="margin-top:24px">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
            >确定</a-button>
          </a-form-item>
        </div>
      </a-card>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/framework/utils/util'

export default {
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      loginType: 0,
      isLoginError: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  mounted () {
    localStorage.clear()
    sessionStorage.clear()
    this.GetSysMsg()
  },
  methods: {
    ...mapActions(['Login', 'Logout', 'GetSysMsg', 'GetInfo', 'GetBtnPermissions']),
    handleTabClick (key) {
      this.customActiveKey = key
      this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this
      state.loginBtn = true
      const validateFieldsKey = customActiveKey === 'tab1' ? ['account', 'password'] : ['mobile', 'captcha']
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          Login(values)
            .then((res) => this.goPage())
            .catch(() => {
              this.isLoginError = true
            })
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    goPage () {
      Promise.all([this.GetInfo(), this.GetBtnPermissions()]).then(() => {
        this.$router.push({ path: '/' }, () => {
          this.$notification.success({
            message: '欢迎',
            description: `${timeFix()}，欢迎回来`
          })
        })
        this.isLoginError = false
      }).catch(() => {
        this.isLoginError = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .code-content{
    text-align: center;
    img{
      width: 200px;
    }
  }
}
</style>
