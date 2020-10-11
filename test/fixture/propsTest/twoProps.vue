<template>
  <div></div>
</template>
<script>
  export default {
    props: {
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
    },
  };
</script>

