<template>
<div>
    <ul>
        <li v-for="(it,index) in list" :key="it">{{it.split('@@')[1]}}-----<a-icon @click="del(index)" type="right-circle" /></li>
    </ul>
    <a-button type="primary" @click="showModal(list)">
      Open Modal with async logic
    </a-button>
    <ind2 ref="ind2" @emitlist="emitlist"/>
  </div>

</template>
<script>
import axios from 'axios'
import ind2 from './index2_1.vue'
export default {
  data() {
    return {
      list:[],

      columns:[
          {
                title: 'HelpDetailID',
                dataIndex: 'HelpDetailID',
            },
            {
                title: 'RealName',
                dataIndex: 'RealName',
            },
            {
                title: 'Status',
                dataIndex: 'Status',
            },
      ],
      selectedRowKeys: [], // Check here to configure the default column
    };
  },
  components:{
      ind2
  },
    mounted(){
        // this.init(1)
    },
    methods: {
        showModal(o){
            this.$refs.ind2.show(o)
        },
        emitlist(o){
            this.list = o;
        },
        del(o){
            this.list = this.list.filter((it,index) => {
                return index !== o
            })
        }

    },
};
</script>