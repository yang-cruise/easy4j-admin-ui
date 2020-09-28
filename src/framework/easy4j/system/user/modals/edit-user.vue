<template>
  <!-- v-if="showModel" -->
  <div >
    <a-modal
      :title="editFormObj.title"
      v-model="editModel"
      :afterClose="handleCancel"
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
            <template v-if="item.inputType === 'normal'">
              <a-input
                :type="item.type"
                :name="item.decorator"
                :placeholder="item.placeholder"
                :disabled="item.disabled || false"
                v-model.trim="editForm[item.decorator]"
              />
            </template>

            <template v-else-if="item.inputType === 'password'">
              <a-input-search
                v-model.trim="editForm[item.decorator]"
                :placeholder="item.placeholder"
                @search="generatePassword"
              >
                <a-button slot="enterButton">
                  随机密码
                </a-button>
              </a-input-search>
            </template>

            <template v-else-if="item.inputType === 'radio'">
              <a-radio-group v-model="editForm[item.decorator]">
                <a-radio
                  v-for="radioItem in item.options"
                  :key="radioItem.value"
                  :value="radioItem.value"
                >
                  {{ radioItem.text }}
                </a-radio>
              </a-radio-group>
            </template>

            <template v-else-if="item.inputType === 'select'">
              <a-select
                v-model.trim="editForm[item.decorator]"
                mode="multiple"
                :placeholder="item.placeholder"
              >
                <a-select-option
                  v-for="selectItem in item.options"
                  :key="selectItem.value"
                  :value="selectItem.value"
                >
                  {{ selectItem.text }}
                </a-select-option>
              </a-select>
            </template>

            <template v-else-if="item.inputType === 'treeSelect'">
              <a-tree-select
                v-if="item.options.length"
                v-model.trim="editForm[item.decorator]"
                ref="treeSelect"
                style="width: 100%"
                :tree-data="item.options"
                tree-default-expand-all
                :placeholder="item.placeholder"
                :replace-fields="replaceFields"
                :search-placeholder="item.placeholder"
              />
            </template>
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
  getSysRoles,
  postSysUser,
  putSysUser
} from '@/framework/api/user'

import {
  getSysDeptsTree
} from '@/framework/api/department'

// 表单项配置
import oriFormEidt from '../config/user-edit-form'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    editFormObj: {
      type: Object,
      default: () => {}
    },
    treeData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    // 验证手机号
const phone = (val) => {
  /* eslint-disable */
  return (/^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9])|(16[6]))\d{8}$/.test(val))
}

// 验证邮箱
const email =(val) => {
  /* eslint-disable */
  return (/^([a-zA-Z0-9]+[-|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val))
}

// 验证密码
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

// 验证邮箱号
const validateMail = (rule, value, callback) => {
  if (value === '') {
    callback()
  } else {
    if (!email(value)) {
      callback(new Error('请输入正确的邮箱格式'))
    }

    callback()
  }
}

// 验证手机号
const validateMobile = (rule, value, callback) => {
  if (value === '') {
    callback()
  } else {
    if (!phone(value)) {
      callback(new Error('请输入正确的手机号格式'))
    }

    callback()
  }
}

const rules = {
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ validator: validatePass, required: true, trigger: 'blur' }],
  mobile: [{ validator: validateMobile, trigger: 'blur' }],
  email: [{ validator: validateMail, trigger: 'blur' }],
  roleIds: [{ required: true, message: '请选择角色，可多选', trigger: 'change' }],
  deptId: [{ required: true, message: '请选择部门', trigger: 'change' }]
}

