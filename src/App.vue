<template>
    <b-container id="app" class="h-100">
        <div>
            <h1 class="text-center font-weight-light">Learning Assistant</h1>
            <hr>
            <b-row>
                <b-col lg="4" class="mb-3">
                    <b-list-group>
                        <router-link to="/" v-slot="{ href, route, navigate, isActive, isExactActive }">
                            <b-list-group-item :href="href" @click="navigate" :active="isExactActive">Browse tests</b-list-group-item>
                        </router-link>
                        <router-link to="/create" v-slot="{ href, route, navigate, isActive }">
                            <b-list-group-item :href="href" @click="navigate" :active="isActive">Create a test</b-list-group-item>
                        </router-link>
                    </b-list-group>
                </b-col>
                <b-col lg="8">
                    <router-view @alert="alert"></router-view>
                    <b-alert class="mt-5"
                            :show="alertCountdown"
                            fade
                            :variant="alertType"
                            @dismiss-count-down="countdown"
                    >
                        {{ alertMessage }}
                    </b-alert>
                </b-col>
            </b-row>
        </div>
    </b-container>
</template>

<script>
    export default {
        name: 'App',
        data () {
            return {
                alertTime: 4,
                alertCountdown: 0,
                alertMessage: '',
                alertType: 'info',
            }
        },
        methods: {
            alert(msg, type='info'){
                this.alertCountdown = this.alertTime
                this.alertMessage = msg
                this.alertType = type
            },
            countdown (s) {
                this.alertCountdown = s
            }
        },
    }
</script>

<style>
    #app {
        margin-top: 10px;
    }
</style>
