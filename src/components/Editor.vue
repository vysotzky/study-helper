<template>
    <vue-editor v-model="html" />
</template>

<script>
    import { VueEditor } from "vue2-editor";
    export default {
        props: ['value'],
        components: { VueEditor },
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
