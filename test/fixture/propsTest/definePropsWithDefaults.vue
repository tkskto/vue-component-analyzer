<template>
    <div></div>
</template>
<script setup>
withDefaults(defineProps({
    title: String,
    likes: Number
}), {
    title: 'title',
    likes: 'links',
});
</script>
