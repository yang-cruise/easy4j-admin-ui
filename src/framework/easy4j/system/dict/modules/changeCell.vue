<template>
  <div v-if="showModel">
    <a-modal
      title="字典管理"
      :visible="editModel"
      :footer="null"
      @cancel="handleCancel"
      width="80%"
    >
      <a-card>
        <a-table
          :columns="columns"
          :dataSource="data"
          :pagination="false"
          :loading="memberLoading"
          :scroll="{ y: 300 }"
        >
          <template v-for="(col, i) in ['keys', 'value', 'sort']" :slot="col" slot-scope="text, record">
            <a-input
              :key="col"
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              :placeholder="columns[i].title"
              @change="e => handleChange(e.target.value, record.id, col)"
            />
            <template v-else>{{ text }}</template>
          </template>
          <template slot="operation" slot-scope="text, record">
            <template v-if="record.editable">
              <span v-if="record.isNew">
                <a @click="saveRow(record, 'add')">添加</a>
                <a-divider type="vertical" />
                <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key, record)" ok-text="确定" cancel-text="取消">
                  <a>删除</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a @click="saveRow(record, 'save')">保存</a>
                <a-divider type="vertical" />
                <a @click="cancel(record.key)">取消</a>
              </span>
            </template>
            <span v-else>
              <a @click="toggle(record.key)">修改</a>
              <a-divider type="vertical" />
              <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key, record)" ok-text="确定" cancel-text="取消">
                <a>删除</a>
              </a-popconfirm>
            </span>
          </template>
        </a-table>
        <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">添加</a-button>
      </a-card>
    </a-modal>
  </div>
</template>

<script>
import {
  getSingleDiction,
  getDictionInfo,
  deleteDictionInfo,
  addDictionInfo
} from '@/framework/api/dictionaries'
export default {
  name: 'ChangeCell',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    dicInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    show (o, n) {
      this.showModel = this.show
      if (this.showModel) {
        this.singleDiction()
      }
    }
  },
  data () {
    return {
      showModel: false,
      editModel: true,
      memberLoading: false,
      columns: [
        {
          title: '字典值',
          dataIndex: 'keys',
          key: 'keys',
          scopedSlots: { customRender: 'keys' }
        },
        {
          title: '显示文本',
          dataIndex: 'value',
          key: 'value',
          scopedSlots: { customRender: 'value' }
        },
        {
          title: '排序',
          dataIndex: 'sort',
          key: 'sort',
          scopedSlots: { customRender: 'sort' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: [],
      errors: []
    }
  },
  methods: {
    singleDiction () {
      const self = this
      getSingleDiction({ id: self.dicInfo.id }).then(res => {
        const result = res.data
        result.forEach(el => {
          el.editable = false
          el.keys = el.key
        })
        self.data = result
      })
    },
    handleCancel () {
      this.$emit('closeCellFrom')
    },
    handleSubmit (e) {
      e.preventDefault()
    },
    newMember () {
      const length = this.data.length
      this.data.push({
        keys: '',
        key: '',
        value: '',
        sort: '',
        editable: true,
        isNew: true,
        dictId: this.dicInfo.id,
        id: length === 0 ? '1' : (parseInt(this.data[length - 1].id) + 1).toString()
      })
    },
    remove (key, record) {
      const self = this
      deleteDictionInfo({ id: record.id }).then(res => {
        const newData = this.data.filter(item => item.key !== key)
        self.data = newData
      })
    },
    saveRow (record, type) {
      this.memberLoading = true
      console.log(record, 'record')
      const { keys, value, sort } = record
      console.log(keys, value, !sort)
      if (!keys || !value || !(sort.toString())) {
        this.memberLoading = false
        this.$message.error('请填写完整信息。')
        return
      }
      if (type === 'save') {
        record.key = record.keys
        getDictionInfo(record).then(res => {
          const target = this.data.find(item => item.key === keys)
          target.editable = false
          target.isNew = false
          this.memberLoading = false
        })
      }
      if (type === 'add') {
        record.key = record.keys
        addDictionInfo(record).then(res => {
          this.memberLoading = false
          if (res.code === 200) {
            this.singleDiction()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    toggle (key) {
      const target = this.data.find(item => item.key === key)
      target._originalData = { ...target }
      target.editable = !target.editable
    },
    getRowByKey (key, newData) {
      const data = this.data
      return (newData || data).find(item => item.key === key)
    },
    cancel (key) {
      const target = this.data.find(item => item.key === key)
      Object.keys(target).forEach(key => { target[key] = target._originalData[key] })
      target._originalData = undefined
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.id)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    scrollToField (fieldKey) {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`)
      if (labelNode) {
        labelNode.scrollIntoView(true)
      }
    }
  }
}
</script>
