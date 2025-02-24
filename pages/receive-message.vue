<template>
    <div style="d-flex">

        <div class="content">
            <h2 >Receive Messages</h2>
            <div class="messages">
                <div v-for="(msg, index) in messages" :key="index" class="message">
                    {{ msg }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const messages = ref([])
let unsubscribe = null

onMounted(() => {
    unsubscribe = window.electron.receive('message-from-main', (message) => {
        messages.value.push(message)
    })
})

onUnmounted(() => {
    if (unsubscribe) {
        unsubscribe()
    }
})
</script>

<style scoped>
.content {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
}

h2{
    text-align: center;
}

.messages {
    margin-top: 20px;
    display: flex; /* Enable flexbox for better layout control */
    flex-direction: column; /* Stack messages vertically */
    gap: 10px; /* Spacing between messages */
}

.message {
    padding: 12px 16px; /* Increased padding for better visual spacing */
    background-color: #f9f9f9; /* Light gray background similar to Tailwind 'gray-100' */
    border-radius: 0.5rem; /* Rounded corners, similar to Tailwind 'rounded-md' */
    border: 1px solid #e5e7eb; /* Light border, similar to Tailwind 'border-gray-200' */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth, similar to Tailwind 'shadow-sm' */
    font-size: 1rem; /* Base font size */
    line-height: 1.5rem; /* Comfortable line height for readability */
    word-wrap: break-word; /* Ensure long messages wrap */
}

/* Optional: Hover effect for interactivity */
.message:hover {
    background-color: #f4f4f5; /* Slightly darker gray on hover, similar to Tailwind 'gray-200' */
    border-color: #d4d4d8; /* Slightly darker border on hover, similar to Tailwind 'border-gray-300' */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15); /* Slightly stronger shadow on hover */
}
</style>