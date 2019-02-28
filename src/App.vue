<template>
    <router-view></router-view>
</template>

<script>
    /* eslint-disable no-undef,vue/no-unused-components */

    import ProjectPage from './components/ProjectPage.vue'

    export default {
        name: 'app',
        components: {
            ProjectPage,
        }
    }
</script>


<style lang="scss">
    $primary-bg-color: #DEB887;
    $card-shadow: 8px 8px 17px -6px rgba(0, 0, 0, 0.7);
    $container-shadow: 11px 8px 17px -6px rgba(0, 0, 0, 0.75);
    $shadowedContainer-top-margin: 4vh;
    $shadowedContainer-bottom-margin: 8vh;
    $shadowedContainer-bg: white;
    $shadowedContainer-border: 1px solid rgba(169, 169, 169, 0.29);
    $shadowedContainer-border-radius: 8px;

    .container-fluid {
        background-color: $primary-bg-color;
    }

    .card {
        box-shadow: $card-shadow;
    }

    .shadowedContainer {
        margin-top: $shadowedContainer-top-margin;
        margin-bottom: $shadowedContainer-bottom-margin;
        box-shadow: $container-shadow;
        background-color: $shadowedContainer-bg;
        border: $shadowedContainer-border;
        border-radius: $shadowedContainer-border-radius;
    }

    .fluidHeight {
        min-height: 100%;
        height: auto !important; /* cross-browser */
        height: 100%; /* cross-browser */
        overflow-y: hidden;
    }

    html, body {
        height: 100%;
    }

</style>
