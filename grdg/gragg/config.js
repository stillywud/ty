export const basicComponents = [
  {
    type: 'ref_form',
    name:"关联表单",
    value: [],
    options: {
      width: '100%',
      
      required: false,
      dataType: 'string',
      disabled: false,
    }
  },
    {
      type: 'input',
      name:"单行文本",
      options: {
        width: '100%',
        maxLength:'',
        defaultValue: '',
        required: false,
        dataType: 'string',
        pattern: '',
        placeholder: '请输入',
        disabled: false,
      }
    },
    {
      type: 'textarea',
      name: '多行文本',
      options: {
        width: '100%',
        maxLength:'',
        defaultValue: '',
        required: false,
        disabled: false,
        pattern: '',
        placeholder: '请输入'
      }
    },
    {
      type: 'number',
      name: '数字输入框',
      icon: "number",
      options: {
        width: '',
        required: false,
        defaultValue: 0,
        min: 0,
        max: 0,
        step: 1,
        disabled: false,
      }
    },
    {
      type: 'select',
      name: '下拉框',
      options: {
        defaultValue: undefined,
        multiple: false,
        disabled: false,
        clearable: false,
        placeholder: '请选择',
        required: false,
        showLabel: true,
        width: '',
        options: [
          {
            label: 'Option 1',
            value:'1',
          },
          {
            label: 'Option 2',
            value:'2',
          },{
            label: 'Option 3',
            value:'3',
          }
        ],
      }
    },
    {
      type: 'radio',
      name: '单选框',
      options: {
        inline: true,
        defaultValue: '',
        showLabel: true,
        options: [
          {
            label: 'Option 1',
            value:'1',
          },
          {
            label: 'Option 2',
            value:'2',
          },{
            label: 'Option 3',
            value:'3',
          }
        ],
        required: false,
        width: '',
        disabled: false,
      }
    },
    {
      type: 'checkbox',
      name: '多选框',
      options: {
        inline: true,
        defaultValue: [],
        showLabel: true,
        options: [
          {
            label: 'Option 1',
            value:'1',
          },
          {
            label: 'Option 2',
            value:'2',
          },{
            label: 'Option 3',
            value:'3',
          }
        ],
        required: false,
        width: '',
        disabled: false,
      }
    },
    {
      type: "date",
      name: "日期选择框", 
      options: {
        defaultValue: "",
        placeholder: "请选择",
        required: false,
      },
    },
    {
      type: "datetime",
      name: "日期时间选择框",
      options: {
        defaultValue: "",
        placeholder: "请选择",
        required: false,
      },
    },
    {
      type: "upload",
      name: "上传",
      options: {
        defaultValue: undefined,
        multiple: false,
        hidden: false, // 是否隐藏，false显示，true隐藏
        disabled: false,
        width: "100%",
        required: false,
        length:1,
        size:'.01',
        type:undefined,
        placeholder: "上传图片文件视频",
      },
    },
    {
      type: "timer",
      name: "计时器",
      options: {
        defaultValue: '0',
        required: false,
      },
    },
{
  type: "grid",
  name: "栅格布局",
  className: "form-grid",
  icon: "icon-grid",
  hideTitle: !1,
  hideLabel: !0,
  isContainer: !0,
  columns: [{
      span: 12,
      list: []
  }, {
      span: 12,
      list: []
  }],
  options: {
      gutter: 0,
      justify: "start",
      align: "top",
      hidden: !1
  }
}, 
{
  type: "card",
  name: "卡片",
  hideTitle: !1,
  hideLabel: !0,
  isContainer: !0,
  list: [],
  options: {
      width: "100%",
      rowNum: 1,
      hidden: !1
  }
}, {
  type: "tabs",
  name: "Tabs",
  hideTitle: !1,
  hideLabel: !0,
  isContainer: !0,
  
  tabs: [{
      key:"Tab1",
      title:"Tab1",
      rowNum: 1,
      list: []
  }, {
      key:"Tab2",
      title: "Tab2",
      rowNum: 1,
      list: []
  }],
  options: {
      width: "100%",
      defaultValue:"",
      activeName:"",
      tabBarGutter:10,
      type: "editable-card",
      position: "top",
      hidden: !1,
      linkRadio:false,
  }
}
]

export const layoutComponents = [

]