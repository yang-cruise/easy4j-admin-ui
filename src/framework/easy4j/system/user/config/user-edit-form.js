const oriFormEidt = [{
    name: '账号',
    message: '请输入账号',
    decorator: 'account',
    placeholder: '请输入账号',
    type: 'text',
    required: true,
    inputType: 'normal',
    disabled: false
  },
  {
    name: '初始密码',
    message: '请输入密码',
    decorator: 'password',
    placeholder: '请输入密码',
    type: 'text',
    required: true,
    inputType: 'password'
  },
  {
    name: '真实姓名',
    message: '请输入真实姓名',
    decorator: 'realname',
    placeholder: '请输入真实姓名',
    type: 'text',
    required: false,
    inputType: 'normal'
  },
  {
    name: '性别',
    message: '请输入显示顺序',
    decorator: 'sex',
    placeholder: '请输入显示顺序',
    type: 'text',
    required: false,
    inputType: 'radio',
    options: [{
        text: '男',
        value: 'M'
      },
      {
        text: '女',
        value: 'F'
      }
    ]
  },
  {
    name: '手机',
    message: '请输入手机',
    decorator: 'mobile',
    placeholder: '请输入手机',
    type: 'text',
    required: false,
    inputType: 'normal'
  },
  {
    name: '邮箱',
    message: '请输入邮箱',
    decorator: 'email',
    placeholder: '请输入邮箱',
    type: 'text',
    required: false,
    inputType: 'normal'
  },
  {
    name: '部门',
    message: '请选择部门',
    decorator: 'deptId',
    placeholder: '请选择部门',
    type: 'textArea',
    required: true,
    inputType: 'treeSelect',
    options: []
  },
  {
    name: '角色',
    message: '请选择角色，可多选',
    decorator: 'roleIds',
    placeholder: '请选择角色，可多选',
    type: 'textArea',
    required: true,
    inputType: 'select',
    options: []
  }
]

export default oriFormEidt
