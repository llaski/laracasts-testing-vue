<template>
    <div>
        <div v-if="!editing">
            <h1 v-text="question.title"></h1>
            <div class="body">{{ question.body }}</div>
            <button id="edit" @click="editing = true"></button>
        </div>
        <div v-if="editing">
            <input name="title" v-model="form.title" />
            <textarea name="body" v-model="form.body"></textarea>

            <button id="update" @click="update">Update</button>
            <button id="cancel" @click="cancel">Cancel</button>
        </div>

        <p v-if="feedback">Your question has been updated</p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['dataQuestion'],

    data() {
        return {
            question: this.dataQuestion,
            editing: false,
            form: {
                title: this.dataQuestion.title,
                body: this.dataQuestion.body,
            },
            feedback: false
        }
    },

    methods: {
        cancel() {
            this.editing = false
        },

        update() {
            axios.post('questions/1', this.form)
                .then(({ data }) => {
                    this.question.title = data.title
                    this.question.body = data.body
                    this.feedback = true
                })

            this.editing = false
        }
    }
}
</script>