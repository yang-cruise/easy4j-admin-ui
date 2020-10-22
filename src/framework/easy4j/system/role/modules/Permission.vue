<template>
  <a-modal v-model="visible" title="权限配置" on-ok="handleOk">
    <template slot="footer">
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
    </template>
    <div>
      <a-tree
        v-model="defaultCheckeedKeys"
        checkable
        checkStrictly
        :tree-data="treeData"
        :replace-fields="replaceFields"
        @check="onCheck"
      >
        <span slot="title0010" style="color: #1890ff">sss</span>
      </a-tree>
    </div>
  </a-modal>
</template>

<script>
import { getPermissions, getMenuTree, uploadRolePermission } from '@/framework/api/role'

export default {
  props: {
    permissionData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      visible: false,
      loading: false,
      treeData: [],
      replaceFields: {
        key: 'id',
        title: 'name'
      },
      nodeStr: '',
      defaultCheckeedKeys: []
    }
  },
  watch: {
    permissionData: function (newVal) {
      newVal.id && this.getPermissionsList()
    }
  },
  mounted () {
    getMenuTree().then(res => {
      this.treeData = res.data
    })
  },
  methods: {
    getPermissionsList () {
        getPermissions(this.permissionData.id).then(res => {
          this.defaultCheckeedKeys = res.data
     })
    },
    handleOk (e) {
      this.loading = true
      const params = {
        id: this.permissionData.id,
        menuIds: this.nodeStr
      }
      uploadRolePermission(params).then(res => {
        this.visible = false
        this.loading = false
        this.$emit('getRoleList')
      })
    },
    handleCancel (e) {
      this.visible = false
    },
    onCheck (checkedKeys, info) {
      this.nodeStr = checkedKeys.checked.join(',')
    }
  }
}
</script>

<style>

</style>
