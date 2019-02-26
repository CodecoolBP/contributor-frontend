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
                <input class="form-control mr-sm-2" type="text" placeholder="Search"
                       aria-label="Search" id="search" v-model="search" >
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        data() {

            return {
                selected: "OPEN",
                search: ""
            }
        },
        methods: {

            statusChange() {
                this.$parent.statusFilter(this.selected);
            },
        },
        watch: {
            search: function() {
                this.$emit('change', this.search);
            }
        }
    }
</script>

<style scoped>
    #search {
        width: 83%;
    }
</style>