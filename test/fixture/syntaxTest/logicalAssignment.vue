<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {
      value: 'a',
    }
  },
  created() {
    this.value &&= 'b';
    this.value ||= 'c';
    this.value ??= 'd';
  }
};
</script>
