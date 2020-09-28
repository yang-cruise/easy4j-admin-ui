const columns = [
  {
    title: '账号',
    dataIndex: 'account'
  },
  {
    title: '真实姓名',
    dataIndex: 'realname'
  },
  {
    title: '部门',
    dataIndex: 'dept',
    scopedSlots: { customRender: 'dept' }
  },
  {
    title: '角色',
    dataIndex: 'roles',
    scopedSlots: { customRender: 'roles' }
  },
  {
    title: '手机',
    dataIndex: 'mobile'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '创建时间',
    dataIndex: 'gmtCreate'
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

export default columns
