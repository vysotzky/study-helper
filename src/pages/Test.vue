<template>
    <div>
        <h5 v-if="!test">
            You don't have any active test.
            <router-link :to="{name: 'Browse'}">Click here to select one.</router-link>
        </h5>
        <div class="text-center" v-else>
            <h2>{{test.name}}</h2>
            <h3>{{answered.length}} / {{questions.length}}</h3>
            <hr>
            <template v-if="currentQuestion">
                <h5 class="mb-3">{{ currentQuestion.question }}</h5>
                <b-button variant="outline-primary" class="mr-2" @click="answerKnown">I know</b-button>
                <b-button variant="outline-danger" class="mr-2" @click="answerNotKnown">I don't know</b-button>
                <b-button variant="outline-info" @click="showAnswer=!showAnswer">{{ showAnswerCaption }}</b-button>
            </template>
            <template v-else>
                <h1 class="mb-3">You finished the test</h1>
                <b-button variant="primary" class="mr-2" @click="startTest">Restart</b-button>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'test',
        data () {
            return {
                test: null,
                questions: [],
                answered: [],
                showAnswer: false
            }
        },
        computed: {
            remainingQuestions () {
                return this.questions.filter((question) => {
                    return !this.answered.includes(question.id)
                })
            },
            currentQuestion () {
                if (this.remainingQuestions.length > 0) {
                    return this.remainingQuestions[0]
                }
                return null
            },
            showAnswerCaption () {
                return !this.showAnswer ? 'Show the answer' : 'Hide the answer'
            }
        },
        methods: {
            shuffle (elements) {
                let m = elements.length, i;
                while (m) {
                    i = (Math.random() * m--) >>> 0;
                    [elements[m], elements[i]] = [elements[i], elements[m]]
                }
                return elements
            },
            answerKnown () {
                this.answered.push(this.currentQuestion.id)
            },
            answerNotKnown () {
                const question = this.questions.findIndex(q => q.id === this.currentQuestion.id);
                this.questions.push(this.questions.splice(question, 1)[0]);
            },
            startTest () {
                this.answered = []
                this.questions = this.shuffle(this.questions)
            },
        },
        mounted () {
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
            questions (questions) {
                localStorage.questions = JSON.stringify(questions);
            },
            answered (answered) {
                localStorage.answered = JSON.stringify(answered);
            },
        }
    }
</script>