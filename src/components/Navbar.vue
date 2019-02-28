<template>
    <div>
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
                        <a class="nav-link" @click="sortByView">TOP lists</a>
                    </li>
                </ul>
            </div>

            <div class="navbar-collapse collapse w-100 dual-collapse2 order-2 order-md-2">
                <ul class="navbar-nav mr-auto text-center">
                    <li class="nav-item">
                        <a class="nav-link" href="/add">Add new project</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">Contact</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" v-if="!authenticated" @click="login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" v-if="authenticated" @click="logout">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <router-view
                    :auth="auth"
                    :authenticated="authenticated">
            </router-view>
        </div>

    </div>
</template>

<script>
    import auth from '../Auth/AuthService.js';
    import axios from "axios";

    export default {
        name: 'navbar',
        data () {
            return {
                auth,
                authenticated: (localStorage.getItem('accessToken') !== null),
                errors: []
            }
        },
        created () {
            console.log("created");
             auth.authNotifier.on('authChange', authState => {
                 this.authenticated = authState.authenticated
             });

             /*if (auth.getAuthenticatedFlag() === 'true') {
                 auth.renewSession()
             }*/

             auth.handleAuthentication(()=> {
                this.$parent.fetchList();
                 axios.post('http://localhost:5000/api/user/add', JSON.stringify(localStorage.getItem('idToken')), {
                     headers: {
                         'Content-Type': 'application/json',
                         Authorization : 'Bearer ' + localStorage.getItem('accessToken')
                     }
                 })
                     .then(response => {
                         console.log("Access Granted.")
                     })
                     .catch(e => {
                         this.errors.push(e)
                     })
             });
        },
        methods: {
            login () {
                auth.login();
            },
            logout () {
                auth.logout()
            },
            sortByView() {
                this.$parent.orderByViews();
            }
        },
    }
</script>

<style scoped>
    .navbar-expand-lg .navbar-nav .nav-link {
        padding-right: 1rem !important;
        padding-left: 1rem !important;
    }

    @media (min-width: 992px) {
        .navbar {
            height: 50px;
        }
    }
</style>