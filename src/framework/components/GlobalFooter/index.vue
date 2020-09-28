<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="javascript:;">{{ beian }}</a>
    </template>
    <template v-slot:copyright>
      <a href="javascript:;">{{ copyright }}</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'
import { mapState } from 'vuex'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  },
  computed: {
    ...mapState({
      copyright: state => state.setting.copyright,
      beian: state => state.setting.beian
    })
  }
}
</script>
