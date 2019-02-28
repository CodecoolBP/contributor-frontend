<template>
    <div>
        <vue-headful title="Contact"/>
        <div class="container-fluid fluidHeight">
            <navbar></navbar>
            <div class="container shadowedContainer">
                <div class="row ">
                    <div class="col-md-3 profiles leftProfile col-centered">
                        <h2 class ="cardLeftSideText" align="center">Contact</h2>
                    </div>
                    <div class="col-md-9 profiles rightProfile">
                        <p class="aboutText">E-mail: noel@backend4ever.java <br> Phone: +3682313845</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped>

    .container {
        height: 85vh;
        overflow: auto;
        text-align: center;
    }

    .row {
        height: 100%;
    }

    .aboutText {
        padding-top: 100px;
    }

    .container-fluid {
        padding: 0;
    }



</style>