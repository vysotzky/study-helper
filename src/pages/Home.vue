<template>
    <div>
        Hello world
        <button type="button" @click="add">Add new question</button>
    </div>
</template>

<script>
    export default {
        name: 'home',
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