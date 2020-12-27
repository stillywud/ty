<template>

  <el-row
      type="flex"
      :gutter="element.options.gutter ? element.options.gutter : 0"
      :justify="element.options.justify"
      :align="element.options.align"
      :class="getClassName(element)"
      style="flex-wrap: wrap;"
  >
    <el-col v-for="(col, colIndex) in element.columns" :key="colIndex" v-bind="getColProps(col)">

      <template v-for="citem in col.list">

        <generate-form-item
            ref="formItem"
            :key="citem.key"
            :data="data"
            :config="config"
            :widget="citem"
            :element="citem"
            :models.sync="dataModel"
            v-bind="commonProps"
            :className="getClassName(citem)"
            @popupCgreportOk="handlePopupCgreportOk"
            @dialogChange="handleDialogChange"
        ></generate-form-item>

      </template>

    </el-col>
  </el-row>

</template>

<script>
  import JGridMixins from './mixins/JGridMixins'
  import GenerateFormItem from '../../GenerateFormItem'
  import { ElementAction, GenerateNesting } from '../../../mixins/CommonMixins'

  export default {
    name: 'JGridGenerate',
    mixins: [JGridMixins, ElementAction, GenerateNesting],
    components: { GenerateFormItem },
    props: ['data', 'config'],
    methods: {}
  }
</script>

<style scoped>

</style>