<template>
  <div class="row">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable
        class="dragArea list-group"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="cloneDog"
        @change="log1"
      >
        <div class="list-group-item" v-for="element in list1" :key="element.id">
          {{ element.name }}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable
        v-model="list2"
        class="dragArea list-group"
        group="people"
        @change="log2"
      >
        <div class="list-group-item" v-for="element in list2" :key="element.id" style="border:1px solid red;min-height:50px">
          <template v-if="element.type==='tabs'">
            <div>
              <div v-for="(it, index) in element.pane" :key="index" @click="aq(index)">
                  {{it.name}}
                
                </div>
                <div v-if="current === 0" style="border:1px solid blue;min-height:50px">{{element.name}}==00000
                  <draggable
                    class="dragArea list-group"
                    group="people"
                    @change="log3"
                  >
                    <div class="list-group-item" v-for="item in it.list" :key="item.id" style="border:1px solid red;min-height:50px">
                      <template v-if="element.type==='tabs'">
                        <div>
                          <div v-for="(it, index) in item.pane" :key="index" @click="aq(index)">
                              {{it.name}}
                            
                            </div>
                            <div v-if="current === 0" style="border:1px solid blue;min-height:50px">
                              
                              {{element.name}}==0
                              </div>
                            <div v-if="current === 1" style="border:1px solid yellow;min-height:50px">{{element.name}}==1</div>
                        </div>
                        {{ element.name }}=={{element.time}}
                      </template>
                      
                    </div>
                  </draggable>
                  
                  </div>
                <div v-if="current === 1" style="border:1px solid yellow;min-height:50px">{{element.name}}==1</div>
            </div>
            {{ element.name }}=={{element.time}}
          </template>
          
        </div>
      </draggable>
    </div>

    <rawDisplayer class="col-3" :value="list1" title="List 1" />

    <rawDisplayer class="col-3" :value="list2" title="List 2" />
  </div>
</template>

<script>
import draggable from "vuedraggable";
import rawDisplayer from "./raw-displayer.vue";
let idGlobal = 8;
export default {
  name: "custom-clone",
  display: "Custom Clone",
  order: 3,
  
  components: {
    draggable,
    rawDisplayer
  },
  data() {
    return {
      current:0,
      list1: [
        {type:'tabs',name:'tabs',pane:[{type:'tabs',name:'tabs1',list:[]},{type:'tabs',name:'tabs2',list:[]}]}
      ],
      list2: [
      ]
    };
  },
  methods: {
    aq(index){
      this.current = index
    },
    log: function(evt) {
      window.console.log(evt);
    },
    log1: function(evt) {
      window.console.log(evt,1);
    },
    log2: function(evt) {
      window.console.log(evt,2);
    },
    log3: function(evt) {
      window.console.log(evt,3);
    },
    cloneDog({type, name}) {
      // console.log(e,2)
      return {
        id: idGlobal++,
        type,
        name,
        time:`${new Date().getTime()}_${Math.ceil(Math.random()*9999)}`,
        pane:[{type:'tabs',name:'tabs1',list:[]},{type:'tabs',name:'tabs2',list:[]}]
      };
    }
  }
};
</script>
<style scoped></style>