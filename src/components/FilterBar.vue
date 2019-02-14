<template>
    <div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <select class="form-control" id="category" v-model="selected" @change="statusChange">
                    <option value="OPEN">Open projects</option>
                    <option value="CLOSED">Closed projects</option>
                    <option value="INPROGRESS">In progress</option>
                </select>
            </div>
            <div class="form-group col-md-6">
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Search"
                           aria-label="Search" id="search">
                    <button class="btn btn-info my-2 my-sm-0" @click="search" type="button">Search</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        data() {

            return {
                selected: "OPEN"
            }
        },
        methods: {
            statusChange() {
                this.$parent.statusFilter(this.selected);
            },
            search(){
                let keyword = document.getElementById('search').value;
                let searchFunction = this.$parent.search;
                this.$parent.fetchList(searchFunction, keyword);
            }
        }
    }
</script>

<style scoped>
    #search {
        width: 83%;
    }
</style>