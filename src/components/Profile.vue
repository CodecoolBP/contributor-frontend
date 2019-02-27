<template>
    <div>
        <vue-headful title="Profile"/>
        <div class="container-fluid">
            <navbar></navbar>
            <div class="container shadowedContainer">
                <div class="row ">
                    <div class="col-md-3 profiles leftProfile col-centered">
                        <img class="img-fluid" id="profileImg" src="../assets/img/user.png"
                             alt="Profile image">
                        <div v-if="email">
                            <p id="email">Logged in as: {{email}} </p>
                        </div>

                    </div>
                    <div class="col-md-9 profiles rightProfile">
                        <div v-if="projects && projects.length">
                            <div class="card-columns">
                                <div v-for="project of projects">
                                    <div class="card">
                                        <img class="cardLogo" v-bind:src="project.image" alt="Card image cap">
                                        <div class="card-body">
                                            <h4 class="card-title">{{project.title}}</h4>
                                            <p class="card-text">{{project.shortDesc}}</p>
                                            <div class="row">
                                                <div class="buttons">
                                                    <a v-bind:href="'/projects/'+ project.id"
                                                       class="btn btn-info a-btn-slide-text">
                                                        <span><strong>View</strong></span>
                                                    </a>
                                                    <a v-bind:href="'/projects/'+ project.id + '/edit'"
                                                       class="btn btn-info a-btn-slide-text">
                                                        <span><strong>Edit</strong></span>
                                                    </a>
                                                    <a :data-id="project.id" @click="deleteProject"
                                                       class="btn btn-info a-btn-slide-text">
                                                        <span><strong>Delete</strong></span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <p>You don't have any projects yet. </p>
                            <a class="btn btn-md btn-warning "
                               href="http://localhost:8080/add"
                               role="button" id="addproject">Add new
                                project</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    /* eslint-disable no-console */

    import axios from 'axios';
    import navbar from './Navbar.vue'
    import vueHeadful from 'vue-headful';

    export default {
        name: "Profile",
        components: {
            'navbar': navbar,
            'vue-headful': vueHeadful,
        },
        data() {
            return {
                email: "",
                projects: [],
                errors: [],
            }
        },
        methods: {
            fetchList: function () {
                axios.get('http://localhost:5000/api/user/' + this.$route.params.id + '/', {
                    headers: {
                        Authorization : 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })
                    .then(response => {
                        this.email = response.data.email;
                        this.projects = response.data.projects;
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            deleteProject: function (e) {
                let id = e.currentTarget.getAttribute('data-id');
                axios.delete('http://localhost:5000/api/project/' + id + '/', {
                    headers: {
                        Authorization : 'Bearer ' + localStorage.getItem('accessToken'),
                        idToken : localStorage.getItem('idToken')
                    }
                }).then(() => {
                    this.fetchList();
                })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },

        created() {
            this.fetchList();
        },
    }
</script>

<style scoped>
    .a-btn-slide-text {
        color: white !important;
    }

    .btn:hover {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -o-transform: scale(1.1);
    }

    .btn {
        -webkit-transform: scale(0.8);
        -moz-transform: scale(0.8);
        -o-transform: scale(0.8);
        -webkit-transition-duration: 0.5s;
        -moz-transition-duration: 0.5s;
        -o-transition-duration: 0.5s;
    }

    .container-fluid {
        padding: 0;
    }

    .leftProfile {
        background-color: #343a40;
    }

    .container {
        height: 85vh;
        overflow: auto;
        text-align: center;
    }

    .row {
        height: 100%;
    }

    .profiles {
        padding: 3vh;
    }

    .cardLogo {
        width: 7vw;
        padding-top: 1.25rem;
    }

    p {
        font-size: 1.2rem;
        margin-top: 2vh;
    }

    #email {
        margin-top: 3vh;
        color: white;
        font-weight: bolder;
    }

    .card-title, .card-text {
        font-size: 1.1rem;
    }

    .buttons {
        float: left;
        width: 100%;
    }
</style>