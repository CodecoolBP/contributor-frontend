<template>
    <div class="container-fluid">
        <vue-headful title="Edit project"/>
        <navbar></navbar>

        <div class="container" v-if="project">
            <h2>Edit your project</h2>
            <form>
                <div class="form-group">
                    <label for="title">Project title</label>
                    <input type="text" class="form-control" ref="title" id="title" v-model="project.title"
                           maxlength="50" required>
                </div>
                <div class="form-group">
                    <label for="desc">Description</label>
                    <input type="text" class="form-control" id="desc" v-model="project.description" required>
                </div>
                <div class="form-group">
                    <label for="shortdesc">Short description</label>
                    <input type="text" class="form-control" id="shortdesc" v-model="project.shortDesc" maxlength="100"
                           required>
                </div>
                <div class="form-group">
                    <label for="org">Organisation</label>
                    <input type="text" class="form-control" id="org" v-model="project.organisation" required>
                </div>
                <div class="form-group">
                    <label for="req">Requirements</label>
                    <input type="text" class="form-control" id="req" v-model="project.requirements" required>
                </div>
                <div class="form-group">
                    <label for="tags">Tags</label>
                    <input type="text" class="form-control" id="tags" v-model="project.tags" required>
                </div>
                <div class="form-group">
                    <label for="img-upload">Upload your logo </label>
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
        name: "EditProject",
        components: {
            'navbar': navbar,
            'vue-headful': vueHeadful,
        },
        data() {
            return {
                project: {},
                errors: [],
                selectedFile: null,
                response: null
            }
        },
        created() {
            this.fetchList();
        },
        methods: {
            fetchList: function () {
                axios.get('http://localhost:5000/api/project/' + this.$route.params.id + '/', {
                    headers: {
                        Authorization : 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })
                    .then(response => {
                        this.project = response.data;
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            onFileChanged(event) {
                this.selectedFile = event.target.files[0];
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
                    formData["id"] = this.project.id;
                    formData["title"] = this.project.title;
                    formData["description"] = this.project.description;
                    formData["shortDesc"] = this.project.shortDesc;
                    formData["organisation"] = this.project.organisation;
                    formData["requirements"] = this.project.requirements;
                    if (this.project.tags != null) {
                        formData["tags"] = this.project.tags.toString().split(",");
                    } else {
                        formData["tags"] = null;
                    }
                    formData["image"] = base64Image;
                    let jsonData = JSON.stringify(formData);

                    //const formData = new FormData();
                    //formData.append(this.selectedFile, this.selectedFile.name);
                    axios.put('http://localhost:5000/api/project/' + this.$route.params.id, jsonData, {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization : 'Bearer ' + localStorage.getItem('accessToken')
                            }
                        }
                    ).then(() => {
                        let vm = this;
                        setTimeout(function () {
                            let url = 'http://localhost:8080/#/projects/'+vm.project.id;
                            vm.fetchList();
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
        background-color: #fffcf2;
        min-height: 100vh;
    }

    .container {
        height: 85vh;
        overflow: auto;
        margin-top: 4vh;
        margin-bottom: 4vh;
        box-shadow: 6px 7px 17px -6px rgba(0, 0, 0, 0.75);
        border: 1px solid rgba(169, 169, 169, 0.29);
        background-color: white;
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