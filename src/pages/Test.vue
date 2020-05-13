<template>
    <div>
        <h5 v-if="!test">
            You don't have any active test.
            <router-link :to="{name: 'Browse'}">Click here to select one.</router-link>
        </h5>
        <div class="text-center position-relative" v-else>
            <div id="testHeader" class="border-bottom pb-3 mb-3">
                <small>Test name</small>
                <small class="right" @click="stopTest">Stop this test</small>
                <h2>{{test.name}}</h2>
                <small>Progress</small>
                <h3>{{answered.length}} / {{questions.length}}</h3>
            </div>
            <template v-if="currentQuestion">
                <div id="question">
                    <small>Question</small>
                    <h5 class="mb-3">{{ currentQuestion.question }}</h5>
                    <div id="buttons" class="mt-1">
                        <b-button variant="outline-primary" @click="answerKnown">I know</b-button>
                        <b-button variant="outline-danger" @click="answerNotKnown">I don't know</b-button>
                        <b-button variant="outline-info" @click="showAnswer=!showAnswer">{{ showAnswerCaption }}
                        </b-button>
                    </div>
                </div>
                <div id="answer" v-if="showAnswer" class="mt-4 py-3 border-top">
                    <editor v-model="editorContent"/>
                    <b-button variant="primary" v-if="editorContent != currentQuestion.answer" class="mt-2"
                              @click="saveAnswer">Save
                    </b-button>
                </div>
            </template>
            <div v-else>
                <h1 class="mb-3">You finished the test</h1>
                <b-button variant="primary" class="mr-2" @click="startTest">Restart</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Editor from '../components/Editor.vue'

    export default {
        name: 'test',
        components: {
            Editor
        },
        data() {
            return {
                test: null,
                questions: [],
                answered: [],
                showAnswer: false,
                editorContent: ''
            }
        },
        computed: {
            remainingQuestions() {
                return this.questions.filter((question) => {
                    return !this.answered.includes(question.id)
                })
            },
            currentQuestion() {
                if (this.remainingQuestions.length > 0) {
                    return this.remainingQuestions[0]
                }
                return null
            },
            showAnswerCaption() {
                return !this.showAnswer ? 'Show the answer' : 'Hide the answer'
            },
        },
        methods: {
            shuffle(elements) {
                let m = elements.length, i;
                while (m) {
                    i = (Math.random() * m--) >>> 0;
                    [elements[m], elements[i]] = [elements[i], elements[m]]
                }
                return elements
            },
            answerKnown() {
                this.answered.push(this.currentQuestion.id)
                this.showAnswer = false
            },
            answerNotKnown() {
                const question = this.questions.findIndex(q => q.id === this.currentQuestion.id);
                this.questions.push(this.questions.splice(question, 1)[0]);
                this.showAnswer = false
            },
            startTest() {
                this.answered = []
                this.questions = this.shuffle(this.questions)
            },
            stopTest() {
                localStorage.clear()
                this.test = null
            },
            saveToStorage(name, value) {
                localStorage[name] = JSON.stringify(value)
            },
            saveAnswer() {
                this.currentQuestion.answer = this.editorContent
            }
        },
        mounted() {
            if (localStorage.test) {
                this.test = JSON.parse(localStorage.test);
            }
            if (localStorage.answered) {
                this.answered = JSON.parse(localStorage.answered);
            }
            if (localStorage.questions) {
                this.questions = JSON.parse(localStorage.questions);
            } else {
                this.questions = this.shuffle(this.test.questions)
            }
        },
        watch: {
            questions: {
                handler(questions) {
                    this.saveToStorage('questions', questions)
                },
                deep: true
            },
            currentQuestion: {
                handler(currentQuestion) {
                    this.editorContent = currentQuestion.answer
                },
                deep: true
            },
            answered(answered) {
                this.saveToStorage('answered', answered)
            },
        }
    }
</script>

<style>
    div#buttons button {
        margin: 2px;
    }

    .right {
        position: absolute;
        right: 0;
        cursor: pointer;
    }
</style>
