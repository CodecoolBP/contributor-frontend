<template>
    <div>
        <div class="container-fluid">
            <navbar></navbar>
            <div class="container">
                <div class="row d-flex align-items-stretch"">
                    <div class="col-md-3 profiles leftProfile col-centered">
                        <img class="img-fluid" id="profileImg" src="../assets/img/user.png"
                             alt="Profile image">
                        <p>Logged in as: </p>

                    </div>
                    <div class="col-md-9 profiles rightProfile">Hello</div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import Navbar from './Navbar.vue'

    export default {
        name: "Profile",
        components: {
            'navbar': Navbar
        },
    }
</script>

<style scoped>
    .container-fluid {
        padding: 0;
    }

    .leftProfile {
        background-color: #343a40;

    }
    .container {
        height: 85vh;
        overflow: auto;
        margin-top: 4vh;
        margin-bottom: 4vh;
        box-shadow: 6px 7px 17px -6px rgba(0, 0, 0, 0.75);
        border: 1px solid rgba(169, 169, 169, 0.29);

    }
    .row{
        height: 100%;
    }

    .profiles{
       padding: 3vh;
    }
</style>