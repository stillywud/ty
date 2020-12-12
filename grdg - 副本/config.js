export const basicComponents = [
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
      type: "date", // 表单类型
      name: "日期选择框", // 标题文字
      icon: "calendar",
     
      options: {
        width: "100%", // 宽度
        defaultValue: "", // 默认值，字符串 12:00:00
        rangeDefaultValue: [], // 默认值，字符串 12:00:00
        range: false, // 范围日期选择，为true则会显示两个时间选择框（同时defaultValue和placeholder要改成数组），
        showTime: false, // 是否显示时间选择器
        disabled: false, // 是否禁用
        hidden: false, // 是否隐藏，false显示，true隐藏
        clearable: false, // 是否显示清除按钮
        placeholder: "请选择",
        // rangePlaceholder: ["开始时间", "结束时间"],
        required: false,
        format: "YYYY-MM-DD" // 展示格式  （请按照这个规则写 YYYY-MM-DD HH:mm:ss，区分大小写）
      },
    },
    {
      type: "datetime", // 表单类型
      name: "日期时间选择框", // 标题文字
      icon: "calendar",
      options: {
        width: "100%", // 宽度
        defaultValue: "", // 默认值，字符串 12:00:00
        rangeDefaultValue: [], // 默认值，字符串 12:00:00
        range: false, // 范围日期选择，为true则会显示两个时间选择框（同时defaultValue和placeholder要改成数组），
        showTime: false, // 是否显示时间选择器
        disabled: false, // 是否禁用
        hidden: false, // 是否隐藏，false显示，true隐藏
        clearable: false, // 是否显示清除按钮
        placeholder: "请选择",
        // rangePlaceholder: ["开始时间", "结束时间"],
        required: false,
        format: "YYYY-MM-DD HH:mm:ss" // 展示格式  （请按照这个规则写 YYYY-MM-DD HH:mm:ss，区分大小写）
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
        type:'',
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
//     {
//       type: 'card',
//       name: "卡片",
//       hideTitle: !1,
//       hideLabel: !0,
//       isContainer: !0,
//       list: [],
//       options: {
//           width: "100%",
//           rowNum: 1,
//           hidden: !1
//       }
//   }, {
//       type: 'tabs',
//       name: "Tabs",

//       hideTitle: !1,
//       hideLabel: !0,
//       isContainer: !0,
//       panes: [{
//           name: "Tab1",
//           label: "Tab1",
//           rowNum: 1,
//           list: []
//       }, {
//           name: "Tab2",
//           label: "Tab2",
//           rowNum: 1,
//           list: []
//       }],
//       options: {
//           width: "100%",
//           activeName: "",
//           type: "border-card",
//           position: "top",
//           hidden: !1
//       }
//   },
//  {
//     type: 'grid',
//     name:"grid",
//     columns: [
//       {
//         span: 12,
//         list: []
//       },
//       {
//         span: 12,
//         list: []
//       }
//     ],
//     options: {
//       gutter: 0,
//       justify: 'start',
//       align: 'top'
//     }
//   }
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
}, {
  type: "card",
  name: "卡片",
  className: "form-card",
  icon: "icon-card",
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
  className: "form-tabs",
  icon: "icon-tab",
  hideTitle: !1,
  hideLabel: !0,
  isContainer: !0,
  panes: [{
      name: "Tab1",
      label: "Tab1",
      rowNum: 1,
      list: []
  }, {
      name: "Tab2",
      label: "Tab2",
      rowNum: 1,
      list: []
  }],
  options: {
      width: "100%",
      activeName: "",
      type: "border-card",
      position: "top",
      hidden: !1
  }
}
]

export const layoutComponents = [
  // {
  //   type: 'grid',
  //   icon: 'icon-grid-',
  //   columns: [
  //     {
  //       span: 12,
  //       list: []
  //     },
  //     {
  //       span: 12,
  //       list: []
  //     }
  //   ],
  //   options: {
  //     gutter: 0,
  //     justify: 'start',
  //     align: 'top'
  //   }
  // }
]