<template>
    <div>
        <input class="new-reminder" v-model="newReminder" />
        <button @click="addReminder">Add reminder</button>

        <ul v-if="reminders.length">
            <li v-for="reminder in reminders" :key="reminder">
                {{ reminder }}
                <button class="delete" @click="remove(reminder)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newReminder: '',
            reminders: []
        }
    },

    methods: {
        addReminder() {
            this.reminders.push(this.newReminder)
        },

        remove(reminder) {
            this.reminders.splice(reminder, 1)
        }
    }
}
</script>