<template>

    <div id="app">
        <div class="container-fluid headercontainer">
            <div class="container">

                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-0">
                        <ul class="navbar-nav ml-auto text-center">
                            <li class="nav-item active">
                                <a class="nav-link" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Success stories</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">TOP lists</a>
                            </li>
                        </ul>
                    </div>

                    <div class="navbar-collapse collapse w-100 dual-collapse2 order-2 order-md-2">
                        <ul class="navbar-nav mr-auto text-center">
                            <li class="nav-item">
                                <a class="nav-link" href="#">Add new project</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div class="img-wrapper">
                    <img class="img-responsive" alt="Header image" src="../assets/img/titlebackground.png">
                    <div class="img-overlay">
                        <a class="btn btn-md btn-warning btn-responsive" href="http://localhost:8080/#/add"
                           role="button" id="addproject">Add new project</a>
                        <button class="btn btn-md btn-warning btn-responsive" id="seeprojects">See active projects
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
                                       aria-label="Search" id="search">
                                <button class="btn btn-info my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>

                <br>

                <div class="card-columns">
                    <div v-if="projects && projects.length">
                        <div v-for="project of projects">
                            <div class="card">
                                <img class="cardLogo" src="../assets/img/logos/logo1.png" alt="Card image cap">
                                <div class="card-body">
                                    <h4 class="card-title">{{project.name}}</h4>
                                    <p class="card-text">{{project.shortDesc}}</p>
                                    <a v-bind:href="'#/projects/'+ project.id" class="btn btn-primary">I'm
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

    export default {
        name: 'MaintPage',

        props: {
            msg: String
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
            axios.get('http://localhost:5000/contributorapi/list')
                .then(response => {
                    this.projects = response.data;
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
        box-shadow: 6px 7px 17px -6px rgba(0, 0, 0, 0.75);
        display: inline-block
    }

    .cardLogo {
        width: 10vw;
        padding-top: 1.25rem;
    }

    .navbar-expand-lg .navbar-nav .nav-link {
        padding-right: 1rem !important;
        padding-left: 1rem !important;
    }
    #search {
        width: 83%;
    }

</style>
