<template>
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="icon-circle svg-inline--fa fa-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path :fill="color" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
  </svg>
</template>

<script>
export default {
  name: 'IconCircle',
  props: {
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>

<style scoped>
.icon-circle {
  width: 7px;
}
</style>
