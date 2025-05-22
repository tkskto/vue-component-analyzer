<template>
    <div></div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{title: string, likes?: number}>(), {
    title: 'title',
    likes: 3,
});
</script>
