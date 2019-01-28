<template>
    <div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <select class="form-control" id="category">
                    <option>Select category
                    </option>
                </select>
            </div>
            <div class="form-group col-md-6">
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Search"
                           aria-label="Search" id="search">
                    <button class="btn btn-info my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
    #search {
        width: 83%;
    }
</style>