<template>
    <div>
        <Navbar />
        <div class="content">
            <h2>Send Message</h2>
            <input 
                v-model="message" 
                type="text" 
                placeholder="Type your message"
                @keydown.enter="sendMessage"  
            >
            <button @click="sendMessage">
                Send Message
            </button>
        </div>
    </div>
</template>

<script setup>
const message = ref('')

const sendMessage = () => {
    window.electron.send('message-to-main', message.value)
    message.value = ''
}
</script>

<style scoped>
.content {
    padding: 20px;
}

input {
    margin: 10px 0;
    padding: 8px;
}

button {
    padding: 8px 16px;
    margin-left: 10px;
    cursor: pointer;
}
</style>
