// update-begin--Author:sunjianlei Date:20190621 for：types枚举 --------------------
export const ctypes = {
  tabs: 'tabs',
  card: 'card',
  text: 'text',
  divider: 'divider',
  fileUpload: 'file-upload'
}
// update-end--Author:sunjianlei Date:20190621 for：types枚举 --------------------

export const basicComponents = [
  {
    type: 'input',
    name: '单行文本',
    className: 'form-input',
    icon: 'icon-input',
    hideTitle: false,
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: null,
      pattern: '',
      placeholder: '',
      readonly: false,
      disabled: false,
      fillRuleCode: '',
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
  {
    type: 'textarea',
    name: '多行文本',
    className: 'form-textarea',
    icon: 'icon-textarea',
    hideTitle: false,
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: '',
      placeholder: '',
      readonly: false,
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
  {
    type: 'number',
    name: '计数器',
    className: 'form-number',
    icon: 'icon-number',
    hideTitle: false,
    options: {
      width: '',
      required: false,
      defaultValue: 0,
      // update-begin--Author:sunjianlei Date:20190611 for：修改计数器默认值 --------------------
      controls: true,
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      controlsPosition: 'right',
      // update-end--Author:sunjianlei Date:20190611 for：修改计数器默认值 --------------------
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
  {
    type: 'radio',
    name: '单选框组',
    className: 'form-radio',
    icon: 'icon-radio-active',
    hideTitle: false,
    options: {
      inline: true,
      defaultValue: '',
      showLabel: false,
      options: [
        {
          value: '选项1',
        },
        {
          value: '选项2',
        },
        {
          value: '选项3',
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false,
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
  {
    type: 'checkbox',
    name: '多选框组',
    className: 'form-checkbox',
    icon: 'icon-checkbox',
    hideTitle: false,
    options: {
      inline: true,
      defaultValue: [],
      showLabel: false,
      options: [
        {
          value: '选项1'
        },
        {
          value: '选项2'
        },
        {
          value: '选项3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false,
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
  {
    type: 'time',
    name: '时间选择器',
    className: 'form-time',
    icon: 'icon-time',
    hideTitle: false,
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: '',
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
  {
    type: 'date',
    name: '日期选择器',
    className: 'form-date',
    icon: 'icon-date',
    hideTitle: false,
    options: {
      // update-begin--Author:sunjianlei Date:20190710 for：扩展日期选择器 --------------------
      defaultValue: '',
      defaultValueType: 1,
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: '',
      // update-end--Author:sunjianlei Date:20190710 for：扩展日期选择器 --------------------
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
  {
    type: 'rate',
    name: '评分',
    className: 'form-rate',
    icon: 'icon-rate',
    hideTitle: false,
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false,
      hidden: false,
    },
  },
  {
    type: 'color',
    name: '颜色选择器',
    className: 'form-color',
    icon: 'icon-color',
    hideTitle: false,
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false,
      hidden: false,
    },
  },
  {
    type: 'select',
    name: '下拉选择框',
    className: 'form-select',
    icon: 'icon-select',
    hideTitle: false,
    options: {
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: false,
      width: '',
      options: [
        {
          value: '下拉框1'
        },
        {
          value: '下拉框2'
        },{
          value: '下拉框3'
        }
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
  {
    type: 'switch',
    name: '开关',
    className: 'form-switch',
    icon: 'icon-switch',
    hideTitle: false,
    options: {
      defaultValue: false,
      required: false,
      disabled: false,
      activeValue: '',
      inactiveValue: '',
      hidden: false,
    },
  },
  {
    type: 'slider',
    name: '滑块',
    className: 'form-slider',
    icon: 'icon-slider',
    hideTitle: false,
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: '',
      hidden: false,
    },
  }
]

export const advanceComponents = [
  // {
  //   type: 'blank',
  //   name: '自定义',
  //   icon: 'icon-ic',
  //   hideTitle: false,
  //   options: {
  //     defaultType: 'String'
  //   }
  // },
  {
    type: 'imgupload',
    name: '图片上传',
    className: 'form-tupian',
    icon: 'icon-tupian',
    hideTitle: false,
    options: {
      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      width: '',
      tokenFunc: 'funcGetToken',
      token: '',
      // update-begin--Author:sunjianlei Date:20190711 for：更改默认域名 --------------------
      domain: 'http://img.h5huodong.com',
      // update-begin--Author:sunjianlei Date:20190711 for：更改默认域名 --------------------
      disabled: false,
      length: 9,
      multiple: true,
      hidden: false,
    },
  },
  // update-begin--Author:sunjianlei Date:20190731 for：新增文件上传组件 --------------------
  {
    type: ctypes.fileUpload,
    name: '文件上传',
    className: 'form-file-upload',
    icon: 'icon-shangchuan',
    hideTitle: false,
    options: {
      defaultValue: [],
      token: '',
      length: 1,
      drag: false,
      multiple: false,
      disabled: false,
      buttonText: '点击上传文件',
      tokenFunc: 'funcGetToken',
      hidden: false,
    },
  },
// update-end--Author:sunjianlei Date:20190731 for：新增文件上传组件 --------------------
  {
    type: 'editor',
    name: '编辑器',
    className: 'form-editor',
    icon: 'icon-fuwenbenkuang',
    hideTitle: false,
    options: {
      defaultValue: '',
      width: '',
      disabled: false,
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
  {
    type: 'cascader',
    name: '级联选择器',
    className: 'form-cascader',
    icon: 'icon-jilianxuanze',
    hideTitle: false,
    options: {
      defaultValue: [],
      width: '',
      placeholder: '',
      disabled: false,
      clearable: false,
      remote: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: '',
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
  // update-begin--Author:sunjianlei Date:20190704 for：新增自定义组件 --------------------
  {
    type: 'buttons',
    name: '按钮',
    className: 'form-buttons',
    hideLabel: true,
    icon: 'icon-btn2',
    hideTitle: false,
    options: {
      text: '按钮',
      icon: "",
      type: "default",
      btnSize: "default",
      plain: false,
      round: false,
      circle: false,
      disabled: false,
      hidden: false,
    },
    event: {
      click: "console.log('hello,world!')"
    },
  },
  {
    type: ctypes.text,
    name: '文本',
    className: 'form-text',
    icon: 'icon-text',
    hideTitle: false,
    hideLabel: true, // 是否隐藏label
    options: {
      text: '这里是一段文本',
      width: '100%',
      align: 'left',
      fontSize: 16,
      lineHeight: '',
      fontColor: '#000000',
      fontBold: false,
      fontItalic: false,
      fontUnderline: false,
      fontLineThrough: false,
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
  {
    type: ctypes.divider,
    name: '分隔符',
    className: 'form-divider',
    icon: 'icon-divider',
    hideTitle: false,
    hideLabel: true, // 是否隐藏label,
    formItemMargin: true, // 是否去掉 el-form-item 默认的外边距
    options: {
      heightNumber: 40,
      type: 'horizontal',
      text: '',
      position: 'center',
      hidden: false,
    },
  },
  {
    type: 'area-linkage',
    name: '省市级联动',
    className: 'form-area-linkage',
    icon: 'icon-jilianxuanze',
    hideTitle: false,
    options: {
      width: '',
      placeholder: '请选择',
      defaultValue: "",
      disabled: false,
      hidden: false,
    }
  },
  // update-end--Author:sunjianlei Date:20190704 for：新增自定义组件 --------------------
]

export const layoutComponents = [
  {
    type: 'grid',
    name: '栅格布局',
    className: 'form-grid',
    icon: 'icon-grid',
    hideTitle: false,
    hideLabel: true,
    isContainer: true, // 容器组件
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top',
      hidden: false,
    },
  },
  // update-begin--Author:sunjianlei Date:20190621 for：新增自定义布局 --------------------
  {
    type: ctypes.card,
    name: '卡片',
    className: 'form-card',
    icon: 'icon-card',
    hideTitle: false,
    hideLabel: true,
    isContainer: true, // 容器组件
    list: [],
    options: {
      width: '100%',
      rowNum: 1,
      hidden: false,
    },
  },
  {
    type: ctypes.tabs,
    name: 'Tabs',
    className: 'form-tabs',
    icon: 'icon-tab',
    hideTitle: false,
    hideLabel: true,
    isContainer: true, // 容器组件
    panes: [
      { name: 'Tab1', label: 'Tab1', rowNum: 1, list: [] },
      { name: 'Tab2', label: 'Tab2', rowNum: 1, list: [] }
    ],
    options: {
      width: '100%',
      activeName: '',
      type: 'border-card',
      position: 'top',
      hidden: false,
    },
  }
  // update-end--Author:sunjianlei Date:20190621 for：新增自定义布局 --------------------
]

export const jeecgComponents = [
// update-begin--Author:sunjianlei Date:20190530 for：新增设计版子表组件区域 --------------------
  {
    type: 'sub-table-design',
    name: '设计子表',
    className: 'form-sub-table',
    icon: 'icon-table',
    hideTitle: false,
    class: ['data-j-editable-design'],
    isContainer: true, // 容器组件
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      columnNumber: 2,
      justify: 'start',
      align: 'top',
      defaultValue: "[]",
      subTableName: "",
      defaultRows: 0, // 默认行数
      showCheckbox: true, // 是否显示选择框
      showNumber: true, // 是否显示序号
      showRowButton: false, // 是否显示行操作按钮
      allowAdd: true, // 是否允许新增行,
      autoHeight: true, // 是否自适应高度
      hidden: false,
    },
  },
  // update-end--Author:sunjianlei Date:20190530 for：新增设计版子表组件区域 --------------------

  // update-begin--Author:sunjianlei Date:20190613 for：新增自定义组件 --------------------
  {
    type: 'select-user',
    name: '用户组件',
    className: 'form-select-user',
    icon: 'icon-user-circle',
    hideTitle: false,
    options: {
      keyMaps: [],
      defaultValue: '',
      // 默认为登录选项
      defaultLogin: false,
      placeholder: '',
      width: '100%',
      disabled: false,
      // 自定义返回字段
      customReturnField: 'username',
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
  {
    type: 'select-depart',
    name: '部门组件',
    className: 'form-select-depart',
    icon: 'icon-depart',
    hideTitle: false,
    options: {
      keyMaps: [],
      defaultValue: '',
      // 默认为登录选项
      defaultLogin: false,
      placeholder: '',
      width: '100%',
      disabled: false,
      customReturnField: 'id',
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
  {
    type: 'table-dict',
    name: '表字典',
    className: 'form-dict',
    icon: 'icon-dict',
    hideTitle: false,
    options: {
      width: '100%',
      defaultValue: "",
      placeholder: "点击选择表字典",
      showIcon: true,
      iconName: "icon-popup",
      disabled: false,
      style: 'popup', // 支持 popup、select
      dictTable: '',
      dictCode: '',
      dictText: '',
      hidden: false,
      required: false,
    },
    remoteAPI: { url: '', executed: false },
  }
// update-end--Author:sunjianlei Date:20190613 for：新增自定义组件 --------------------
]

// update-start--Author:mx Date:20210101 for：新增自定义组件 --------------------
export const tyComponents = [
  {
    type: 'postcard',
    name: '身份证',
    className: 'form-postcard',
    icon: 'icon-input',
    hideTitle: false,
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      placeholder: '',
      readonly: false,
      disabled: false,
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
  {
    type: 'tels',
    name: '电话',
    className: 'form-tels',
    icon: 'icon-popup',
    hideTitle: false,
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      telType:1,
      placeholder: '',
      readonly: false,
      disabled: false,
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
  {
    type: 'date-range',
    name: '日期区间',
    className: 'form-date-range',
    icon: 'icon-date',
    hideTitle: false,
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'YYYY-mm-DD',
      required: false,
      width: '',
      hidden: false,
    },
    remoteAPI: { url: '', executed: false },
  },
]
// update-end--Author:mx Date:20210101 for：新增自定义组件 --------------------