<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="10">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="username">{{ userInfo.account }}</div>
            <div class="listInfo">姓名：{{ userInfo.realname }}</div>
            <div class="listInfo">角色：{{ userInfo.roles | strFmt('roleName') }}</div>
            <div class="listInfo">部门：{{ userInfo.dept ? userInfo.dept.deptName : '' }}</div>
            <div class="listInfo">手机：{{ userInfo.mobile }}</div>
            <div class="listInfo">邮箱：{{ userInfo.email }}</div>
            <div class="listInfo">性别：{{ userInfo.sex === 'M' ? '男' : '女' }}</div>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="14">
        <a-card
          style="width:100%"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="key => handleTabChange(key, 'noTitleKey')"
        >
          <!-- <article-page v-if="noTitleKey === 'article'"></article-page> -->
          <app-page v-if="noTitleKey === 'app'" :formData="userInfo" @updateInfo="getInfo"></app-page>
          <!-- <project-page v-else-if="noTitleKey === 'project'"></project-page> -->
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/framework/layouts'
import { AppPage, ArticlePage, ProjectPage } from './page'

import { mapGetters } from 'vuex'

import { getUserInfo } from '@/framework/api/user'

export default {
  components: {
    RouteView,
    PageView,
    AppPage,
    ArticlePage,
    ProjectPage
  },
  data () {
    return {
      tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川'],

      tagInputVisible: false,
      tagInputValue: '',

      teams: [],
      teamSpinning: true,

      tabListNoTitle: [
        {
          key: 'app',
          tab: '个人信息'
        }
      ],
      noTitleKey: 'app',
      userInfo: {}
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])
  },
  filters: {
    strFmt (val, prop) {
      if (!val || !val.length) {
        return ''
      }
      return val.map(item => item[prop]).join()
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    getTeams () {
      this.$http.get('/workplace/teams').then(res => {
        this.teams = res.result
        this.teamSpinning = false
      })
    },
    getInfo () {
      getUserInfo().then(res => {
        console.log(res)
        this.userInfo = res.data
      })
    },
    handleTabChange (key, type) {
      this[type] = key
    },

    handleTagClose (removeTag) {
      const tags = this.tags.filter(tag => tag !== removeTag)
      this.tags = tags
    },

    showTagInput () {
      this.tagInputVisible = true
      this.$nextTick(() => {
        this.$refs.tagInput.focus()
      })
    },

    handleInputChange (e) {
      this.tagInputValue = e.target.value
    },

    handleTagInputConfirm () {
      const inputValue = this.tagInputValue
      let tags = this.tags
      if (inputValue && !tags.includes(inputValue)) {
        tags = [...tags, inputValue]
      }

      Object.assign(this, {
        tags,
        tagInputVisible: false,
        tagInputValue: ''
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .listInfo {
      padding: 10px 0;
      text-align: left;
    }
  }

  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }

    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }

    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
  }

  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }

  .account-center-team {
    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;
        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          max-width: 100px;
          vertical-align: top;
          margin-left: 12px;
          transition: all 0.3s;
          display: inline-block;
        }
        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }

  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}
</style>
