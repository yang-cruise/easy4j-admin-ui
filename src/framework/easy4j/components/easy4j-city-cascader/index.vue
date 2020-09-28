<template>
  <a-cascader :options="cityList" @change="onChange" :placeholder="placeholder" />
</template>

<script>
import cityList from './city.js'
export default {
  props: {
    placeholder: {
      type: String,
      default: () => '请选择地区'
    }
  },
  data () {
    return {
      cityList
    }
  },
  methods: {
    onChange (value) {
      this.$emit('changeCity', value)
    }
  }
}
</script>

<style>

</style>
