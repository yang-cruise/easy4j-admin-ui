<template>
  <div v-if="editModel">
    <a-modal
      :title="editFormObj.title"
      v-model="editModel"
    >
      <a-form-model
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
            <a-input
              v-model.trim="editForm[item.decorator]"
              :placeholder="item.placeholder"
              :maxLength="10"
            />
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
  postSysDept,
  putSysDept
} from '@/framework/api/department'

const formEidt = [
  {
    name: '部门名称',
    message: '10个字以内',
    decorator: 'deptName',
    placeholder: '10个字以内',
    type: 'text',
    required: true,
    inputType: 'normal'
  }
]

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    editFormObj: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入部门名称'))
      } else {
        callback()
      }
    }

    const rules = {
      deptName: [{ validator: validatePass, trigger: 'blur' }]
    }

    return {
      editModel: false,
      editForm: {
        deptName: ''
      },
      formEidt,
      rules,
      loading: false
    }
  },
  watch: {
    show (o, n) {
      this.editModel = this.show
    }
  },
  methods: {
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

    addTableRow () {
      const subSysDeptList = this.editFormObj.node.subSysDeptList
      const sort = subSysDeptList ? subSysDeptList.length : 0
      const params = {
        parentId: this.editFormObj.node.id,
        deptName: this.editForm.deptName,
        sort
      }

      this.loading = true
      postSysDept(params).then(res => {
        this.loading = false
        this.$message.info('新增成功')
        this.submitSuccess()
      })
    },

    editTableRow () {
      const params = {
        id: this.editFormObj.node.id,
        parentId: this.editFormObj.node.parentId,
        deptName: this.editForm.deptName,
        sort: this.editFormObj.node.sort
      }

      this.loading = true
      putSysDept(params).then(res => {
        this.loading = false
        this.$message.info('编辑成功')
        this.submitSuccess()
      })
    },

    // 表单提交成功后的操作
    submitSuccess () {
      // 重置表单
      this.editForm.deptName = ''

      this.handleCancel()
      this.$emit('reloadTable')
    },

    // 关闭弹窗
    handleCancel () {
      this.$emit('closeDicFrom')
    }
  }
}
</script>
