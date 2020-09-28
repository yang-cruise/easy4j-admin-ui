<template>
  <a-modal v-model="visible" title="新建角色" on-ok="handleOk">
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
import { addRole } from '@/framework/api/role'
export default {
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
  methods: {
    handleOk (e) {
      this.loading = true
      const params = {
        roleName: this.form.name,
        roleCode: this.form.tip,
        description: this.form.message
      }
      addRole(params).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.visible = false
          this.$emit('getRoleList')
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    handleCancel (e) {
      this.visible = false
    }
  }
}
</script>

<style></style>
