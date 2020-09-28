<template>
  <a-modal v-model="visible" title="编辑角色" on-ok="handleOk">
    <template slot="footer">
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
    </template>
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-form-model-item label="角色名称" prop="name">
        <a-input v-model="form.name" placeholder="请输入角色名称" />
      </a-form-model-item>
      <a-form-model-item label="角色标识" prop="tip">
        <a-input v-model="form.tip" placeholder="请输入角色标识" />
      </a-form-model-item>
      <a-form-model-item label="备注" prop="message">
        <a-input v-model="form.message" placeholder="请输入备注" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { uploadRole } from '@/framework/api/role'
export default {
  props: {
    editData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      visible: false,
      loading: false,
      form: {
        name: '',
        tip: '',
        message: ''
      },
      rules: {
        name: { required: true, message: '请输入角色名称', trigger: 'blur' },
        tip: { required: true, message: '请输入角色标识', trigger: 'blur' }
      }
    }
  },
  watch: {
    editData: function (newVal, oldVal) {
      this.form.name = newVal.roleName
      this.form.tip = newVal.roleCode
      this.form.message = newVal.description
    }
  },
  methods: {
    handleOk (e) {
      this.loading = true
      const params = {
        id: this.editData.id,
        roleName: this.form.name,
        roleCode: this.form.tip,
        description: this.form.message
      }
      uploadRole(params).then(res => {
        this.visible = false
        this.loading = false
        this.$emit('getRoleList')
      })
    },
    handleCancel (e) {
      this.visible = false
    }
  }
}
</script>

<style></style>
