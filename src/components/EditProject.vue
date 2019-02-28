<template>
    <div class="container-fluid fluidHeight">
        <vue-headful title="Edit project"/>
        <navbar></navbar>

        <div class="container shadowedContainer" v-if="project">
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
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
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
                        reader.onloadend = function () {
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
                    formData["projectOwner"] = this.project.projectOwner;
                    formData["contributors"] = this.project.contributors;
                    if (this.project.tags != null) {
                        formData["tags"] = this.project.tags.toString().split(",");
                    } else {
                        formData["tags"] = null;
                    }
                    if (base64Image) {
                        formData["image"] = base64Image;
                    } else {
                        formData["image"] = "data:image/jpeg;base64,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XTwWQVyW3BsUXtqFWflmhCw3UlSuIYRQusxddXg+AgiWcHJSEJVjmy7DegshqSpYcGEUAF9zqNMRQhkooLkFSQFYEsUzlaiJOVSIxrtQMggB8Fnb8dFv/h3/AP/aAAwDAAABEQIRAAAQ88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888/592088888888888888888888888887CzAAAQxy0888888888888888888888tDAAAAAAAAQ88888888888888888888/AAA7nMuuKAAw88888888888888888887AARJ8s88vAAB8888888888888888888xAAQV8888gAAX8888888888888888888PAAARy84hAAAE88888888888888888889AfNINLzAAAAX88888888888888888888N8887xwFHRKM8888888888888888888880c/8ADzWagkXvPPPPPPPPPPPPPPPPPPPLIwEl44AAB5vPPPPPPPPPPPPPPPPPPPPPLyAAAAABxfPPPPPPPPPPPPPPPPPPPPPPPLwSQACrvPPPPPPPPPPPPPPPPPPPPPPPPPPPjfPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPN/PPPPPPPPPPPPPPPPPmGXJM/dM4wCO5L2uPUN7ZvF/PPPPPPPO9L1DhX/wD4AK5WjlT/ALt8V1H888888888t+NMdfOt8+99cNuf9dOPe9uf8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888/8QAJBEBAAICAgICAQUAAAAAAAAAAQARITEQQCBBUWEwUHBxgMH/2gAIAQIRAT8Q/a0LgvqfTPpiWztPpBbgBrx2BHMnXuwAKPwjkb6otogCjlSI/lmKPaQXuELOanqDduVouGKbfFb5Frqe3hjPHKPvl11Fs8DNMdU8+/wKh6irlCsFvMpUy3aa7xo7JAtlkJVcsBPoShdS6nx1lbxFGoiYeBTU+2ZXCDSVr69TO+AFMFqDdwDcAa4upb64qsgH78nE1jXZFNT1wI68EbubqfZFtv6FfpDqiIMWwNEIGllwrTPRlZaRlqAxJpWY3RFr6mGUDZ+JZCioMoFYFl0QRRLLoI0MsJGgY1ePw+/G7w4kfxGNQz3muNK74HW8Q0FQUU0TfxDOM2xP8xrZ6isECv4kVkS7heDEq5YRWx3bFNke8sXFsPgTKxuFNEZXAmkW8ysHxH1gTSNAislpQlfhFt/pL//EACYRAQACAgEEAgICAwAAAAAAAAEAESExQRAgQFFhcTCRUHCAobH/2gAIAQERAT8Q/q0F1BeJ8U+KJbPKZxDbzADXbtiOZ8dbt1ACj8Oyb8VEBAFHZKO28wMc1OSg3HWpp4lyeqoWGAbe1bOtieJq9mO7co89dPEeU7AFMd096Ok+JUemNNxXmG3mIKhkMidtFffi/GdgW1LdQ55Xy9Cy0StaVL6evGzjiA0xFT0FNT55k9zkkdJnot+NTp30M0w3tEbag95gYB0WifReOishH57lqaJryRRsnDICzrz8+h8wagfMW2/wSjwlaiOBbARVFWy0VplizUpSb+lgQKLUrCtkZbhMCsyxrZEsTiLAoMKuYdk4g+iy6IdQsuFmtWAvH4eL46bvro8nuCLUxan3P+U0RYHcXJxEBePoKYEGa5un+hD19wKKhX6xFrYiv3wv3H4kVkUzBWDEsyi5cGLci24l65lQxbC2uNbG4V0EZ3AHBFVtjEHiJrKHBH5EepLpDc+BFtv/AAl//8QALRABAAECBAMJAQEBAAMAAAAAAREAITFBUWFxkaEQIFCBscHR8PEwQOFwkKD/2gAIAQAAAT8Q/wDWhMyJkE8sacjiOnWKAsPk/IVlwocM4vispNBra9fgKSCbzWOk1jruQB5Y+KRCziM8ALtPmMZe0PdqXkPF+ke9AGYu4uf8EOJLS5Gs7oNR5M60+a+atq+ODiDc8PKx8qgCmMkkbuJhxeVXiHrVfN/tcwWtR5lNBygbOBjxOVC8uVyJ4Y0hmB3XQKv9yVfq7/4pwyJVBuNHfnWCNCNlzEyfCoxQndZBu0tUZAyaB7uf+QlMoJfomVBaihp4SzyFQ4Yb5MD/AL3gVAQABKtJENyFRu4HWhApq082oJPcHr4rG6QSD3NNypImbYzV1MAiR1BwONDUHmhNQUHqFVzmSyAbfh76ZyEsP+3r4QjJBKYi4vkS0AAGB3jpoSx+x9Kk3NsVXMyxvUXjEKngMfSjliCaJksuVIBEkbI1EQifcu6BJ7t9KAWDe3Hr3pCKAiDEcmgeiwTI2evg6mNpJljPSO8pfsqw9KTCxui1vKaNIiL4Ucfnhz7kEznr3QUlZOiRWIcHiMd5B6wHvh4OaZsOAwdDvWnBP5sUt6AOk286weKeAR/LHbA4S72mDXzH3jwbcr5ClCWNz3rPBG3GSsMmg01Of8mU3cOqsHOiYuy5u/eUDF3R4Nkcfba6Y9O+LQpTcFx82W/H+RqSEjDC5Hr352cfZeDb6RzKFcxSuP8AAYIBCWAfXH+BGaRKYNH1HGgAgwO/siPB2RhB4LJ0f4ZiIRkSyNCETm8/vOjLiEiMidwwRpQAFMNbRI9PGsP4QTJL5Hyng9llj5i727jsegaq8KeGc2H5WOdGLhqPYpxqDA0PmYcqU6QhL4C1CJJcpsBJLM0LoPsC7YGkZARmVtFWsK0tjvg5TWAcZlB46vH+UvFhPFZfQ8HjtPoE9ewoEtir6leCx9MbVidzPcd7igyYiSNOKJqvpWJ7uD1v1qSdOSfuVPVUg5eE0muAaN9KNUIxX4KbMrDFWf4wEhWbGHDoHg4Hynzim6GUIUYtrralAxXCubYPf+tkLyIFyljO1ExfHtuQdAJelAyRjKBQjgz2YzopMsS8pokYYAZHiLKQm/F0hLc6cYwtJeQxU/uV7103E+rQ0MWhPloYhYKryn2okX+Cg5sUCcxi9C3WhRK4shPAtW2zCPSt3OgHWgzQ0hngJz7MN4mTq9Dn4aI4d5Js4UtsA6gvTqjYSOs1OhsJHSKvvHhzN+2wFcQ3yPOkJVwyvFh5FMVW6iuvYLUg2N+AXo5YCN9/PwojxyuAKSDWCaeQxfOKdStm4HAWocR4LLpToaxLIbD3moDU8IuHw/jjERNz5XzUmJ7T2t/hQBh3MJDRcs/m9OPhZCStwEpUTLVnodz/AL3NHMuJiNWB6wLjv9PGr2CB5HtXkWKoCn1A8fVS3WiSL0AORNGMb6B5t6VUlwUqru90MSRi0y4n0ocQgAsB4ZoHAxympWUhMkyTZ7rBG4OIVAdUkPkjRrqsFri26VMgbicsKw78lK2nAZrYq67F3jnL4dbsCfnbNLRdGW+R1/szBkYpfjelEwEfbbHiF3w1oubOpV0mxmDUcz+iBb2CwGqyKwqDCHTQeJLM3BZdRyaYEheOxsy44UIklzX+JgZg8TZnxwrHgXvl1XxVnN5Ak3+EUgqH5DfFTZKwxVnl3JJDNgZtNp11THDF5UwmO5GE2zedAAAgLAeMARNZmvOm54Eqv/T0p2XYqPWoecMwHn/5AHyksCCXs7pV3IiIowzbXHwRDiwFZyqTN0Y9K2C8E7HD2JMXKpQ3wnpWEWpRKF88iwBi0JBpSDGt+wZCwzFq1cwtoYzX4D8V+A/FfiPxUcQpm0rkV+A/FPQkdVPWhVzQJHzoV6qMSVC1xDbdQ5JBwfivwH4qcmS6Ep5Uv8lkAovDiMQVDQUwkTPvUAEAtgYBWLtOWwTea/EfivwH4r8B+KGumTJUlvwXE1BBNUHpWeDJeg37LMEE5UPKvwH4o4hYWF59gDjguwmOVfgPxX4D8UDRFDCtj/ikxAUQpOiMaisMQsbtdqmZNw6tQ0+CIQytjxpUdIxCZNk57UEwRKwyVjO1ORi2Y33GZpzJEPnub6aNqZOS2otKmqGScBmtkpLrd1jnDuV9LdU/1wkMIV+X+KOqVftkOdfh/isVwEywMpHjyAEQOZvTUKEiKneClwGKEEsm8kV9Nor6/RpdwmoGSPmmOwuTD4pOCbAsS2fMjcq30YHSZV0b0dn1Gis19uCUBIITCz4pH2QbmGPmvwPxTK+4XKrYndaQjZIJAtg+61vgyz0tUKHUFfmwGU8qtpmJiuHFk0oTETo0N0sAxMcKgJoHJkwIm9MMESVZYeENMlCIBArOlHRVRADlWZZplTVoZ7FPBZlMUuvP/EQS8oOYfE7k3kjc6SPSgAgsHYAmJ+AietPLu+XkDpR2TBObBCblW/TQTDQ2jHbhTECpiXElX0eh2dU7PSaDO3RFkgvY2pmkDIivFIKZ9nbAWYOMtfTaK+v0aJOxvRGd9KRDAnKRHpVklSw7sxU86LuGFsEFdG9HZ9Ror6DR7iiD4SPIWgEWBdgA7CFkVHg0Y2xvJDRUDFA5NDSiDCQ4VOJJNADNpiW1Q+gSIUG/BnsO6LazafflS2VaLH32v+MLVZDVPsUo6pgLidsb3z9h7oorQyGj2DKRmOUFuQUWUImYh91fYaKxhAp5nx3qa0meJFJcHDa1fR6HZ1Ts9JoUoqNhAD70m5SM5Ypfc9KeIyHi3F3nGvptFfX6NCgwkCUXIYnbUqPwYJEvGWNPgvObokehTxAnjgdjoQGasz7UlrZMdwfnuKRBlc6H1pawQTNRD1OvYHIQOaUFQPcZylFuRSRMRDk1L8si2Y4VDMRASJhDYZ4lZJtIyRRwqBBjHN8Mt6QWKJuvYtQebw/yAiWMI6vnKlUhjKZ2TCkEU7CpPCh1JIIgYQYEYzTOUxYsma2aJGPLGdTA+2qAS2ny5NqLIrndpnST50rouMVRgqSVkkJksT2Tk/iTRBk578aNqnBIWvHYVENuTMzkiOxxiRAEJMHGjELEIQEw8Ki0ul6G5RnYwvczqW5UlTItBkxipRmoQENuNEzbmZDE28q/SVfRoBNhTZIMG8kZ1CyADuaRme1qi09pIvAqchUiBxQbrUwYkvFsV7Hla0UWvOHYQphGCONFZCm7LUZPXOowlaQLwKxe0GZxQbrzadiZkELZtHlnQCxGJQvwAmjFBXisJiGDRnnTIdTOixX2tSYaCCAZBsFCDpCAV+kp2DlCmysxl/8ADv8A/9k=";
                    }
                    let jsonData = JSON.stringify(formData);

                    //const formData = new FormData();
                    //formData.append(this.selectedFile, this.selectedFile.name);
                    axios.put('http://localhost:5000/api/project/' + this.$route.params.id, jsonData, {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization : 'Bearer ' + localStorage.getItem('accessToken'),
                                idToken : localStorage.getItem('idToken')
                            }
                        }
                    ).then(() => {
                        let vm = this;
                        setTimeout(function () {
                            let url = 'http://localhost:8080/projects/' + vm.project.id;
                            vm.fetchList();
                            window.location.replace(url);
                        }, 500);
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
        height: 85vh;
        overflow: auto;
        padding: 4vh 8vh 4vh 8vh;
    }

    h2 {
        text-align: center;
    }

    .btn {
        margin: 0 auto;
        display: block;
        width: 10vw;
    }
</style>