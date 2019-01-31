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
                        <a class="nav-link" href="#">TOP lists</a>
                    </li>
                </ul>
            </div>

            <div class="navbar-collapse collapse w-100 dual-collapse2 order-2 order-md-2">
                <ul class="navbar-nav mr-auto text-center">
                    <li class="nav-item">
                        <a class="nav-link" href="#/add">Add new project</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>

    </div>
</template>

<script>
    export default {}
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