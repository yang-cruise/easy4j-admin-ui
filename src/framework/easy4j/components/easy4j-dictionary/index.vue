<template>
  <a-select
    v-if="selects.multiple"
    v-model="selects.multipleValue"
    mode="multiple"
    style="width: 100%"
    :placeholder="selects.placeholder"
    @change="changeSelect"
    option-label-prop="label"
  >
    <template v-for="(item,index) in selects.arr">
      <a-select-option :key="index" :value="item.key" :label="item.value">
        {{ item.value }}
      </a-select-option>
    </template>
  </a-select>
  <a-select
    v-else
    :efault-value="selects.defaultValue"
    :allowClear="true"
    :placeholder="selects.placeholder"
    @change="changeSelect"
    style="min-width:120px">
    <template v-for="(item,index) in selects.arr">
      <a-select-option :key="index" :value="item.key">{{ item.value }}</a-select-option>
    </template>
  </a-select>
</template>

<script>

import { getSelectDiction } from '@/framework/api/dictionaries'

const selects = {
  placeholder: '请选择',
  defaultValue: '',
  multiple: false,
  multipleValue: [],
  arr: [
    // {
    //   dictId: 1005,
    //   gmtCreate: '2020-02-11 14:54:35',
    //   gmtModified: '2020-02-11 14:54:35',
    //   id: 8,
    //   key: 'D',
    //   sort: 1,
    //   value: '目录'
    // }
  ]
}

export default {
  name: 'DicSelect',
  props: {
    selectData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    codeKey: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selects: selects,
      multipleValue: []
    }
  },
  mounted () {
    if (this.codeKey) {
      getSelectDiction({ code: this.codeKey }).then(res => {
        console.log(res)
        selects.arr = res.data
      })
    }
  },
  methods: {
    changeSelect (value) {
      let backArr = ''
      const resultArr = [...this.selects.arr]
      if (this.selects.multiple && value) {
        backArr = []
        value.forEach(el => {
          resultArr.find((valueId, index) => {
            return valueId.key === el ? backArr.push(valueId) : ''
          })
        })
      } else if (value) {
        console.log(resultArr)
        backArr = {
          value: value,
          item: resultArr.find((valueId, index) => {
            return valueId.key === value ? valueId : ''
          })
        }
      }
      this.$emit('changeSelect', backArr)
    }
  }
}
</script>
