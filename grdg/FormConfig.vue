<template>
    <div class="form-config-container">
        <a-form-model label-position="top">
            <a-form-item label="标签对齐方式">
                <a-radio-group v-model="data.labelPosition" button-style="solid">
                    <a-radio-button value="left">左对齐</a-radio-button>
                    <a-radio-button value="right">右对齐</a-radio-button>
                    <a-radio-button value="top">顶部对齐</a-radio-button>
                </a-radio-group>
            </a-form-item>
        </a-form-model>
    </div>
</template>
<script>
export default {
    name:"form-config",
    props:['data']
}
</script>