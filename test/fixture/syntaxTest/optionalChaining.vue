<template>
  <div></div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    optional() {
      return this.data?.optional;
    },
    optionalMethod() {
      return this.data?.();
    }
  }
};
</script>
