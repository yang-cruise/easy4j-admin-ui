<template>
  <a-modal v-model="visible" title="新增菜单" :destroyOnClose="true">
    <div class="flex flex-wrap border-box w100">
      <div class="margin-bottom-xs">
        <div>
          设置上级菜单
          <a-button class="margin-left-xs" size="small" type="primary" @click="handleShowTree">{{
            defaultExpandAll ? '收起菜单' : '展开菜单'
          }}</a-button>
        </div>
        <a-tree
          v-if="showTree"
          ref="tree"
          v-model="checkedKeys"
          checkable
          :selectedKeys.sync="selectedKeys"
          :checkStrictly="true"
          :tree-data="list"
          :show-line="true"
          :show-icon="false"
          :defaultExpandAll="defaultExpandAll"
          :replaceFields="{ key: 'id', title: 'name' }"
          @check="onCheck"
          @select="onSelect"
        ></a-tree>
      </div>
      <div class="flex-1">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          class="margin-left-xs">
          <a-form-model-item label="菜单名称" prop="name">
            <a-input v-model="form.name" allowClear placeholder="请输入菜单名称" />
          </a-form-model-item>
          <a-form-model-item label="菜单类型" prop="type">
            <a-select v-model="form.type" placeholder="请选择菜单类型" @change="handleChangeType">
              <a-select-option v-for="item in menuType" :key="item.key" :value="item.key">{{
                item.value
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="权限标识">
            <a-input v-model="form.perms" placeholder="如biz:order:view" />
          </a-form-model-item>
          <template v-if="form.type != 'B'">
            <a-form-model-item label="排序" prop="sort">
              <a-input v-model="form.sort" type="number" placeholder="请输入菜单顺序"></a-input>
            </a-form-model-item>
            <a-form-model-item label="路由地址">
              <a-input v-model="form.url" placeholder="请填写路由地址如：/system/menu" />
            </a-form-model-item>
            <a-form-model-item label="菜单图标">
              <a-input v-model="form.icon" placeholder="菜单图标" />
            </a-form-model-item>
          </template>
        </a-form-model>
      </div>
    </div>
    <template slot="footer">
      <a-button @click="handleRest">取消</a-button>
      <a-button type="primary" @click="handleSubmit" class="margin-left-xs">保存</a-button>
    </template>
  </a-modal>
</template>

<script>
import menuType from './menuType.json'
import { getList, insert, update } from '@/framework/api/menu'
export default {
  props: {
    info: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      visible: false,
      showTree: false,
      list: [],
      defaultExpandAll: true,
      checkedKeys: [],
      selectedKeys: [],
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        name: '',
        type: undefined,
        url: '',
        icon: '',
        sort: 1
      },
      rules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择菜单类型', trigger: 'change' }],
        sort: [{ required: true, message: '请输入菜单顺序', trigger: 'blur' }]
      },
      dictType: menuType,
      menuType
    }
  },
  watch: {
    info: {
      deep: true,
      handler: function (val, oldVal) {
        const menuForm = { ...val }
        for (const key in this.form) {
          this.form[key] = menuForm[key] || undefined
        }
        this.checkedKeys = [ val.parentId ]
      }
    }
  },
  created () {
    this.initTreeList()
  },
  methods: {
    show () {
      this.visible = true
    },
    handleSubmit () {
      const params = { ...this.form, parentId: '' }
      if (this.checkedKeys.length) {
        params.parentId = this.checkedKeys[0]
      }
      this.$route.query.id && (params.id = this.$route.query.id)
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.info.id ? this.handleEdit(params) : this.handleInsert(params)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleInsert (params) {
      insert(params)
        .then(res => {
          this.$message.success('添加成功')
          this.$router.replave('/system/menu')
          this.loading = false
          this.visible = false
          this.$emit('updata')
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleEdit (params) {
      params.id = this.info.id
      update(params)
        .then(res => {
          this.loading = false
          this.$message.success('编辑更新成功')
          this.visible = false
          this.$emit('updata')
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleRest () {
      this.$refs.ruleForm.resetFields()
      this.visible = false
    },
    onSelect (arr) {
      this.checkedKeys = arr
    },
    onCheck (event) {
      const { checked } = event
      if (checked.length > 1) {
        checked.shift()
      }
      this.checkedKeys = [...checked]
      this.selectedKeys = [...checked]
    },
    initTreeList () {
      getList()
        .then(res => {
          const list = res.data
          const handleList = (list, disabled = false) => {
            list.map(item => {
              item.disabled = disabled || item.type === 'B'
              if (item.children && item.children.length) {
                item.children = handleList(item.children, item.disabled)
              }
            })
            return list
          }
          this.list = handleList(list)
          this.showTree = true
        })
        .catch(() => {
          this.showTree = true
        })
    },
    handleShowTree () {
      this.showTree = false
      this.defaultExpandAll = !this.defaultExpandAll
      this.$nextTick(() => {
        this.showTree = true
      })
    },
    handleChangeType (val) {
      this.form.component = val === 'D' ? 'RouteView' : ''
    }
  }
}
</script>

<style lang="less" scoped>
.w100 {
  max-height: 60vh;
  overflow: auto;
}
/deep/ .ant-modal {
  max-width: 90%;
}
/deep/ .ant-modal-body {
  padding: 20px;
}
.flex-1 {
  min-width: 200px;
}
</style>
