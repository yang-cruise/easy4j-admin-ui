<template>
  <div class="nav flex align-center">
    <a-tabs
      v-model="activeKey"
      hide-add
      type="editable-card"
      @edit="onEdit"
      @change="changeNav"
      class="flex-1"
    >
      <a-tab-pane
        v-for="item in panes"
        :key="item.name"
        :tab="item.meta.title"
      ></a-tab-pane>
    </a-tabs>
    <a-icon type="ellipsis" class="icon" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeKey: '',
      panes: [],
      newTabIndex: 0,
      panesObj: {}
    }
  },
  watch: {
    $route: {
      handler: function (val) {
        this.activeKey = val.name
        if (!this.panesObj[val.name]) {
          this.updateNav(val)
        }
      },
      deep: true
    }
  },
  created () {
    this.activeKey = this.$route.name
    this.updateNav(this.$route)
  },
  methods: {
    updateNav (nav) {
      this.panes.push(nav)
      this.panesObj[nav.name] = { ...nav }
      this.$store.dispatch('SetKeep', this.$route.name)
    },
    onEdit (targetKey, action) {
      this[action](targetKey)
    },
    remove (targetKey) {
      if (this.panes.length < 2) {
        return
      }
      /* 判断是都要删除当前路由，如果是则展示上一个路由 */
      if (this.activeKey === targetKey) {
        const currentIndex = this.panes.findIndex(ele => ele.name === this.activeKey)
        const targetIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex + 1
        this.activeKey = this.panes[targetIndex].name
      }
      this.panes = this.panes.filter(ele => ele.name !== targetKey)
      this.$store.dispatch('RemoveKepp', targetKey)
      this.$nextTick(() => {
        this.changeNav(this.activeKey)
        delete this.panesObj[targetKey]
      })
    },
    changeNav (activeKey) {
      this.panes.forEach(el => {
        el.name === activeKey && this.$router.push(el.path)
      })
    }
  }
}
</script>

<style scoped lang="less">
.nav {
  background: #fff;
  padding: 0 24px;
}
.icon {
  cursor: pointer;
  transform: rotate(90deg);
}
</style>
