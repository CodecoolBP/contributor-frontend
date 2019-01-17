<template>

    <div id="app">
        <div class="container-fluid headercontainer">
            <div class="container">

                <navigation></navigation>

                <div class="img-wrapper">
                    <img class="img-responsive" alt="Header image" src="../assets/titlebackground.png">
                    <div class="img-overlay">
                        <button class="btn btn-md btn-success btn-responsive" id="addproject">Add new project</button>
                        <button class="btn btn-md btn-success btn-responsive" id="seeprojects">See active projects
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid projectlist-container">
            <div class="container">
                <div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <select class="form-control" id="category">
                                <option>Select category
                                </option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <form class="form-inline my-2 my-lg-0">
                                <input class="form-control mr-sm-2" type="text" placeholder="Search"
                                       aria-label="Search">
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>

                <br>

                <div class="card-columns">
                    <div v-if="projects && projects.length">
                        <div v-for="project of projects">
                            <div class="card">
                                <img class="cardLogo" src="../assets/logos/logo1.png" alt="Card image cap">
                                <div class="card-body">
                                    <h4 class="card-title">{{project.name}}</h4>
                                    <p class="card-text">{{project.shortDesc}}</p>
                                    <a href="#!" class="btn btn-primary">I'm interested!</a>
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
    import Navigation from '/Users/manoczar/Downloads/Codecool/Advanced/ContriButor/contributor-frontend/src/components/Navigation.vue'

    export default {
        name: 'MaintPage',
        props: {
            msg: String
        },
        components: {
            'Navigation' : Navigation
        },
        data() {
            return {
                projects: [],
                errors: []
            }
        },
        // Fetches projects when the component is created.
        created() {
            axios.get('http://localhost:5000/contributorapi/list')
                .then(response => {
                    this.projects = response.data;
                    console.log("resp: "+response.data);
                    console.log("proj" + this.projects)
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },

    }
</script>

<style>
    @import '/node_modules/bootstrap/scss/bootstrap.scss';

    .img-wrapper {
        position: relative;
    }

    .img-responsive {
        max-width: 100%;
        height: auto;
    }

    .img-overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
    }

    .img-overlay:before {
        content: ' ';
        display: block;
        /* adjust 'height' to position overlay content vertically */
        height: 50%;
    }

    .btn-responsive {

    }

    #addproject, #seeprojects {
        font-size: 1.5rem;
        border-style: solid;
        border-width: 1px;
    }

    #addproject {
        margin-right: 8vw;
        border-color: grey;

    }

    #seeprojects {
        border-color: white;
    }

    .headercontainer {
        background-color: #343a40;
        padding-bottom: 3.5vh;
    }

    .projectlist-container {
        background-color: #fffcf2;
        padding-top: 3vh;
    }

    .card {
        box-shadow: 6px 7px 17px -6px rgba(0, 0, 0, 0.75)
    }

    .cardLogo {
        width: 10vw;
        padding-top: 1.25rem;
    }

</style>
