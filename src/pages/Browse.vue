<template>
    <div>
        No tests here yet
    </div>
</template>

<script>
    export default {
        name: 'home',
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