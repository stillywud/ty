<template>
    <div>
        <mt-input
            v-if="elementData.type === 'input'"
        />
    </div>
</template>
<script>
import MtInput from './MtInput.vue'
export default {
    props:["elementData"],
    components:{
        MtInput
    },
    provide(){
        return {
            elementData: this.elementData,
        }
    }
}
</script>
<style lang="scss" scoped>

</style>