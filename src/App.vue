<template>
    <div id="app">
        <ProjectPage msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
    /* eslint-disable no-undef */

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
