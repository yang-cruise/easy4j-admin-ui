<template lang="">
  <div class="bg-white border-box padding-sm">
    <easy4j-query-form
      v-model="pama"
      :formConfig="formData"
      @search="handleQuery"
      @reset="handleRest"
      :actionMore="'sys:business:log:select'"
    ></easy4j-query-form>

    <s-table
      ref="tableOrder"
      size="default"
      :rowKey="(record) => record.id"
      :columns="columns"
      :data="loadData"
    >
      <template slot="list" slot-scope="text">
        <div v-for="(item, index) in text" :key="index">
          {{ item }}
        </div>
      </template>
    </s-table>
  </div>
</template>

<script>
import { sysBusinessLogs } from '@/framework/api/log'
import { STable } from '@/framework/components'
import Easy4jQueryForm from '@/framework/easy4j/components/easy4j-query-form'
export default {
  components: {
    STable,
    Easy4jQueryForm
  },
  data () {
    return {
      columns: [
        {
          title: '功能模块',
          dataIndex: 'modular'
        },
        {
          title: '变更详情',
          dataIndex: 'list',
          scopedSlots: { customRender: 'list' }
        },
        {
          title: '操作人姓名',
          dataIndex: 'operatorName'
        },
        {
          title: '请求IP',
          dataIndex: 'requestIp'
        },
        {
          title: '请求参数',
          dataIndex: 'requestParams'
        },
        {
          title: '请求url',
          dataIndex: 'requestUri'
        },
        {
          title: '响应参数',
          dataIndex: 'responseParams'
        },
        {
          title: '创建时间',
          dataIndex: 'gmtCreate'
        },
        {
          title: '更新时间',
          dataIndex: 'gmtModified'
        }
      ],
      formData: [
        { label: '', prop: 'modular', placeholder: '功能模块' }
      ],
      pama: {
        current: 1,
        size: 10,
        modular: ''
      },
      bridgeOta: '',
      loadData: (params) => {
        Object.assign(params, this.pama)
        return sysBusinessLogs(params).then(res => {
          console.log(res, 'res')
          res = res.data
          return {
            data: res.records,
            pageNo: res.current,
            totalCount: res.total
          }
        }).catch(() => {
          this.$message.error('网路异常，请刷新重试')
          return {
            data: [],
            pageNo: 0,
            totalCount: 0
          }
        })
      }
    }
  },
  created () {
  },
  methods: {
    handleRest () {
      this.$refs.tableOrder.refresh(true)
    },
    handleQuery () {
      this.$refs.tableOrder.refresh(true)
    }
  }
}
</script>
