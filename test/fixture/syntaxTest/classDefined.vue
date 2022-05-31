<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {
      something: new Something(),
    };
  },
};

class Something {
  editable = false
  #prv = 'private'

  constructor() {
    this.editable = data.column;
  }
}
</script>
