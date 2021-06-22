<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false">
      <easy4j-query-form :formConfig="formData" @search="search" @reset="reset"></easy4j-query-form>
      <div class="table-operator">
        <a-button @click="addCell" type="primary" icon="plus">新增字典</a-button>
      </div>
      <s-table
        ref="table"
        size="default"
        :rowKey="(record) => record.id"
        :columns="columns"
        :data="loadData"
        :showPagination="false"
      >
        <span slot="id" slot-scope="text, record, index">
          {{ index+1 }}
        </span>
        <span slot="name" slot-scope="text, record" @click="showDio(record)" class="tableCellLight">
          {{ text.name }}
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm placement="top" ok-text="确定" cancel-text="取消" @confirm="confirm(record)">
              <template slot="title">
                <p>是否确认删除此条记录？</p>
              </template>
              <a>删除</a>
            </a-popconfirm>
          </template>
        </span>
      </s-table>
      <div style="text-align:right">
        <a-pagination
          style="padding:20px 0"
          show-quick-jumper
          show-size-changer
          :page-size="queryParam.size"
          @showSizeChange="onShowSizeChange"
          :default-current="queryParam.current"
          :total="total"
          :show-total="total => `共 ${total} 条`"
          @change="onChange" />
      </div>
      <Dic-from
        v-show="editModel"
        :form="formModel"
        :show="editModel"
        @formAddAction="formAddAction"
        @formEditAction="formEditAction"
        @closeDicFrom="editModel = false">
      </Dic-from>
      <Change-from
        v-show="cellModel"
        :show="cellModel"
        :dicInfo="dicInfo"
        @closeCellFrom="cellModel = false">
      </Change-from>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/framework/components'
import DicFrom from './modules/editFrom'
import ChangeFrom from './modules/changeCell'
import Easy4jQueryForm from '@/framework/easy4j/components/easy4j-query-form'
import {
  getDictionaries,
  deleteDiction,
  addDiction,
  editDiction
} from '@/framework/api/dictionaries'

const formData = [
  {
    label: '字典名称',
    prop: 'name',
    placeholder: '请输入字典名称'
  },
  {
    label: '字典编码',
    prop: 'code',
    placeholder: '请输入字典编码'
  }
]

export default {
  name: 'SysDict',
  components: {
    STable, DicFrom, ChangeFrom, Easy4jQueryForm
  },
  data () {
    return {
      formData: formData,
      editModel: false,
      cellModel: false,
      columns: [
        {
          title: '',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '字典名称',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '字典编码',
          dataIndex: 'code'
        },
        {
          title: '显示顺序',
          dataIndex: 'sort'
        },
        {
          title: '备注',
          dataIndex: 'description'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 查询条件参数
      queryParam: {
        current: 1,
        size: 10
      },
      loadData: parameter => {
        return this.Dictionaries()
      },
      selectedRowKeys: [],
      selectedRows: [],
      dicInfo: {},
      formModel: {
        title: '',
        fromData: [],
        type: 'add'
      },
      total: 0
    }
  },
  mounted () {
    // this.Dictionaries()
  },
  methods: {
    changeSelect (value) {
      console.log(value, 'value')
    },
    onChange (pageNumber) {
      console.log('Page: ', pageNumber)
      this.queryParam.current = pageNumber
      this.$refs['table'].refresh()
    },
    onShowSizeChange (current, pageSize) {
      this.queryParam.size = pageSize
      this.$refs['table'].refresh()
    },
    Dictionaries () {
      const self = this
      return getDictionaries(self.queryParam).then(res => {
        const result = res.data
        self.total = result.total
        return {
          data: result.records,
          pageSize: result.size,
          pageNo: result.current,
          totalCount: result.total,
          totalPage: Math.ceil(result.total / result.size)
        }
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleEdit (record) {
      this.formModel = {
        title: '编辑字典',
        fromData: record,
        type: 'edit'
      }
      this.editModel = true
    },
    formAddAction (item) {
      const self = this
      addDiction(item).then(res => {
        self.$refs.table.refresh()
        self.editModel = false
      })
    },
    formEditAction (item) {
      const self = this
      editDiction(item).then(res => {
        self.$refs.table.refresh()
        self.editModel = false
      })
    },
    addCell (record) {
      this.formModel = {
        title: '新增字典',
        fromData: {},
        type: 'add'
      }
      this.editModel = true
    },
    confirm (item) {
      const self = this
      deleteDiction({ ids: item.id }).then(res => {
        self.$refs.table.refresh()
      })
    },
    showDio (record) {
      this.dicInfo = record
      this.cellModel = true
    },
    // 搜索
    search (value) {
      console.log(value, 'search')
      this.queryParam = Object.assign(value, this.queryParam)
      this.$refs['table'].refresh()
    },
    // 重置
    reset () {
      this.queryParam = {
        current: 1,
        size: 10
      }
      this.$refs['table'].refresh()
    }
  }
}
</script>
