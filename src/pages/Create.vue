<template>
    <div>
        <p>Questions</p>
        <b-form-textarea class="mb-2" id="textarea-auto-height" placeholder="" rows="3" :max-rows="maxRows"
                         v-model.trim="test">
        </b-form-textarea>
        <b-form-group label="Test name">
            <b-form-input v-model.trim="name"></b-form-input>
        </b-form-group>
        <b-button variant="primary" v-if="questions.length>0" @click="createTest">
            Create a test with {{questions.length}} questions
        </b-button>
    </div>
</template>

<script>
    import WindowSize from '../mixins/WindowSize'

    export default {
        name: 'create',
        mixins: [WindowSize],
        data() {
            return {
                test: '',
                name: '',
            }
        },
        computed: {
            maxRows() {
                return Math.round(this.window.height / 55);
            },
            questions() {
                return this.test.split("\n").map(e => e.trim()).filter(Boolean).map((e, i) => {
                    return {id: i + 1, question: e, answer: ''}
                })
            }
        },
        methods: {
            createTest() {
                if (this.name == '') {
                    return alert('Please enter a valid name!')
                }
                const test = {
                    name: this.name,
                    questions: this.questions
                };
                const id = this.name.toLowerCase().replace(/([a-z])([A-Z])/g, "$1-$2")
                    .replace(/\s+/g, '-')
                this.$tests.doc(id).set(test).then(() => {
                    this.test = ''
                    this.name = ''
                    this.$emit('alert', 'Test created', 'success')
                }).catch(function (error) {
                    this.$emit('alert', 'An error occured: ' + error, 'danger')
                });

            }
        }
    }
</script>
