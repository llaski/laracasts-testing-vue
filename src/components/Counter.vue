<template>
    <div>
        <span class="count">{{ count }}</span>
        <button @click="count++">Increment</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: 0
            }
        }
    }
</script>