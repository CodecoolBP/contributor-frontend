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
                        <transition-group name="list" tag="p" appear>

                        <div v-for="project of filteredProjects" :key="project.id">
                            <div class="card list-item" @mouseover="hoverCard(index)"
                                 @mouseout="hoverCard(-1)">
                                <img class="cardLogo" v-bind:src="project.image" alt="Card image cap">
                                <div class="card-body">
                                    <h4 class="card-title">{{project.title}}</h4>
                                    <p class="card-text">{{project.shortDesc}}</p>
                                    <a v-bind:href="'projects/'+ project.id" class="btn btn-info">I'm
                                        interested!</a>
                                </div>
                            </div>
                        </div>
                        </transition-group>

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
                this.search = value;
            },

            orderByViews() {
                let vm = this;
                return vm.projects.sort((a, b) => b.viewCounter - a.viewCounter);
            }


        },

        computed: {
            filteredProjects() {
                return this.projects.filter(project => {
                    let lowerSearch = this.search.toLowerCase();
                    let titleBoolean = project.title.toLowerCase().includes(lowerSearch);
                    let descBoolean = project.description.toLowerCase().includes(lowerSearch);
                    let shortBoolean = project.shortDesc.toLowerCase().includes(lowerSearch);
                    let reqBoolean = project.requirements.toLowerCase().includes(lowerSearch);
                    let orgBoolean = project.organisation.toLowerCase().includes(lowerSearch);
                    let tagBoolean;
                    for (let tag of project.tags) {
                        if (tag.toLowerCase().includes(lowerSearch)) {
                            tagBoolean = true;
                            break
                        } else {
                            tagBoolean = false;
                        }
                    }

                    return titleBoolean || descBoolean || shortBoolean || reqBoolean || orgBoolean || tagBoolean;
                })
            },
        },

        created() {
            this.fetchList();
        }

    }

</script>

<style scoped lang="scss">

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
        padding-top: 3vh;
        padding-bottom: 5vh;
        min-height: 70vh;
    }

    .card {
        display: inline-block;
        transition: all .2s ease-in-out;
        margin: 7px;
    }

    .card:hover {
        box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.5);
        transform: scale(1.03);
    }

    .cardLogo {
        width: 10vw;
        padding-top: 1.25rem;
    }

    .list-enter-active, .list-leave-active {
        transition: all 1.5s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(40px);
    }

</style>