// 表单字段
const oriEditForm = {
        account: '',
        realname: '',
        sex: 'M',
        mobile: '',
        email: '',
        roleIds: [],
        deptId: undefined,
        password: ''
      }

    return {
      showModel: false,
      editModel: false,
      editForm: {},
      oriFormEidt,
      formEidt: [],
      rules,
      oriEditForm,
      replaceFields: {
        children: 'subSysDeptList',
        title: 'deptName',
        key: 'nodeKey',
        value: 'id'
      },
      loading: false
    }
  },
  watch: {
    show (o, n) {
      this.editModel = this.show
    },

    editFormObj: {
      deep: true,
      handler () {
        this.formEidt = [...this.oriFormEidt]
        if (this.editFormObj.type === 'edit') {
          this.editForm = { ...this.editFormObj.row }
          this.setOptions('account', 'disabled', true)
          this.formEidt.splice(1, 1)

          // 解析不适配数据
          const roleIds = this.editForm.roles.map(item => item.id)
          this.$set(this.editForm, 'roleIds', roleIds)
          this.$set(this.editForm, 'deptId', this.editForm.dept ? this.editForm.dept.id : '')
        } else {
          this.editForm = { ...this.oriEditForm }
          this.setOptions('account', 'disabled', false)
        }

        this.getSysRoles()
        this.setDepartOptions()
      }
    }
  },
  mounted () {

  },
  methods: {
    // 获取角色数据
    getSysRoles () {
      const vm = this
      getSysRoles().then(res => {
        const result = [...res.data]
        const options = result.map(item => {
          return {
            text: item.roleName,
            value: item.id
          }
        })
        vm.setOptions('roleIds', 'options', options)
      })
    },

    // 获取部门数据
    getSysDeptsTree () {
      const vm = this
      getSysDeptsTree().then(res => {
        const result = [...res.data]
        vm.setOptions('deptId', 'options', result)
      })
    },

    // 处理tree上的key，否则与页面上部门树渲染冲突
    setTreeSlot (treeData) {
      const setCustom = (subSysDeptList) => {
        for (const item of subSysDeptList) {
          this.$set(item, 'nodeKey', `nodeKey${ item.id }`)

          if (item.subSysDeptList && item.subSysDeptList.length) {
            setCustom(item.subSysDeptList)
          }
        }
      }

      setCustom(treeData)
      return treeData
    },

    // 部门下拉数据赋值
    setDepartOptions () {
      const result = [...this.treeData]
      this.setOptions('deptId', 'options', this.setTreeSlot(result))
    },

    // 给表单项有下拉框的下拉数据赋值
    setOptions (prop, innerProp, list) {
      for (const item of this.formEidt) {
        if (item.decorator === prop) {
          this.$set(item, innerProp, list)
          return
        }
      }
    },

    // 表单提交
    handleSubmit () {
      const vm = this
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          return
        }

        if (vm.editFormObj.type === 'add') {
          vm.addTableRow()
        } else {
          vm.editTableRow()
        }
      })
    },

    // 新增
    addTableRow () {
      const params = {
        account: this.editForm.account,
        email: this.editForm.email,
        mobile: this.editForm.mobile,
        realname: this.editForm.realname,
        roleIds: this.editForm.roleIds,
        sex: this.editForm.sex,
        password: this.editForm.password,
        deptId: this.editForm.deptId
      }

      this.loading = true
      postSysUser(params).then(res => {
        this.loading = false
        this.$message.info('新增成功')
        this.submitSuccess()
      })
    },

    // 编辑
    editTableRow () {
      const params = {
        id: this.editForm.id,
        email: this.editForm.email,
        mobile: this.editForm.mobile,
        realname: this.editForm.realname,
        roleIds: this.editForm.roleIds,
        sex: this.editForm.sex,
        password: this.editForm.password,
        deptId: this.editForm.deptId
      }

      this.loading = true
      putSysUser(params).then(res => {
        this.loading = false
        this.$message.info('编辑成功')
        this.submitSuccess()
      })
    },

    // 表单提交成功后的操作
    submitSuccess () {
      // 重置表单
      this.editForm = { ...this.oriEditForm }

      this.handleCancel()
      this.$emit('reloadTable')
    },

    // 关闭弹窗
    handleCancel () {
      this.$emit('closeDicFrom')
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

    // 生成密码
    generatePassword () {
      const password = this.generateCode(6)
      this.$set(this.editForm, 'password', password)
    }
  }
}
</script>
