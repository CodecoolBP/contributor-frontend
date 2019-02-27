<template>
    <div class="container-fluid">
        <vue-headful title="Add project"/>
        <navbar></navbar>

        <div class="container shadowedContainer">
            <h2>Add a new project</h2>

            <form>
            <div class="form-group">
                <label for="title">Project title</label>
                <input type="text" class="form-control" id="title" v-model="title" maxlength="50"
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
                <input type="text" class="form-control" id="shortdesc" v-model="shortdesc" maxlength="100"
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
            <br>
            <button class="btn btn-success" @click="onUpload">Save project</button>

    </div>
    </div>

</template>

<script>
    /* eslint-disable no-console */

    import axios from 'axios';
    import navbar from './Navbar.vue'
    import vueHeadful from 'vue-headful';


    export default {
        name: "AddProject",
        components: {
            'navbar': navbar,
            'vue-headful': vueHeadful,
        },
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
            fileConversion() {
                if (this.selectedFile != null) {
                    return new Promise((resolve, reject) => {
                        let reader = new FileReader();
                        reader.onloadend = function() {
                            let base64Image = reader.result;
                            resolve(base64Image);
                        };
                        reader.readAsDataURL(this.selectedFile);
                    });
                } else {
                    return new Promise(resolve => resolve(null))
                }
            },
            onUpload() {
                let promise = this.fileConversion();
                promise.then((base64Image) => {
                    let formData = {};
                    formData["title"] = this.title;
                    formData["description"] = this.desc;
                    formData["shortDesc"] = this.shortdesc;
                    formData["organisation"] = this.org;
                    formData["requirements"] = this.req;
                    if (this.tags != null) {
                        formData["tags"] = this.tags.split(",");
                    } else {
                        formData["tags"] = null;
                    }
                    formData["image"] = base64Image;
                    let jsonData = JSON.stringify(formData);
                    console.log(formData);
                    console.log(jsonData);

                    //const formData = new FormData();
                    //formData.append(this.selectedFile, this.selectedFile.name);
                    axios.post('http://localhost:5000/api/project/add', jsonData, {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization : 'Bearer ' + localStorage.getItem('accessToken')
                            }
                        }
                    ).then(() => {
                        setTimeout(function () {
                            let url = 'http://localhost:8080/#/';
                            window.location.replace(url);
                        },500);
                    })
                        .catch((error) => {
                            console.log(error);
                        });
                });
            }
        }
    }
</script>

<style scoped>
    .container-fluid {
        padding: 0;
        min-height: 100vh;
    }

    .container {
        height: 100%;
        overflow: auto;
        padding: 4vh;
    }

    h2 {
        text-align: center;
    }

    .btn {
        margin:0 auto;
        display:block;
        width: 10vw;
    }
</style>