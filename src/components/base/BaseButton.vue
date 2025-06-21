<template>
  <!-- Link interno com router-link -->
  <router-link
    v-if="type === 'link' && !disabled"
    :to="to"
    class="custom-btn"
    v-bind="$attrs"
  >
    <slot />
  </router-link>

  <!-- Link interno desabilitado -->
  <span v-else-if="type === 'link' && disabled" class="custom-btn disabled">
    <slot />
  </span>

  <!-- Link externo -->
  <a
    v-else-if="type === 'external' && !disabled"
    :href="to"
    target="_blank"
    rel="noopener noreferrer"
    class="custom-btn"
  >
    <slot />
  </a>

  <!-- Link externo desabilitado -->
  <span v-else-if="type === 'external' && disabled" class="custom-btn disabled">
    <slot />
  </span>

  <!-- Botão padrão -->
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
        ["button", "submit", "reset", "link", "external"].includes(value),
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

.custom-btn.disabled {
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
  text-decoration: none;
}
</style>
