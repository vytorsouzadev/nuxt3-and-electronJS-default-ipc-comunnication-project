<template>
    <nav class="navbar">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/send-message" class="nav-link">Send Message</NuxtLink>
        <NuxtLink to="/receive-message" class="nav-link">Receive Message</NuxtLink>
    </nav>
</template>

<style scoped>
.navbar {
    background-color: #1e293b;
    padding: 1.5rem 2rem;
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #1e293b;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.nav-link {
    background: #1e293b;
    color: #ffffff;
    text-decoration: none;
    padding: 0.75rem 1.25rem;
    border-radius: 0.375rem;
    font-family: 'Arial', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    border: 1px solid #ffe401;
}

.nav-link:hover {
    background-color: #ffe401;
    color: #1e293b;
}
</style>
