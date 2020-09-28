<template>
  <page-header-wrapper :title="false">
    <div class="bg-white padding-40">
      <a-tabs :default-active-key="tab">
        <a-tab-pane key="siteConfig" tab="网站配置">
          <a-form-model :model="siteForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
            <a-form-model-item label="网站名称">
              <a-input v-model="siteForm.siteName" />
            </a-form-model-item>
            <a-form-model-item label="网站图标">
              <a-input v-model="siteForm.logo" />
            </a-form-model-item>
            <a-form-model-item label="网站描述">
              <a-input v-model="siteForm.slogan" />
            </a-form-model-item>
            <a-form-model-item label="网站备案号">
              <a-input v-model="siteForm.beian" />
            </a-form-model-item>
            <a-form-model-item label="网站版权信息">
              <a-input v-model="siteForm.copyright" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" @click="siteSubmit">保存</a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane key="loginConfig" tab="登录配置" force-render>
          <a-form-model layout="inline" :model="siteForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <div class="form-list" v-for="(item,index) in loginForm.config" :key="index">
              <a-form-model-item :label="item.name" :label-col="{ span: 14 }" :wrapper-col="{ span: 10 }">
                <a-switch v-model="item.enable" />
              </a-form-model-item>
              <a-form-model-item label="排序">
                <a-input type="number" v-model="item.sort" />
              </a-form-model-item>
              <span v-if="item.type=='account'">
                <a-form-model-item label="登录失败">
                  <a-input type="number" v-model="item.params.showCaptchaCount" />
                </a-form-model-item>
                <a-form-model-item label="密码错误">
                  <a-input type="number" v-model="item.params.lockAccountCount" />
                </a-form-model-item>
              </span>
              <span v-if="item.type=='sms'">
                <a-form-model-item label="appKey">
                  <a-input v-model="item.params.appKey" :disabled="!item.enable" />
                </a-form-model-item>
                <a-form-model-item label="appSecret">
                  <a-input v-model="item.params.appSecret" :disabled="!item.enable" />
                </a-form-model-item>
              </span>
              <span v-if="item.type=='wechat'">
                <a-form-model-item label="appId" :rules="wechatRules.appId">
                  <a-input v-model="item.params.appId" :disabled="!item.enable" />
                </a-form-model-item>
                <a-form-model-item label="appSecret" :rules="wechatRules.appSecret">
                  <a-input v-model="item.params.appSecret" :disabled="!item.enable" />
                </a-form-model-item>
                <a-form-model-item label="redirectUri" :rules="wechatRules.redirectUri">
                  <a-input v-model="item.params.redirectUri" :disabled="!item.enable" />
                </a-form-model-item>
              </span>
            </div>
            <div class="submit-btn">
              <a-form-model-item :label-col="{ span: 4 }" :wrapper-col="{ span: 14, offset: 10 }">
                <a-button type="primary" @click="loginSubmit">保存</a-button>
              </a-form-model-item>
            </div>
          </a-form-model>
        </a-tab-pane>
      </a-tabs>
    </div>
  </page-header-wrapper>
</template>
<script>
import { mapActions } from 'vuex'
import { siteMsgdetail } from '@/framework/api/login'
import { putSetting } from '@/framework/api/setting'
export default {
  data () {
    return {
      // 默认选择tab
      tab: 'siteConfig',
      // 网站配置参数
      siteForm: {
        siteName: '',
        logo: '',
        beian: '',
        copyright: '',
        slogan: ''
      },
      // 登录配置
      loginForm: {
        config: [
          {
            type: 'account',
            name: '密码登录',
            sort: 1,
            enable: true,
            params: {
              showCaptchaCount: 3,
              lockAccountCount: 5
            }
          },
          {
            type: 'sms',
            name: '短信登录',
            sort: 2,
            enable: false,
            params: {
              appKey: '',
              appSecret: ''
            }
          },
          {
            type: 'wechat',
            name: '微信登录',
            sort: 3,
            enable: false,
            params: {
              appId: '',
              appSecret: '',
              redirectUri: ''
            }
          }
        ]
      },
      smsRules: {
        appKey: [
          { required: true, message: '请输入appKey', trigger: 'blur' }
        ],
        appSecret: [
          { required: true, message: '请输入appSecret', trigger: 'blur' }
        ]
      },
      wechatRules: {
        appId: [
          { required: true, message: '请输入appId', trigger: 'blur' }
        ],
        appSecret: [
          { required: true, message: '请输入appSecret', trigger: 'blur' }
        ],
        redirectUri: [
          { required: true, message: '请输入redirectUri', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    const $this = this
    $this.eitd()
  },
  methods: {
    ...mapActions(['GetSysMsg']),
    eitd () {
      const $this = this
      //  for (const key in $this.$store.site.state) {
      //     $this.siteForm[key] = data[key]
      //   }
      // return
      siteMsgdetail({ configKey: 'SITE_CONFIG' }).then(res => {
        const data = res.data
        for (const key in $this.siteForm) {
          $this.siteForm[key] = data[key]
        }
      })
      siteMsgdetail({ configKey: 'LOGIN_CONFIG' }).then(res => {
        const data = res.data
        $this.loginForm = {
          config: data
        }
      })
    },
    siteSubmit () {
      const self = this
      const obj = {
        configContent: JSON.stringify(self.siteForm),
        configKey: 'SITE_CONFIG'
      }
      putSetting(obj).then(res => {
        self.$message.success('修改成功')
        self.GetSysMsg(self.siteForm)
        self.eitd()
      })
    },
    loginSubmit () {
      const self = this
      const obj = {
        configContent: JSON.stringify(self.loginForm.config),
        configKey: 'LOGIN_CONFIG'
      }
      putSetting(obj).then(res => {
        self.$message.success('修改成功')
        self.eitd()
      })
    }
  }
}
</script>

<style scoped>
.bg-white {
  background: #fff;
}
.padding-40 {
  padding: 40px;
}
.form-list{
  padding:30px 10px;
  border-bottom: 1px solid #d7d7d7;
}
.submit-btn{
  padding:30px 0;
}
</style>
