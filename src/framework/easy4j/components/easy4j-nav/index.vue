<template>
  <div class="nav">
    <a-tabs v-model="activeKey" hide-add type="editable-card" @edit="onEdit" @change="changeNav">
      <a-tab-pane v-for="item in panes" :key="item.name" :tab="item.meta.title"></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeKey: '',
      panes: [],
      newTabIndex: 0
    }
  },
  watch: {
    $route: {
      handler: function (val) {
        this.activeKey = val.name
        this.panes.push(val)
        this.panes = this.objSet(this.panes)
    },
    // 深度观察监听
    deep: true
    }
  },
 created () {
   this.panes.push(this.$route)
   this.activeKey = this.panes[0].name
 },
  methods: {
    onEdit (targetKey, action) {
      this[action](targetKey)
    },
    remove (targetKey) {
      if (this.panes.length < 2) {
        return
      }
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.name === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.name !== targetKey)
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].name
        } else {
          activeKey = panes[0].name
        }
      }
      this.panes = panes
      this.activeKey = activeKey
      this.changeNav(activeKey)
    },
    changeNav (activeKey) {
      this.panes.forEach(el => {
        el.name === activeKey && this.$router.push(el.path)
      })
    },
    objSet (arr) {
      var result = []
      var obj = {}
      for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i].name]) {
          result.push(arr[i])
          obj[arr[i].name] = true
        }
      }
      return result
    }
  }
}
</script>

<style scoped lang="less">
.nav {
  background: #fff;
  padding: 0 24px;
}
</style>
