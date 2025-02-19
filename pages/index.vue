<template>
    <div>
        <Navbar />
        <div class="content">
            <h1>Welcome to Electron + Nuxt3</h1>
            <p>Choose an option from the navigation bar above</p>
        </div>
    </div>
</template>

<script setup>
const route = useRoute();
    useHead({
        title: 'Electron AND Nuxt3'+route.params.name,
        meta: [
            { name: 'description', content: 'Electron + Nuxt3' },
        ] 
    })


</script>

<style scoped>
.content {
    padding: 20px;
}
</style>
