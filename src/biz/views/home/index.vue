<template>
  <page-header-wrapper :title="false">
    holle easy4j
    <div class="flex">
      <easy4j-dictionary v-model="dict" dict="sys.cs1" placeholder="请选择字典" style="width: 200px;" />
    </div>
  </page-header-wrapper>
</template>

<script>
import { Easy4jDictionary } from '@/framework/easy4j/components'
export default {
  metaTitle: 'hello easy4j',
  name: 'Home',
  components: {
    Easy4jDictionary
  },
  data () {
    return {
      dict: ''
    }
  }
}
</script>
