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
        $primary-bg-color: #ffe5d0;
        $card-shadow: 8px 8px 17px -6px rgba(0, 0, 0, 0.5);
        $container-shadow: 6px 7px 17px -6px rgba(0, 0, 0, 0.75);
        $shadowedContainer-margin: 4vh;
        $shadowedContainer-bg: white;
        $shadowedContainer-border: 1px solid rgba(169, 169, 169, 0.29);

        .container-fluid {
                background-color: $primary-bg-color;
        }

    .card{
        box-shadow: $card-shadow;
    }

    .shadowedContainer {
        margin-top: $shadowedContainer-margin;
        margin-bottom: $shadowedContainer-margin;
        box-shadow: $container-shadow;
        background-color: $shadowedContainer-bg;
        border: $shadowedContainer-border;
    }


</style>
