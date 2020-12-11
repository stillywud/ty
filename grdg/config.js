export const basicComponents = [
    {
        type: 'input',
        name:"单行文本",
        options: {
          width: '100%',
          defaultValue: '',
          required: false,
          dataType: 'string',
          pattern: '',
          placeholder: '',
          disabled: false,
        }
    },
    {
        type: 'textarea',
        name: '多行文本',
        options: {
          width: '100%',
          defaultValue: '',
          required: false,
          disabled: false,
          pattern: '',
          placeholder: ''
        }
      },
]

export const layoutComponents = [
  {
    type: 'grid',
    icon: 'icon-grid-',
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
      align: 'top'
    }
  }
]