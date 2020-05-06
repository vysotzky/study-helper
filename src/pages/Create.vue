<template>
    <div>
        <b-form-group
                horizontal
                :label-cols="4"
                description="Some cool input"
                label="Enter something"
        >
            <b-form-input v-model.trim="name"></b-form-input>
        </b-form-group>

        <b-alert variant="success" :show="showAlert">Hello {{ name }}</b-alert>
    </div>
</template>

<script>
    export default {
        name: 'create',
        data () {
            return {
                name: ''
            }
        },
        methods: {
            add () {
                this.$questions.add({
                    question: "1",
                    answer: "2",
                })
            }
        },
        mounted () {
        }
    }
</script>