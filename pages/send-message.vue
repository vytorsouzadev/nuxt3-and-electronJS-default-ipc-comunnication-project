<template>
    <div style="display: flex;width: 100%;">
        <div class="content">
            <h2>Send Message</h2>
            <div class="form-container">
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
    width: 450px;
    margin: 0 auto;
    background: #1e293b;
    color: #fff !important;
    border-radius: 0 0 15px 15px;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

h2 {
    text-align: center;
    margin: 15px 0 30px 0;
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

input {
    width: 80%;
    margin: 10px 0;
    padding: 8px;
    border: 1px solid #1e293b;
    border-radius: 4px;
}

button {
    padding: 8px 16px;
    cursor: pointer;
    border: 1px solid #ffe401;
    background: #1e293b;
    color: #ffffff;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    border-radius: 4px;
    width: 60%;
}

button:hover {
    background-color: #ffe401;
    color: #1e293b;
}
</style>
