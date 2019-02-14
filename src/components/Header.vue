<template>

    <div class="img-wrapper">
        <img class="img-responsive" alt="Header image" src="../assets/img/titlebackground.png">
        <div class="img-overlay">
            <a class="btn btn-md btn-warning " href="http://localhost:8080/add"
               role="button" id="addproject">Add new project</a>
            <button class="btn btn-md btn-warning btn-responsive" id="seeprojects">See active projects
            </button>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>

    .img-wrapper {
        position: relative;
    }

    .img-responsive {
        max-width: 100%;
        height: auto;
    }

    .img-overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
    }

    .img-overlay:before {
        content: ' ';
        display: block;
        /* adjust 'height' to position overlay content vertically */
        height: 50%;
    }

    #addproject, #seeprojects {
        font-size: 1.5rem;
        border: 1px solid;
    }

    #addproject {
        margin-right: 8vw;
        border-color: grey;

    }

    #seeprojects {
        border-color: white;
    }

</style>