const parantRefCl=(parent)=>{
    if(parent.$refs.hasOwnProperty('generateForm')){
        return parent.$refs
    }else{
        return this.parantRefCl(parent.$parent)
    }
}

export default {
    parantRefCl 
}