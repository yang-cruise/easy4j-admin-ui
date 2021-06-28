<template>
  <page-header-wrapper :title="false">
    <a-card :border="false">
      <easy4j-query-form :formConfig="formData" @search="search" @reset="reset"></easy4j-query-form>
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新增角色</a-button>
      </div>
      <s-table ref="table" size="default" :columns="columns" :data="loadData" :rowKey="record => record.id">
        <span slot="message" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="是否确认删除此条记录？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="confirmDelete(record)"
            >
              <a href="#">删除</a>
            </a-popconfirm>
            <a-divider type="vertical" />
            <a @click="handlePermission(record)">权限配置</a>
          </template>
        </span>
      </s-table>
      <add-role ref="AddRole" @getRoleList="getRoleList"></add-role>
      <edit-role ref="EditRole" :editData="editData" @getRoleList="getRoleList"></edit-role>
      <action-permission
        ref="ActionPermission"
        :permissionData="permissionData"
        @getRoleList="getRoleList"
      ></action-permission>
    </a-card>
  </page-header-wrapper>
</template>
<script>
import { getRole, deleteRole } from '@/framework/api/role'

import { STable, Ellipsis } from '@/framework/components'
import AddRole from './modules/AddRole.vue'
import EditRole from './modules/EditRole.vue'
import ActionPermission from './modules/Permission.vue'
import Easy4jQueryForm from '@/framework/easy4j/components/easy4j-query-form'

const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName'
  },
  {
    title: '角色标识',
    dataIndex: 'roleCode'
  },
  {
    title: '备注',
    dataIndex: 'description',
    scopedSlots: { customRender: 'message' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
const formData = [
  {
    label: '角色名称',
    prop: 'roleName',
    placeholder: '请输入角色名称'
  },
  {
    label: '角色标识',
    prop: 'roleCode',
    placeholder: '请输入角色标识'
  }
]
export default {
  name: 'SysRole',
  components: {
    STable,
    Ellipsis,
    AddRole,
    EditRole,
    ActionPermission,
    Easy4jQueryForm
  },
  data () {
    return {
      formData: formData,
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // seach data
      queryParam: {
        roleName: '',
        roleCode: ''
      },
      // table data
      columns: columns,
      loadData: parameter => {
        const requestParameters = {
          current: parameter.pageNo,
          size: parameter.pageSize,
          ...this.queryParam
        }
        return getRole(requestParameters).then(res => {
          return {
            data: res.data.records,
            pageSize: parameter.pageSize,
            pageNo: parameter.pageNo,
            totalPage: res.data.pages,
            totalCount: res.data.total
          }
        })
      },
      // edit data
      editData: {},
      permissionData: {}
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    getRoleList () {
      this.$refs['table'].refresh()
    },
    handleEdit (record) {
      this.editData = { ...record }
      this.$refs['EditRole'].visible = true
    },
    // 权限配置
    handlePermission (record) {
      this.permissionData = { ...record }
      this.$refs['ActionPermission'].visible = true
    },
    // 新建角色
    handleAdd () {
      this.$refs['AddRole'].visible = true
    },
    // 删除角色
    confirmDelete (record) {
      deleteRole(record.id).then(res => {
        this.$refs['table'].refresh()
      })
    },
    // 搜索
    search (value) {
      this.queryParam = { ...value }
      this.$refs['table'].refresh()
    },
    // 重置
    reset () {
      this.queryParam = {}
      this.$refs['table'].refresh()
    }
  }
}
</script>
