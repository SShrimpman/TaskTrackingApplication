<template>
    <button class="btn border-0 hover:shadow-button hover:shadow-gray-500 duration-300"> {{ text }} </button>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                required: true
            }
        }
    }
</script>