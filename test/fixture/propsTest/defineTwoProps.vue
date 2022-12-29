<template>
  <div></div>
</template>
<script setup>
defineProps({
  data: {
    type: String,
    required: true,
    default: '1',
  },
  data2: {
    type: Number,
    required: false,
    default: 1,
  },
});
</script>
