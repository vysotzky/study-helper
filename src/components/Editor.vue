<template>
    <wysiwyg v-model="html" />
</template>

<script>
    export default {
        props: ['value'],
        data () {
            return {
                html: this.value
            }
        },
        watch: {
            html (value) {
                this.$emit('input', value)
            }
        }
    }
</script>