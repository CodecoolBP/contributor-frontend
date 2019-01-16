<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    /* eslint-disable no-undef,vue/no-unused-components */

    import ProjectPage from './components/ProjectPage.vue'

    export default {
        name: 'app',
        components: {
            ProjectPage
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
