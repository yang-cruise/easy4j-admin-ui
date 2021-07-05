<template>
  <div class="easy4j-query-form">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <template v-for="(item, index) in formList">
            <a-col
              :md="8"
              :sm="24"
              :key="index"
            >
              <!-- 自定义渲染 -->
              <template v-if="item.scopedSlots && item.scopedSlots.customRender">
                <a-form-item :label="item.label">
                  <slot
                    :name="item.scopedSlots.customRender"
                    :record="queryParam"
                  ></slot>
                </a-form-item>
              </template>
              <a-form-item
                v-else
                :label="item.label"
              >
                <a-select
                  v-if="item.type === 'select' && !item.dict"
                  v-model.trim="queryParam[item.prop]"
                  :placeholder="item.placeholder"
                  :allowClear="item.allowClear || false"
                  :show-search="item.showSearch"
                  option-filter-prop="children"
                >
                  <a-select-option
                    v-for="(optItem, optIndex) in item.option"
                    :value="optItem.value"
                    :key="optIndex"
                  >
                    {{ optItem.title }}
                  </a-select-option>
                </a-select>

                <easy4j-dict-select
                  v-model="queryParam[item.prop]"
                  v-if="item.type === 'select' && item.dict"
                  :dict="item.dict"
                  @change="changeSelect($event, item.prop)"
                  :placeholder="item.placeholder"
                ></easy4j-dict-select>
                <easy4j-city-cascader
                  v-if="item.type === 'city'"
                  @changeCity="changeCity($event, item.prop)"
                  :placeholder="item.placeholder"
                ></easy4j-city-cascader>
                <easy4j-time-picker
                  v-if="item.type === 'timePicker'"
                  v-model="queryParam[item.prop]"
                  :type="item.pickerType || 'date'"
                ></easy4j-time-picker>
                <a-auto-complete
                  v-if="item.type === 'AutoComplete'"
                  v-model.trim="queryParam[item.prop]"
                  :placeholder="item.placeholder"
                  :allowClear="item.allowClear || false"
                  :filter-option="filterOption"
                >
                  <template slot="dataSource">
                    <a-select-option
                      v-for="optItem in item.dataSource"
                      :key="optItem.uuid"
                      :title="optItem.uuid"
                    >{{ optItem.customerName }}</a-select-option>
                  </template>
                </a-auto-complete>
                <a-input
                  v-if="!item.type"
                  v-model="queryParam[item.prop]"
                  :placeholder="item.placeholder"
                />
              </a-form-item>
            </a-col>
          </template>
          <a-col
            :md="(!advanced && 8) || 24"
            :sm="24"
          >
            <span
              class="table-page-search-submitButtons"
              :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
            >
              <a-button
                :loading="loading"
                type="primary"
                @click="confim"
              >查询</a-button>
              <a-button
                style="margin-left: 8px"
                @click="reset"
              >重置</a-button>
              <a
                v-if="formConfig.length > 2"
                @click="toggleAdvanced"
                style="margin-left: 8px"
              >
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
import { Easy4jDictionary, Easy4jTimePicker } from '@/framework/easy4j/components'
export default {
  props: {
    formConfig: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Easy4jDictSelect: Easy4jDictionary,
    Easy4jTimePicker
  },
  data () {
    return {
      queryParam: {},
      // 高级搜索 展开/关闭
      advanced: false
    }
  },
  watch: {
    formConfig: {
      deep: true,
      immediate: true,
      handler (newVal, oldVal) {
        this.initForm()
      }
    },
    queryParam: {
      deep: true,
      handler (val, oldVal) {
        this.$emit('input', val)
      }
    }
  },
  computed: {
    formList () {
      if (this.advanced) {
        return this.formConfig
      } else {
        const list = [...this.formConfig]
        list.length > 2 && (list.length = 2)
        return list
      }
    },
    loading () {
      return this.$store.state.queryFormLoading
    }
  },
  methods: {
    initForm () {
      const obj = {}
      this.formConfig.map(item => {
        item.type === 'select' ? (obj[item.prop] = item.defaultVal || undefined) : obj[item.prop] = item.defaultVal || ''
      })
      this.queryParam = Object.assign({}, obj)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
      )
    },
    changeSelect (value, prop) {
      this.queryParam[prop] = value
    },
    changeCity (city, prop) {
      this.queryParam[prop] = city
    },
    confim () {
      this.$store.dispatch('setQueryFormStatus', true)
      this.$emit('search', this.queryParam)
    },
    reset () {
      this.queryParam = {}
      this.initForm()
      this.$nextTick(() => {
        this.$emit('reset')
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-calendar-picker {
  width: 100%;
}
</style>
