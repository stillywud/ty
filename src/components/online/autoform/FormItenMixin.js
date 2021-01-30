export const FormItemMixin = {
  data(){
    return {
      widgetAttrs:this.formitem.widgetAttrs,
      itemAttrs:this.formitem.itemAttrs,
      placeholder:this.formitem.placeholder,
      formitemAttrs:this.formitem.formitemAttrs,
      colAttrs:this.formitem.colAttrs
    }
  },
  props:{
    formitem:{
      type: Object,
      default: () => {},
      required: false
    },
    isTabProp:{
      type:Boolean,
      default:false,
      required:false
    },
    tabDataIndex:{
      type:Number,
      default:0,
      required:false
    },
    tabKey:{
      type:String,
      default:'',
      required:false
    },
    otherLabel:{
      type:String,
      default:'',
      required:false
    }
  },
  computed:{
    label(){
      if(!this.otherLabel || this.otherLabel.length==0){
        return this.formitem.label;
      }else{
        return this.otherLabel;
      }
    }
  },
  methods:{
    getVdecorator(){
      let id = this.tabKey+'['+this.tabDataIndex+'].'+this.formitem.key
      console.log(this.formitem.fieldDecoratorOptions)
      return [id,{rules: [{ required: true, message: 'Please select your country!' }]}]
    },
    getPopupContainer(node){
      return node.parentNode;
    },
    getModalAsContainer(node){
      return document.querySelector('.jeecg-online-modal .ant-modal-content')
    },
    getParentContainer(node) {
      let element = (() => {
        // nodeType 8	: Comment	: 注释
        if (this.$el && this.$el.nodeType !== 8) {
          return this.$el
        }
        let doc = document.getElementById(this.caseId + 'inputTable')
        if (doc != null) {
          return doc
        }
        return node.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
      })()

      // 递归判断是否带有 overflow: hidden；的父元素
      const ifParent = (child) => {
        let currentOverflow = null
        if (child['currentStyle']) {
          currentOverflow = child['currentStyle']['overflow']
        } else if (window.getComputedStyle) {
          currentOverflow = window.getComputedStyle(child)['overflow']
        }
        if (currentOverflow != null) {
          if (currentOverflow === 'hidden') {
            // 找到了带有 hidden 的标签，判断它的父级是否还有 hidden，直到遇到完全没有 hidden 或 body 的时候才停止递归
            let temp = ifParent(child.parentNode)
            return temp != null ? temp : child.parentNode
          } else
            // 当前标签没有 hidden ，如果有父级并且父级不是 body 的话就继续递归判断父级
          if (child.parentNode && child.parentNode.tagName.toLocaleLowerCase() !== 'body') {
            return ifParent(child.parentNode)
          } else {
            // 直到 body 都没有遇到有 hidden 的标签
            return null
          }
        } else {
          return child
        }
      }

      let temp = ifParent(element)
      return (temp != null) ? temp : element
    },
  },
  mounted(){
    //console.log(this.formitem)
  }

}