<template>
    <div>
        <div v-if="!editing">
            <h1>{{ question.title }}</h1>
            <p>{{ question.body }}</p>

            <button id="edit" @click="editing = true">Edit</button>
        </div>

        <div v-if="editing">
            <input type="text" name="title" v-model="form.title">
            <textarea name="body" v-model="form.body"></textarea>

            <button id="update" @click="update">Update</button>
            <button id="cancel" @click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['dataQuestion'],

    data() {
        return {
            question: this.dataQuestion,
            form: {
                title: this.dataQuestion.title,
                body: this.dataQuestion.body,
            },
            editing: false
        }
    },

    methods: {
        update() {
            console.log('got here')
            axios.post('/questions/1', this.form)
                .then((response) => {
                    console.log(response)
                    this.question.title = response.data.title
                    this.question.body = response.data.body

                    this.editing = false
                })
        },

        cancel() {
            this.editing = false
        }
    }
}
</script>