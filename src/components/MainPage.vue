<template>

    <div id="app">
        <div class="container-fluid headercontainer">
            <div class="container">

                <navbar></navbar>

                <headerComponent></headerComponent>

            </div>
        </div>

        <div class="container-fluid projectlist-container">
            <div class="container">

                <filter-bar></filter-bar>
                <br>

                <div class="card-columns">
                    <div v-if="projects && projects.length">
                        <div v-for="project of projects">
                            <div class="card">
                                <img class="cardLogo" v-bind:src=getImage(project.id) alt="Card image cap">
                                <div class="card-body">
                                    <h4 class="card-title">{{project.title}}</h4>
                                    <p class="card-text">{{project.shortDesc}}</p>
                                    <a v-bind:href="'#/projects/'+ project.id" class="btn btn-info">I'm
                                        interested!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Navbar from './Navbar.vue'
    import Header from './Header.vue'
    import FilterBar from './FilterBar.vue'

    export default {
        name: 'MaintPage',

        props: {
            msg: String
        },
        components: {
            'navbar': Navbar,
            'headerComponent': Header,
            'filterBar': FilterBar
        },
        data() {
            return {
                projects: [],
                errors: [],
            }
        }, methods: {

            getImage(currentId) {
                return "../assets/img/logos/logo" + currentId + ".png"
            }
        },
        // Fetches projects when the component is created.
        created() {
            axios.get('http://localhost:5000/api/projects')
                .then(response => {
                    this.projects = response.data;
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },

    }
</script>

<style scoped>
    @import '/node_modules/bootstrap/scss/bootstrap.scss';

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    .headercontainer {
        background-color: #343a40;
        padding-bottom: 3.5vh;
    }

    .projectlist-container {
        background-color: #fffcf2;
        padding-top: 3vh;
        padding-bottom: 5vh;
        min-height: 70vh;
    }

    .card {
        box-shadow: 6px 7px 17px -6px rgba(0, 0, 0, 0.75);
        display: inline-block
    }

    .cardLogo {
        width: 10vw;
        padding-top: 1.25rem;
    }

</style>
