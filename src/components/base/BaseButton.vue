<template>
  <router-link
    v-if="type === 'link'"
    :to="to"
    class="custom-btn"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </router-link>
  <button
    v-else
    class="custom-btn"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    type: {
      type: String,
      default: "button",
      validator: (value) =>
        ["button", "submit", "reset", "link"].includes(value),
    },
    to: {
      type: [String, Object],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.custom-btn {
  background-color: #1f1f1f;
  font-size: 1em;
  color: white !important;
  font-weight: bold;
  margin: 0;
  padding: 10px 20px;
  cursor: pointer;
  width: auto;
  text-decoration: none;
  display: inline-block;
  border: none;
}

.custom-btn:hover {
  font-weight: bolder;
  color: white;
  background-color: #696969;
}
</style>
