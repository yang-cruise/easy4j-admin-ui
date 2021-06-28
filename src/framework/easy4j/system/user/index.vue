<template>
  <page-header-wrapper :title="false">
    <div class="page-header-index-wide page-header-wrapper-grid-content-main">
      <a-row :gutter="24">
        <a-col :sm="24" :md="24" :lg="5">
          <a-card :bordered="false">
            <a-spin :spinning="spinning">
              <a-tree
                v-if="treeData.length"
                ref="aTree"
                :key="new Date().getTime()"
                :tree-data="treeData"
                :replace-fields="replaceFields"
                :default-selected-keys="defaultSelectdeKey"
                default-expand-all
                class="custom-tree"
                draggable
                @drop="onDrop"
                @expand="onExpand"
                @select="onSelect"
              >
                <template slot="custom" slot-scope="item">
                  <span
                    class="node-title mar-r10"
                  >
                    {{ item.deptName }}
                  </span>

                  <div>
                    <!-- 新增子部门 -->
                    <span
                      v-permission="'sys:dept:insert'"
                      class="icon-wrap mar-r14"
                      @click.stop="handleAdd(item)"
                    >
                      <a-icon type="plus" />
                    </span>

                    <!-- 编辑当前部门 -->
                    <span
                      v-permission="'sys:dept:update'"
                      class="icon-wrap mar-r14"
                      @click.stop="handleEdit(item)"
                    >
                      <a-icon type="edit" />
                    </span>

                    <!-- 删除当前部门 -->
                    <span
                      v-permission="'sys:dept:delete'"
                      class="icon-wrap"
                      @click.stop="handleDelete(item, $event)"
                    >
                      <a-popconfirm
                        :title="`是否确认删除“${ item.deptName }”？`"
                        ok-text="确定"
                        cancel-text="取消"
                        placement="topRight"
                        @confirm="confirmDelete(item)"
                      >
                        <a-icon type="delete" />
                      </a-popconfirm>
                    </span>
                  </div>
                </template>
              </a-tree>
            </a-spin>
          </a-card>
        </a-col>
        <a-col :sm="24" :md="24" :lg="19">
          <a-card :bordered="false">
            <easy4j-query-form
              :formConfig="formData"
              @search="search"
              @reset="reset"
            ></easy4j-query-form>

            <div class="mar-b16">
              <a-button
                v-permission="'sys:user:insert'"
                type="primary"
                icon="plus"
                @click="addRow"
              >新增用户</a-button>
            </div>

            <a-table
              ref="table"
              size="default"
              :rowKey="record => record.id"
              :columns="columns"
              :loading="loading"
              :data-source="tableData"
              :pagination="pagination"
              @change="handleTableChange"
            >
              <span slot="dept" slot-scope="dept">
                {{ dept.deptName }}
              </span>
              <span slot="roles" slot-scope="roles">
                {{ roles.map(item => item.roleName).join() }}
              </span>
              <span slot="status" slot-scope="status, record">
                <a-popconfirm
                  :title="`是否确认${ status === 1 ? '冻结' : '激活' }账号“${ record.account }”`"
                  ok-text="确定"
                  cancel-text="取消"
                  placement="top"
                  @confirm="confirmChangeStatus(record)"
                >
                  <a-switch
                    :checked="`${ status }` === '1'"
                  />
                </a-popconfirm>
              </span>
              <span slot="operation" slot-scope="operation, record">
                <a
                  v-permission="'sys:user:update'"
                  @click="editRow(record)"
                >编辑</a>
                <a-divider v-permission="'sys:user:update'" type="vertical" />

                <a-popconfirm
                  v-permission="'sys:user:delete'"
                  title="是否确认删除此条记录？"
                  ok-text="确定"
                  cancel-text="取消"
                  placement="top"
                  @confirm="confirmDeleteUser(record)"
                >
                  <a v-permission="'sys:user:delete'">删除</a>
                </a-popconfirm>

                <a-divider
                  v-if="hasPermission('sys:user:delete')"
                  type="vertical"
                />

                <a
                  @click="resetPassword(record)"
                >重置密码</a>
              </span>
            </a-table>
          </a-card>
        </a-col>
      </a-row>

      <!-- 编辑部门 -->
      <edit-department
        :show="editDepartModel"
        :editFormObj="editDepartFormObj"
        @closeDicFrom="editDepartModel = false"
        @reloadTable="reloadTree"
      />

      <!-- 编辑用户 -->
      <edit-user
        :show="editUserModel"
        :editFormObj="editFormObj"
        :treeData="treeData"
        @closeDicFrom="editUserModel = false"
        @reloadTable="reloadTable"
      />

      <!-- 重置密码 -->
      <edit-password
        :show="editPasswordModel"
        :editFormObj="editPasswordFormObj"
        @closeDicFrom="editPasswordModel = false"
      />
    </div>
  </page-header-wrapper>
