<template>


    <div id="app">
        <vue-headful title="Contributor"/>
        <div class="container-fluid headercontainer">
            <div class="container">

                <navbar></navbar>

                <headerComponent></headerComponent>

            </div>
        </div>

        <div class="container-fluid projectlist-container">
            <div class="container">

                <filter-bar @change="onSearchInput"></filter-bar>
                <br>

                <div class="card-columns">
                    <div v-if="projects && projects.length">
                        <div v-for="project of filteredProjects" :key="project.id">
                            <div class="card" @mouseover="hoverCard(index)"
                                 @mouseout="hoverCard(-1)">
                                <img class="cardLogo" src="../assets/img/logos/logo1.png" alt="Card image cap">
                                <div class="card-body">
                                    <h4 class="card-title">{{project.title}}</h4>
                                    <p class="card-text">{{ project.shortDesc | truncate(25, ' ...') }}</p>
                                    <a v-bind:href="'projects/'+ project.id" class="btn btn-info">I'm
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
    import Header from './Header.vue';
    import FilterBar from './FilterBar.vue';
    import vueHeadful from 'vue-headful';

    export default {
        name: 'MaintPage',

        props: {
            msg: String
        },
        components: {
            'headerComponent': Header,
            'filterBar': FilterBar,
            'vue-headful': vueHeadful,
        },
        data() {
            return {
                projects: [],
                errors: [],
                filterBar: [],
                search: ""
            }
        }, methods: {
            fetchList() {
                axios.get('http://localhost:5000/api/projects', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                    }
                }).then(response => {
                    this.projects = response.data;
                })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            getImage(currentId) {
                return "../assets/img/logos/logo" + currentId + ".png"
            },

            hoverCard(selectedIndex) {
                this.selectedCard = selectedIndex
            },
            isSelected(cardIndex) {
                return this.selectedCard === cardIndex
            },

            statusFilter(status) {
                console.log(status);
                axios.get('http://localhost:5000/api/projects/filter?status=' + status, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                    }
                }).then(response => {
                    this.projects = response.data;
                    this.$forceUpdate();
                })
                    .catch(e => {
                        this.errors.push(e)
                    })


            },
            onSearchInput(value) {
                console.log("value1: " + value);
                console.log("value: " + value.search);

                this.search = value;
                console.log("search changed?: " + this.search)

            },

            /*search(keyword) {
                let filteredProjects = [];
                for (let project of this.projects) {
                    for (let key in project) {
                        if (project.hasOwnProperty(key) && typeof project[key] == "string" && project[key].includes(keyword)) {
                            filteredProjects.push(project);
                            break
                        }
                    }
                }
                this.projects = filteredProjects;
                this.$forceUpdate();

            },*/
        },
        filters: {
            truncate: function (text, length, suffix) {
                return text.substring(0, length) + suffix;
            },
        },

        computed: {
            filteredProjects() {
                return this.projects.filter(project => {
                    let searched = project.title.toLowerCase().includes(this.search.toLowerCase());
                    return searched
                })
            },

        },

        created() {
            this.fetchList();
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
        background-color: #ffe5d0;
        padding-top: 3vh;
        padding-bottom: 5vh;
        min-height: 70vh;
    }

    .card {
        box-shadow: 8px 8px 17px -6px rgba(0, 0, 0, 0.5);
        display: inline-block;
        transition: height 0.4s, box-shadow 0.4s;
    }

    .card:hover {
        box-shadow: 12px 12px 12px 0px rgba(0, 0, 0, 0.4);
    }

    .cardLogo {
        width: 10vw;
        padding-top: 1.25rem;
    }

</style>
