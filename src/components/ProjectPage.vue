<template>
    <div class="container">
        <div v-if="projects && projects.length">
            <div v-for="project of projects">
                <div class="row">

                    <div class="col-md-4">
                        <img class="logo" alt="Vue logo" src="../assets/logos/logo1.png">
                        <br><br>
                        <p>Status: {{project.status}}</p>
                        <p>Tags:
                            <span v-for="tag in project.tags">
                                <span>{{tag}}  </span>
                            </span>
                        </p>
                    </div>

                    <div class="col-md-8">

                        <h1>{{project.name}}</h1><br><br>

                        <div class="row">
                            <div class="col-md-4">
                                <p>Organisation</p>
                            </div>
                            <div class="col-md-8">
                                <p> {{project.organisation}}</p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4">
                                <p>Description</p>
                            </div>
                            <div class="col-md-8">
                                <p>{{project.description}}</p>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-md-4">
                                <p>Requirements</p>
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
    }
</style>
