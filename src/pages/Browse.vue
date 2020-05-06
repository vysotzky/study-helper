<template>
    <div>
        <b-table striped hover :items="tests"></b-table>
    </div>
</template>

<script>
    export default {
        name: 'browse',
        data () {
            return {
                tests: []
            }
        },
        methods: {
            getTests () {
                return this.$tests.get()
            }
        },
        mounted () {
            this.getTests().then(query => {
                query.forEach( (test) =>  {
                    this.tests.push({
                        name: test.data().name
                    })
                })
            })
        }
    }
</script>