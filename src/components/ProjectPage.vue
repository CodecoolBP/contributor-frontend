<template>
    <div class="projectPageBack">
        <vue-headful :title="project.title"/>
        <div class="container-fluid">
            <navbar></navbar>
        </div>

        <div class="container-fluid fluidHeight">
            <div class="container shadowedContainer">

                <div v-if="project">
                    <div>
                        <div class="row">

                            <div class="col-md-3 profiles leftProfile col-centered">
                                <img class="logo" alt="Vue logo" v-bind:src="project.image">
                                <br><br>
                                <p class="ptitle cardLeftSideText">Status: {{project.status}}</p>
                                <p class="ptitle cardLeftSideText">Tags:
                                    <span v-for="tag in project.tags">
                                <span> {{tag}} </span>
                            </span>
                                </p>
                                <p class="ptitle cardLeftSideText">Views: {{project.viewCounter}}</p>
                            </div>

                            <div class="col-md-9 profiles rightProfile">

                                <h1 class="title display-3">{{project.title}}</h1>
                                <hr class="sexy_line">
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
                                <br>
                                <button type="button" class="btn btn-danger">CONTRIBUTE</button>
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
    </div>
</template>

<script>
    /* eslint-disable no-console */

    import axios from 'axios';
    import vueHeadful from 'vue-headful';

    export default {
        name: 'ProjectPage',
        props: {
            msg: String
        },
        components: {
            'vue-headful': vueHeadful,
        },
        data() {
            return {
                project: {},
                errors: [],
                image: null
            }
        },
        // Fetches projects when the component is created.
        created() {
            axios.get('http://localhost:5000/api/project/' + this.$route.params.id + '/', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
                .then(response => {
                    this.project = response.data;
                    console.log("resp: " + response.data);
                    console.log("proj" + this.project)
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

    .sexy_line{
        display:block;
        border:none;
        color:white;
        height:1px;
        background:black;
        background: -webkit-gradient(radial, 50% 50%, 0, 50% 50%, 350, from(dimgrey), to(#fff));
    }

    .logo {
        width: 12vw;
        height: auto;
        padding-top: 1vh;
        padding-bottom: 2vh;
    }

    .col-md-8 {
        padding: 30px;

    }

    .col-md-4 {
        padding: 30px;

    }

    .title {
        padding: 30px;
        text-align: center;
    }

    .container-fluid {
        padding: 0;
    }

    .container {
        height: 100%;
    }

    .btn-danger {
        width: 15vw;
        font-weight: bold;
        margin: 0 auto 5vh;
        display: block;
    }

    .ptitle {
        font-size: 2vh;
        font-weight: bolder;
    }

    .col-centered {
        display: inline-block;
        float: none;
        margin-right: -4px;
        text-align: center;
    }

</style>
