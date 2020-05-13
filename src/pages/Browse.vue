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
                <b-button size="sm" variant="primary" @click="takeTest(data.item.id)" class="mr-1">Take</b-button>
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
                        key: 'questions',
                        label: 'Questions count',
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
                            id: test.id, name: test.data().name, questions: test.data().questions.length
                        })
                    })
                }).finally(() => this.busy = false)
            },
            deleteTest (id) {
                if (!confirm('Are you sure?')) {
                    return;
                }
                this.$tests.doc(id).delete().then(() => {
                    this._alert('Test deleted!', 'success')
                    this.tests = this.tests.filter(test => test.id !== id);
                }).catch(() => {
                    this._alert('Couldn\'t delete the test', 'danger')
                });
            },
            takeTest (id) {
                if (localStorage.test) {
                    if (!confirm('Current test will be stopped. Are you sure?')) {
                        return;
                    }
                }
                localStorage.clear();
                localStorage.batchSize = prompt("Enter batch size")
                this.$tests.doc(id).get().then((test)=>{
                    localStorage.test = JSON.stringify(test.data())
                    localStorage.testId = id
                    this.$router.push({name: "Test"})
                })
            }
        },
        mounted () {
            this.getTests()
        }
    }
</script>
