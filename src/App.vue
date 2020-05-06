<template>
    <b-container id="app" class="h-100">
        <div>
            <h1 class="text-center">Learning Assistant</h1>
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
                    <router-view></router-view>
                </b-col>
            </b-row>
        </div>
    </b-container>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style>
    #app {
        margin-top: 10px;
    }
</style>
