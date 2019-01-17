<template>
    <body>
    <div class="container-fluid">

        <nav class="navbar navbar-expand-lg  bg-dark">
            <a class="navbar-brand" href="#">Navbar</a>


            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>

            </div>
        </nav>

    </div>
    <div class="container-fluid">
    <div class="container">

        <div v-if="projects && projects.length">
            <div v-for="project of projects">
                <div class="row">

                    <div class="col-md-4">
                        <img class="logo" alt="Vue logo" src="../assets/img/logos/logo1.png">
                        <br><br>
                        <p>Status: {{project.status}}</p>
                        <p>Tags:
                            <span v-for="tag in project.tags">
                                <span>{{tag}}  </span>
                            </span>
                        </p>
                    </div>

                    <div class="col-md-8">

                        <h1 class="title">{{project.name}}</h1><br><br>

                        <div class="row">
                            <div class="col-md-4">
                                <p><b>Organisation:</b></p>
                            </div>
                            <div class="col-md-8">
                                <p> {{project.organisation}}</p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4">
                                <p><b>Description:</b></p>
                            </div>
                            <div class="col-md-8">
                                <p>{{project.description}}</p>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-md-4">
                                <p><b>Requirements:</b></p>
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
        </div>
    </div>
    </div>
    </body>

</template>

<script>
    /* eslint-disable no-console */

    import axios from 'axios';

    export default {
        name: 'ProjectPage',
        props: {
            msg: String
        },
        data() {
            return {
                projects: [],
                errors: []
            }
        },
        // Fetches projects when the component is created.
        created() {
            axios.get('http://localhost:5000/contributorapi/project/'+this.$route.params.id+'/')
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
        width: 150px;
        height: 150px;
        margin-bottom: 50px;
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
        box-shadow: 6px 7px 17px -6px rgba(0, 0, 0, 0.75)
    }
</style>
