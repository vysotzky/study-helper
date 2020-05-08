<template>
    <b-container id="app" class="h-100">
        <div id="header" class="text-center border-bottom mb-3 pb-2">
            <h1 class="font-weight-light">
                Study Helper
            </h1>
        </div>
        <b-row>
            <b-col lg="4" class="mb-3">
                <b-list-group>
                    <router-link to="/" v-slot="{ href, route, navigate, isActive, isExactActive }">
                        <b-list-group-item :href="href" @click="navigate" :active="isExactActive">Browse tests
                        </b-list-group-item>
                    </router-link>
                    <router-link to="/create" v-slot="{ href, route, navigate, isActive }">
                        <b-list-group-item :href="href" @click="navigate" :active="isActive">Create a test
                        </b-list-group-item>
                    </router-link>
                    <router-link to="/test" v-slot="{ href, route, navigate, isActive }">
                        <b-list-group-item :href="href" @click="navigate" :active="isActive">Take a test
                        </b-list-group-item>
                    </router-link>
                </b-list-group>
            </b-col>
            <b-col lg="8">
                <router-view></router-view>
                <b-alert class="mt-5"
                         :show="alertCountdown"
                         fade
                         :variant="alertType"
                         @dismiss-count-down="countdown">
                    {{ alertMessage }}
                </b-alert>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                alertTime: 3,
                alertCountdown: 0,
                alertMessage: '',
                alertType: 'info',
            }
        },
        methods: {
            alert(msg, type = 'info') {
                this.alertCountdown = this.alertTime
                this.alertMessage = msg
                this.alertType = type
            },
            countdown(s) {
                this.alertCountdown = s
            }
        },
        created() {
            this.$eventHub.$on('alert', this.alert)
        }
    }
</script>

<style>
    #app {
        margin-top: 10px;
    }
</style>
