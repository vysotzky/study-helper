<template>
    <b-container id="app" class="h-100">
        <div>
            <h1 class="text-center mb-3">Learning Assistant</h1>
            <b-row>
                <b-col lg="4" class="mb-3">
                    <b-list-group>
                        <b-list-group-item>Browse tests</b-list-group-item>
                        <b-list-group-item>Create a test</b-list-group-item>
                        <b-list-group-item>Take a test</b-list-group-item>
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
