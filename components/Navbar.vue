<template>
    <nav class="navbar">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/send-message" class="nav-link">Send Message</NuxtLink>
        <NuxtLink to="/receive-message" class="nav-link">Receive Message</NuxtLink>
    </nav>
</template>

<style scoped>
.navbar {
    background-color: #333;
    padding: 1rem;
    background-color: #1e293b; /* bg-gray-800 - Dark Gray */
    padding: 1.5rem 2rem; /* py-6 px-8 - Increased padding for spaciousness */
    display: flex;
    gap: 1rem;
    gap: 2rem; /* space-x-8 - More gap between links */
    border-bottom: 1px solid #334155; /* border-b border-gray-700 - Subtle bottom border */
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow-md - Subtle shadow */
    justify-content: flex-start; /* items-start - Align items to start */
    align-items: center; /* items-center - Center items vertically */
}

.nav-link {
    background: #f58b00;
    color: #000; /* text-gray-50 - Very light gray/almost white */
    text-decoration: none;
    padding: 0.75rem 1.25rem; /* py-3 px-5 - Increased padding for links */
    border-radius: 0.375rem; /* rounded-md - Medium rounded corners */
    font-weight: 500; /* font-medium - Medium font weight */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out; /* transition-colors duration-200 */
}

.nav-link:hover {
    background-color: #374151; /* bg-gray-700 - Slightly lighter gray on hover */
    color: #ffffff; /* text-white - White text on hover */
}


</style>
