<template>
  <div v-if="showModel">
    <a-modal
      :title="form.title"
      :visible="editModel"
      :footer="null"
      @cancel="handleCancel"
    >
      <a-form @submit="handleSubmit" :form="forms">
        <template v-for="(item, index) in formEidt">
          <a-form-item
            :key="index"
            :label="item.name"
            :labelCol="{lg: {span: 8}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <template v-if="item.inputType === 'normal'">
              <a-input
                v-decorator="[
                  item.decorator,
                  {rules: [{ required: item.required, message: item.message }], initialValue: formSubmit[item.decorator]}
                ]"
                :type="item.type"
                :name="item.decorator"
                :placeholder="item.placeholder" />
            </template>
            <template v-else-if="item.inputType === 'textArea'">
              <a-textarea
                v-decorator="[
                  item.decorator,
                  {rules: [{ required: item.required, message: item.message }], initialValue: formSubmit[item.decorator]}
                ]"
                :placeholder="item.placeholder"
                :auto-size="{ minRows: 2, maxRows: 6 }"
              />
            </template>
          </a-form-item>
        </template>
        <a-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: right"
        >
          <a-button @click="handleCancel" style="margin-right: 8px">取消</a-button>
          <a-button htmlType="submit" type="primary">确定</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
const formEidt = [
  {
    name: '字典名称',
    message: '请输入字典名称',
    decorator: 'name',
    placeholder: '请输入字典名称',
    type: 'text',
    required: true,
    inputType: 'normal',
    value: ''
  },
  {
    name: '字典编码',
    message: '请输入字典编码',
    decorator: 'code',
    placeholder: '例：sys_user.status',
    type: 'text',
    required: true,
    inputType: 'normal'
  },
  {
    name: '显示顺序',
    message: '请输入显示顺序',
    decorator: 'sort',
    placeholder: '请输入显示顺序',
    type: 'Number',
    required: true,
    inputType: 'normal'
  },
  {
    name: '备注',
    message: '请输入备注',
    decorator: 'description',
    placeholder: '请输入备注',
    type: 'textArea',
    required: false,
    inputType: 'textArea'
  }
]
export default {
  props: {
    form: {
      type: Object,
      default: () => {
        return {
          title: '',
          fromData: {},
          type: 'add'
        }
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show (o, n) {
      this.showModel = this.show
      if (this.showModel) {
        this.formEidt.forEach(el => {
          const key = el.decorator
          this.formSubmit[key] = `${this.form.fromData[key]}` ? this.form.fromData[key] : ''
        })
      }
    }
  },
  data () {
    return {
      showModel: false,
      editModel: true,
      forms: this.$form.createForm(this),
      formEidt: formEidt,
      formSubmit: {}
    }
  },
  methods: {
    handleSubmit (e) {
      const self = this
      e.preventDefault()
      this.forms.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          self.resultForm(values)
        }
      })
    },
    handleCancel () {
      this.$emit('closeDicFrom')
    },
    resultForm (item) {
      console.log('resultForm')
      const self = this
      if (self.form.type === 'add') {
        this.$emit('formAddAction', item)
      } else if (self.form.type === 'edit') {
        this.$emit('formEditAction', Object.assign({ id: self.form.fromData.id }, item))
      }
    }
  }
}
</script>
