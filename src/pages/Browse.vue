<template>
    <div>
        <b-table striped hover :items="tests" :fields="tableFields" :busy="busy">
            <template v-slot:table-busy>
                <div class="text-center my-2">
                    <b-spinner class="align-middle mr-3"></b-spinner>
                    <strong>Loading tests</strong>
                </div>
            </template>
            <template v-slot:cell(actions)="data">
                <b-button size="sm" variant="danger" @click="deleteTest(data.item.id)">Delete</b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
    export default {
        name: 'browse',
        data () {
            return {
                busy: true,
                tests: [],
                tableFields: [
                    {
                        key: 'name',
                        label: 'Test name',
                        sortable: true
                    },
                    {
                        key: 'actions',
                        label: 'Actions',
                        sortable: false
                    }
                ]
            }
        },
        methods: {
            getTests () {
                this.busy = true
                return this.$tests.get().then(query => {
                    query.forEach((test) => {
                        this.tests.push({
                            id: test.id, name: test.data().name
                        })
                    })
                }).finally(() => this.busy = false)
            },
            deleteTest (id) {
                this.$tests.doc(id).delete().then(() => {
                    this.$emit('alert', 'Test deleted', 'success')
                    this.tests = this.tests.filter(test => test.id !== id);
                }).catch(() => {
                    this.$emit('alert', 'Failed to delete test', 'danger')
                });
            }
        },
        mounted () {
            this.getTests()
        }
    }
</script>