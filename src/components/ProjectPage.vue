<template>
    <body>
    <div class="container-fluid">

        <navbar></navbar>


    </div>
    <div class="container-fluid">
        <div class="container">

            <div class="bigcard" v-if="projects && projects.length">
                <div v-for="project of projects">
                    <div class="row">

                        <div class="col-md-4 col-centered">
                            <img class="logo" alt="Vue logo" src="../assets/img/logos/logo1.png">
                            <br><br>
                            <p class="ptitle">Status: {{project.status}}</p>
                            <p class="ptitle">Tags:
                                <span v-for="tag in project.tags">
                                <span>{{tag}}  </span>
                            </span>
                            </p>
                        </div>

                        <div class="col-md-8">

                            <h1 class="title display-3">{{project.name}}</h1><br><br>

                            <div class="row">
                                <div class="col-md-4">
                                    <p class="ptitle">Organisation:</p>
                                </div>
                                <div class="col-md-8">
                                    <p> {{project.organisation}}</p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <p class="ptitle">Description:</p>
                                </div>
                                <div class="col-md-8">
                                    <p>{{project.description}}</p>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-md-4">
                                    <p class="ptitle">Requirements:</p>
                                </div>
                                <div class="col-md-8">
                                    <p>{{project.requirements}}</p>
                                </div>
                            </div>


                        </div>
                    </div>


                    <div v-if="errors && errors.length">
                        <div v-for="error of errors">
                            {{error.message}}
                        </div>
                    </div>


                </div>
                <button type="button" class="btn btn-danger">CONTRIBUTE</button>
            </div>
        </div>
    </div>
    </body>

</template>

<script>
    /* eslint-disable no-console */

    import axios from 'axios';
    import Navbar from './Navbar.vue'

    export default {
        name: 'ProjectPage',
        props: {
            msg: String
        },
        components: {
            'navbar': Navbar
        },
        data() {
            return {
                projects: [],
                errors: []
            }
        },
        // Fetches projects when the component is created.
        created() {
            axios.get('http://localhost:5000/api/project/' + this.$route.params.id + '/')
                .then(response => {
                    this.projects = response.data;
                    console.log("resp: " + response.data);
                    console.log("proj" + this.projects)
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Lato:700');

    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .logo {
        width: 12vw;
        height: auto;
        padding-top: 1vh;
        padding-bottom: 2vh;
    }

    .container {
        background-color: #fffcf2;
        margin-bottom: 0px;
        height: 100%;
    }

    .col-md-8 {
        padding: 30px;

    }

    .col-md-4 {
        padding: 30px;

    }

    .title {
        padding: 30px;
    }

    html, body {
        background-color: #fffcf2;
        margin: 0px;
        height: 100%;
    }

    .container-fluid {
        padding: 0px;
    }

    .container {
        margin-top: 40px;
        background-color: white;
        box-shadow: 6px 7px 17px -6px rgba(0, 0, 0, 0.75);
        border: 1px solid rgba(169, 169, 169, 0.29);
        padding: 1vh 6vh;

    }

    .btn-danger {
        width: 15vw;
        font-weight: bold;
        margin: 0 auto 5vh;
        display: block;
    }

    .ptitle {
        font-weight: bold;
        font-size: 2vh;

    }

    .col-centered {
        display: inline-block;
        float: none;
        margin-right: -4px;
        text-align: center;
    }


</style>
