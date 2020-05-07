<template>
    <div>
        <h5 v-if="!test">
            You don't have any active test.
            <router-link :to="{name: 'Browse'}">Click here to select one.</router-link>
        </h5>
        <div class="text-center position-relative" v-else>
            <div id="testHeader" class="border-bottom pb-3 mb-3">
                <small>Test name</small>
                <span id="stop" @click="stopTest">Stop</span>
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
                <div id="answer" v-if="showAnswer">
                    <textarea></textarea>
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
    export default {
        name: 'test',
        data() {
            return {
                test: null,
                questions: [],
                answered: [],
                showAnswer: false
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
            }
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
            },
            answerNotKnown() {
                const question = this.questions.findIndex(q => q.id === this.currentQuestion.id);
                this.questions.push(this.questions.splice(question, 1)[0]);
            },
            startTest() {
                this.answered = []
                this.questions = this.shuffle(this.questions)
            },
            stopTest() {
                localStorage.clear()
                this.test = null
            },
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
            questions(questions) {
                localStorage.questions = JSON.stringify(questions);
            },
            answered(answered) {
                localStorage.answered = JSON.stringify(answered);
            },
        }
    }
</script>

<style>
    div#buttons button {
        margin: 2px;
    }

    #stop {
        position: absolute;
        right: 0;
        cursor: pointer;
    }
</style>
