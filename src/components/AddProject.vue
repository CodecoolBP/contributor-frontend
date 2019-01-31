<template>
    <div class="container">
        <form>
            <div class="form-group">
                <label for="title">Project title</label>
                <input type="text" class="form-control" id="title" v-model="title" maxlength="25"
                       placeholder="Project title" required>
            </div>
            <div class="form-group">
                <label for="desc">Description</label>
                <input type="text" class="form-control" id="desc" v-model="desc"
                          placeholder="Write about the concept, tell the developers the importance of the project"
                          required>
            </div>
            <div class="form-group">
                <label for="shortdesc">Short description</label>
                <input type="text" class="form-control" id="shortdesc" v-model="shortdesc" maxlength="42"
                       placeholder="Short description to grab the contributor's attention" required>
            </div>
            <div class="form-group">
                <label for="org">Organisation</label>
                <input type="text" class="form-control" id="org" v-model="org" placeholder="Name of your organisation"
                       required>
            </div>
            <div class="form-group">
                <label for="req">Requirements</label>
                <input type="text" class="form-control" id="req" v-model="req"
                          placeholder="Requirements of the projects, for example: login/registration system, personal profile, etc. "
                          required>
            </div>
            <div class="form-group">
                <label for="tags">Tags</label>
                <input type="text" class="form-control" id="tags" v-model="tags"
                       placeholder="Enter the key concepts of the projects, separate them with comma" required>
            </div>
            <div class="form-group">
                <label for="img-upload">Upload your logo</label>
                <input type="file" id="img-upload" @change="onFileChanged" required>
            </div>
        </form>
        <button @click="onUpload">Save project</button>

    </div>

</template>

<script>
    /* eslint-disable no-console */

    import axios from 'axios';

    export default {
        name: "AddProject",
        data() {
            return {
                title: this.$refs.title,
                desc: this.$refs.desc,
                shortdesc: this.$refs.shortdesc,
                org: this.$refs.org,
                req: this.$refs.req,
                tags: this.$refs.tags,
                selectedFile: null,
                response : null
            }
        },
        methods: {

            onFileChanged(event) {
                this.selectedFile = event.target.files[0]
            },
            onUpload() {
                let formData = {};
                formData["title"] = this.title;
                formData["description"] = this.desc;
                formData["shortDesc"] = this.shortdesc;
                formData["organisation"] = this.org;
                formData["requirements"] = this.req;
                formData["tags"] = this.tags.split(",");
                let jsonData = JSON.stringify(formData);
                console.log(formData);
                console.log(jsonData);

                //const formData = new FormData();
                //formData.append(this.selectedFile, this.selectedFile.name);
                axios.post('http://localhost:5000/api/project/add', jsonData, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>