</template>

<script>
import {
  getSysDeptsTree,
  deleteSysDept,
  putSysDept
} from '@/framework/api/department'

import {
  getSysUsersPage,
  putSysUserStatus,
  deleteSysUser
} from '@/framework/api/user'

import userTableColumn from './config/user-table-column'
import formData from './config/user-table-form'

import {
  hasPermission
} from '@/framework/utils/util'

import {
  Tree as ATree,
  Input as AInput
} from 'ant-design-vue'

import Easy4jQueryForm from '@/framework/easy4j/components/easy4j-query-form'
import EditDepartment from './modals/edit-department'
import EditUser from './modals/edit-user'
import EditPassword from './modals/edit-password'

import AIcon from 'ant-design-vue/es/icon'

export default {
  name: 'SysUser',
  components: {
    ATree,
    AIcon,
    AInput,
    EditUser,
    EditDepartment,
    EditPassword,
    Easy4jQueryForm
  },
  props: {},
  data () {
    return {
      hasPermission,
      formData,
      spinning: false,
      selectedKeys: [],
      treeData: [],
      replaceFields: {
        children: 'subSysDeptList',
        title: 'deptName',
        key: 'id',
        value: 'id'
      },
      defaultSelectdeKey: [],
      editDepartFormObj: {
        type: '',
        title: '',
        value: ''
      },
      columns: userTableColumn,
      // 查询条件参数
      queryParam: {
        account: '',
        realname: '',
        mobile: '',
        email: '',
        status: ''
      },
      editDepartModel: false,
      editUserModel: false,
      editPasswordModel: false,
      editFormObj: {
        type: '',
        title: '',
        row: {}
      },
      editPasswordFormObj: {
        type: '',
        title: '',
        row: {}
      },
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      loading: false
    }
  },
  computed: {},
  watch: {},
  mounted () {
    this.getSysDeptsTree()
  },
  methods: {
    // 获取部门数据
    getSysDeptsTree () {
      this.spinning = true
      const vm = this
      getSysDeptsTree().then(res => {
        this.spinning = false
        if (res.code !== 200) {
          return
        }

        const theData = vm.setTreeSlot(res.data)
        vm.treeData = theData

        // 默认展开第一个节点
        vm.treeData.length && (vm.defaultSelectdeKey = [vm.treeData[0].id])

        // 刷新表格数据
        vm.getTableList()
      }).catch(() => {
        this.spinning = false
      })
    },

    // 加自定义展示图标
    setTreeSlot (treeData) {
      const setCustom = (subSysDeptList) => {
        for (const item of subSysDeptList) {
          this.$set(item, 'scopedSlots', { title: 'custom' })

          if (item.subSysDeptList && item.subSysDeptList.length) {
            setCustom(item.subSysDeptList)
          }
        }
      }

      setCustom(treeData)
      return treeData
    },

    // 获取部门下的用户
    getTableList () {
      const params = {
        deptId: this.defaultSelectdeKey[0],
        account: this.queryParam.account,
        realname: this.queryParam.realname,
        mobile: this.queryParam.mobile,
        email: this.queryParam.email,
        status: this.queryParam.status,
        current: this.pagination.current,
        size: this.pagination.pageSize
      }

      this.loading = true
      getSysUsersPage(params).then(res => {
        this.loading = false
        const result = res.data
        this.tableData = result.records
        this.pagination = {
          current: result.current,
          pageSize: result.size,
          total: result.total
        }
      }).catch(() => {
        this.loading = false
      })
    },

    handleTableChange (pagination) {
      this.pagination = { ...pagination }
      this.reloadTable()
    },

    // 搜索
    search (value) {
      this.queryParam = { ...value }
      this.reloadTable()
    },

    // 重置
    reset () {
      this.queryParam = {}
      this.reloadTable()
    },

    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },

    onSelect (selectedKeys, info) {
      this.defaultSelectdeKey = selectedKeys
      this.reloadTable()
    },

    handleAdd (item, event) {
      this.editDepartFormObj.type = 'add'
      this.editDepartFormObj.title = '添加子部门'
      this.editDepartFormObj.node = item

      this.editDepartModel = true
    },

    handleEdit (item) {
      this.editDepartFormObj.type = 'edit'
      this.editDepartFormObj.title = '编辑部门名称'
      this.editDepartFormObj.node = item

      this.editDepartModel = true
    },

    handleDelete (item, event) {
      event.preventDefault()
    },

    // 确认删除
    confirmDelete (item) {
      this.deleteSysDept(item)
    },

    deleteSysDept (item) {
      deleteSysDept({ ids: item.id }).then(res => {
        this.$message.info('删除成功')
        this.reloadTree()
      })
    },

    reloadTree () {
      this.getSysDeptsTree()
    },

    resetForm () {
      this.$refs.queryParam.resetFields()
      this.reloadTable()
    },

    addRow () {
      this.editFormObj.type = 'add'
      this.editFormObj.title = '新增用户'
      this.editFormObj.row = {}

      this.editUserModel = true
    },

    editRow (record) {
      this.editFormObj.type = 'edit'
      this.editFormObj.title = '编辑用户'
      this.editFormObj.row = { ...record }

      this.editUserModel = true
    },

    resetPassword (record) {
      this.editPasswordFormObj.type = 'password'
      this.editPasswordFormObj.title = '重置密码'
      this.editPasswordFormObj.row = { ...record }

      this.editPasswordModel = true
    },

    // 确认切换状态
    confirmChangeStatus (record) {
      this.putSysUserStatus(record)
    },

    // 切换状态
    putSysUserStatus (record) {
      console.log(record, 'record')
      const params = {
        status: record.status === 1 ? 2 : 1,
        userId: record.id
      }

      putSysUserStatus(params).then(res => {
        this.$message.info('切换成功')
        this.reloadTable()
      })
    },

    // 确认删除
    confirmDeleteUser (record) {
      this.deleteSysUser(record.id)
    },

    // 删除用户
    deleteSysUser (ids) {
      deleteSysUser({ ids }).then(res => {
        this.$message.info('删除成功')
        this.reloadTable()
      })
    },

    // 刷新表格
    reloadTable () {
      this.getTableList()
    },

    onDrop (data) {
      // 拖拽的节点
      const dragNode = data.dragNode
      const dragNodeData = dragNode.dataRef

      // 放置的节点
      const dropNode = data.node
      const dropNodeData = dropNode.dataRef

      // 获取父节点
      let parentId = -1
      if (data.dropToGap) {
        // 放在间隔
        parentId = dropNodeData.parentId
      } else {
        // 放在内部
        parentId = dropNodeData.id
      }

      const params = {
        id: dragNodeData.id,
        deptName: dragNodeData.deptName,
        sort: data.dropPosition,
        parentId
      }

      this.putSysDept(params)
    },

    putSysDept (params) {
      this.spinning = true
      putSysDept(params).then(res => {
        this.spinning = false

        this.getSysDeptsTree()
      }).catch(() => {
        this.spinning = false
      })
    }
  }
}
</script>

<style scoped lang='less'>
  .mar-r10 {
    margin-right: 10px;
  }

  .mar-r14 {
    margin-right: 14px;
  }

  .mar-b16 {
    margin-bottom: 16px;
  }

  /deep/ .custom-tree .ant-tree-node-content-wrapper {
    display: inline-block;
    width: calc(100% - 24px);
    .ant-tree-title {
      display: flex;
      justify-content: space-between;
    }
  }

  /deep/ .custom-tree .node-title {
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
