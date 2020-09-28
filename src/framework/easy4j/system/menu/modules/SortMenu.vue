<template>
  <a-modal
    v-model="visible"
    title="菜单排序">
    <div class="box">
      <a-tree
        v-if="showTree"
        draggable
        destroyOnClose
        :expandedKeys.sync="expandedKeys"
        :tree-data="list"
        :replaceFields="{key: 'id', title:'name'}"
        @dragenter="onDragenter"
        @drop="onDrop"
        @select="onSelect">
      </a-tree>
    </div>
    <template slot="footer">
      <a-button @click="handleShowTree">{{ defaultExpandAll ? '收起菜单' : '展开菜单' }}</a-button>
      <a-button key="back" @click="close()">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
    </template>
  </a-modal>
</template>

<script>
  // import menuData from '../data.json'
  import { getList, sort } from '@/framework/api/menu'
  export default {
    data () {
      return {
        visible: false,
        confirmLoading: false,
        list: [],
        expandedKeys: [],
        allKeys: [],
        datas: [], // 暂存的自己及父级的id 层级数组 例如：[爷爷级Id, 父级Id, 自己Id]
        loading: false,
        showTree: true,
        defaultExpandAll: true
      }
    },
    created () {
      this.initTreeList()
    },
    methods: {
      initTreeList () {
        getList().then(res => {
          const list = res.data
          const handleList = (arr) => {
            arr.map(item => {
              this.expandedKeys.push(item.id)
              if (item.children && item.children.length) {
                handleList(item.children)
              }
            })
          }
          handleList(list)
          this.list = list
          this.allKeys = [...this.expandedKeys]
        })
      },
      handleOk () {
        this.loading = true
        const params = {
          dtoList: this.dtoList()
        }
        console.log(params)
        sort(this.dtoList()).then(res => {
          this.$message.success('操作成功')
          this.$emit('updata')
          this.loading = false
          this.close()
        }).catch(() => {
          this.loading = false
        })
      },
      dtoList () {
        const ids = []
        const handleList = (arr) => {
          arr.map((item, index) => {
            ids.push({ menuId: item.id, sort: index + 1 })
            if (item.children && item.children.length) {
              handleList(item.children)
            }
          })
        }
        handleList(this.list)
        return ids
      },
      show () {
        this.visible = true
      },
      close () {
        this.visible = false
      },
      onSelect (arr, info) {
        const itemKey = info.node.eventKey
        if (this.expandedKeys.includes(itemKey)) {
          const index = this.expandedKeys.indexOf(itemKey)
          this.expandedKeys.splice(index, 1)
        } else {
          this.expandedKeys.push(itemKey)
        }
      },
      onDragenter (info) {
        // console.log(info)
      },
      onDrop (info) {
        console.log(info)
        const dropKey = info.node.eventKey // 目标节点的id
        const dragKey = info.dragNode.eventKey // 拖拽节点的id
        const dropPos = info.node.pos.split('-')
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
        const loop = (data, key, callback) => {
          data.forEach((item, index, arr) => {
            if (item.id === key) {
              return callback(item, index, arr)
            }
            if (item.children) {
              return loop(item.children, key, callback)
            }
          })
        }
        const data = [...this.list]
        let dragObj = null
        if (!info.dropToGap) {
          return false
        } else if (
          (info.node.children || []).length > 0 &&
          info.node.expanded &&
          dropPosition === 1
        ) {
          return false
        } else {
          // 拖拽节点数据
          const dragKeyData = this.getFirstData(dragKey)
          // 目标节点数据
          const dropKeyData = this.getFirstData(dropKey)
          // 只允许在同父级id下进行拖动
          if (dragKeyData.parentId === dropKeyData.parentId) {
            loop(data, dragKey, (item, index, arr) => {
              arr.splice(index, 1)
              dragObj = item
            })
            console.log(dragObj)
            let ar, i
            loop(data, dropKey, (item, index, arr) => {
              ar = arr
              i = index
            })
            if (dropPosition === -1) {
              ar.splice(i, 0, dragObj)
            } else {
              ar.splice(i + 1, 0, dragObj)
            }
            this.list = data
          }
        }
      },
      // 获得自己的数据
      getFirstData (key) {
        let selectItem = {}
        const loop = (arr) => {
          arr.map(item => {
            if (item.id === key) {
              selectItem = { ...item }
              return false
            } else {
              if (item.children && item.children.length) {
                loop(item.children)
              }
            }
          })
        }
        loop(this.list)
        return selectItem
      },
      handleShowTree () {
        this.defaultExpandAll = !this.defaultExpandAll
        this.expandedKeys = this.defaultExpandAll ? [...this.allKeys] : []
      }
    }
  }
</script>

<style lang="less" scoped>
  .box {
    max-height: 60vh;
    overflow: auto;
  }
</style>
