<template>
  <div class="easy4j-query-form">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <template v-for="(item, index) in formConfig">
            <a-col v-if="index < 2" :md="8" :sm="24" :key="index">
              <a-form-item :label="item.label">
                <a-select
                  v-if="item.type === 'select' && !item.dict"
                  v-model.trim="queryParam[item.prop]"
                  :placeholder="item.placeholder"
                >
                  <a-select-option v-for="(optItem, optIndex) in item.option" :value="optItem.value" :key="optIndex">
                    {{ optItem.prop }}
                  </a-select-option>
                </a-select>
                <easy4j-dict-select
                  v-if="item.type === 'select' && item.dict"
                  :codeKey="item.dict"
                  @changeSelect="changeSelect($event, item.prop)"
                ></easy4j-dict-select>
                <easy4j-city-cascader
                  v-if="item.type === 'city'"
                  @changeCity="changeCity($event, item.prop)"
                  :placeholder="item.placeholder"
                ></easy4j-city-cascader>
                <easy4j-time-picker v-if="item.type === 'timePicker'" v-model="queryParam[item.prop]" :type="item.pickerType || 'date'"></easy4j-time-picker>
                <a-input v-if="!item.type" v-model="queryParam[item.prop]" :placeholder="item.placeholder" />
              </a-form-item>
            </a-col>
            <a-col v-if="index >= 2 && advanced" :md="8" :sm="24" :key="index">
              <a-form-item :label="item.label">
                <a-select
                  v-if="item.type === 'select' && !item.dict"
                  v-model.trim="queryParam[item.prop]"
                  :placeholder="item.placeholder"
                >
                  <a-select-option v-for="(optItem, optIndex) in item.option" :value="optItem.value" :key="optIndex">
                    {{ optItem.title }}
                  </a-select-option>
                </a-select>
                <easy4j-dict-select
                  v-if="item.type === 'select' && item.dict"
                  :codeKey="item.dict"
                  @changeSelect="changeSelect($event, item.prop)"
                ></easy4j-dict-select>
                <easy4j-city-cascader
                  v-if="item.type === 'city'"
                  @changeCity="changeCity($event, item.prop)"
                  :placeholder="item.placeholder"
                ></easy4j-city-cascader>
                <easy4j-time-picker v-if="item.type === 'timePicker'" :type="item.pickerType || 'date'"></easy4j-time-picker>
                <a-input v-if="!item.type" v-model="queryParam[item.prop]" :placeholder="item.placeholder" />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="(!advanced && 8) || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
            >
              <a-button type="primary" @click="confim">查询</a-button>
              <a-button style="margin-left: 8px" @click="reset">重置</a-button>
              <a v-if="formConfig.length > 2" @click="toggleAdvanced" style="margin-left: 8px">
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
import Easy4jDictSelect from '@/framework/easy4j/components/easy4j-dictionary'
import Easy4jCityCascader from '@/framework/easy4j/components/easy4j-city-cascader'
import Easy4jTimePicker from '@/framework/easy4j/components/easy4j-time-picker'
export default {
  props: {
    formConfig: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Easy4jDictSelect,
    Easy4jCityCascader,
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
      handler () {
        const obj = {}
        this.formConfig.map(item => {
          obj[item.prop] = item.defaultVal || undefined
        })
        this.queryParam = Object.assign({}, obj)
      }
    },
    queryParam: {
      deep: true,
      handler (val, oldVal) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    changeSelect (value, prop) {
      this.queryParam[prop] = value.value
    },
    changeCity (city, prop) {
      this.queryParam[prop] = city
    },
    confim () {
      this.$emit('search', this.queryParam)
    },
    reset () {
      this.queryParam = {}
      this.$emit('reset')
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/ .ant-calendar-picker{
    width: 100%;
  }
</style>
