<template>
  <page-header-wrapper :title="false">
    <div class="menu bg-white border-box padding-10">
      <div class="table-page-search-wrapper">
        <easy4j-query-form v-model="queryform" :formConfig="formData" @search="handleQuery" @reset="handleRest"></easy4j-query-form>
      </div>
      <div class="table-operator" :class="{'margin-top-xs': $store.getters.isMobile}">
        <a-button type="primary" @click="handleInsert()">新增菜单</a-button>
        <a-button type="primary" @click="handleSort()">菜单排序</a-button>
      </div>
      <s-table
        ref="table"
        size="default"
        :columns="columns"
        :data="tableData"
        rowKey="id"
        :expandRowByClick="true">
        <span slot="action" slot-scope="text, record" @click.stop>
          <template>
            <a @click.prevent.stop="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="你确定删除该菜单数据"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handleDetel(record)">
              <a href="javascript:void(0)">删除</a>
            </a-popconfirm>
          </template>
        </span>
      </s-table>
      <sort-menu ref="sortMenu" @updata="$refs.table.refresh(true)"></sort-menu>
      <insert ref="insert" :info="currentItem" @updata="$refs.table.refresh(true)"></insert>
    </div>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/framework/components'
import SortMenu from './modules/SortMenu.vue'
import { mapGetters } from 'vuex'
import { getList, del } from '@/framework/api/menu'
import insert from './modules/insert.vue'
import moment from 'moment'
import Easy4jQueryForm from '@/framework/easy4j/components/easy4j-query-form'

export default {
  name: 'SysMenu',
  components: {
    STable,
    SortMenu,
    insert,
    Easy4jQueryForm
  },
  data () {
    return {
      moment,
      formData: [
        { label: '菜单名称', prop: 'name', placeholder: '请输入菜单名称' },
        { label: '菜单类型', prop: 'type', placeholder: '请选择菜单类型', type: 'select', dict: 'sys_menu.type' }
      ],
      queryform: {
        name: '',
        type: undefined
      },
      columns: [
        {
          title: '菜单名称',
          dataIndex: 'name'
        },
        {
          title: '菜单类型',
          dataIndex: 'typeText'
        },
        {
          title: '权限标识',
          dataIndex: 'perms'
        },
        {
          title: '图标',
          dataIndex: 'icon'
        },
        {
          title: '菜单展示',
          detaIndex: 'visible',
          customRender: item => (item ? '显示' : '隐藏')
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      tableData: () => {
        const params = {
          ...this.queryform
        }
        return getList(params).then(res => {
          return {
            data: res.data,
            pageNo: 0,
            totalCount: res.data.length
          }
        }).catch(error => {
          console.error(error)
          this.$message.error('网路异常，请刷新重试')
          return {
            data: [],
            pageNo: 0,
            totalCount: 0
          }
        })
      },
      currentItem: {},
      time: ''
    }
  },
  computed: {
    ...mapGetters(['addRouters'])
  },
  created () {
    sessionStorage.removeItem('MENUDATA')
  },
  methods: {
    changeTime (moment, date) {
      console.log(moment, date)
    },
    handleInsert () {
      this.currentItem = {}
      this.$refs.insert.show()
    },
    handleSort () {
      this.$refs.sortMenu.show()
    },
    handleEdit (row) {
      this.currentItem = { ...row }
      this.$refs.insert.show()
    },
    handleDetel (row) {
      const params = {
        ids: row.id
      }
      del(params).then(res => {
        this.$message.success('删除成功')
        this.$refs.table.refresh(true)
      })
    },
    handleRest () {
      this.$nextTick(() => {
        this.$refs.queryform.resetFields()
        this.$refs.table.refresh(true)
      })
    },
    handleQuery () {
      this.$refs.table.refresh(true)
    }
  }
}
</script>

<style lang="less" scoped>
.border-box {
  box-sizing: border-box;
}

.padding-10 {
  padding: 10px;
}

.bg-white {
  background-color: white;
}
</style>
