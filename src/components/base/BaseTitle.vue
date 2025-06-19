<template>
  <div class="{ underlined: underlined }">
    <h1 class="text-start">
      <span>{{ text }}</span>
    </h1>
  </div>
</template>

<script>
export default {
  name: "BaseTitle",
  props: {
    text: {
      type: String,
      required: true,
    },
    underlined: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.underlined {
  position: relative;
  display: inline-block;
  padding-bottom: 0.5em;
  border-bottom: 2px solid black;
}
</style>
