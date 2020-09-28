const formData = [
  {
    label: '账号',
    prop: 'account',
    placeholder: '请输入账号'
  },
  {
    label: '真实姓名',
    prop: 'realname',
    placeholder: '请输入真实姓名'
  },
  {
    label: '手机',
    prop: 'mobile',
    placeholder: '请输入手机'
  },
  {
    label: '邮箱',
    prop: 'email',
    placeholder: '请输入邮箱'
  },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    dict: 'user_status',
    placeholder: '请选择状态'
  }
]

export default formData
