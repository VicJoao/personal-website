<template>
  <div class="image-wrapper" :style="wrapperStyle">
    <img :src="src" :alt="alt" class="image" draggable="false" />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: "" },
  formato: {
    type: String,
    default: "miniatura",
    validator: (value) => ["miniatura", "banner"].includes(value),
  },
  largura: { type: String, default: "100%" },
});

const aspectRatio = computed(() => {
  // Usar proporção real do banner para ficar certinho
  return props.formato === "banner" ? "825 / 173" : "1 / 1";
});

const wrapperStyle = computed(() => ({
  width: props.largura,
  aspectRatio: aspectRatio.value,
  overflow: "hidden",
  position: "relative",
  borderRadius: "8px",
  background: "#18170d",
  minWidth: props.largura, // impede encolhimento
  flexShrink: 0, // evita que o flexbox encolha
}));
</script>

<style scoped>
.image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 4px solid #18170d;
  border-radius: 8px;
  object-position: center;
  user-select: none;
  pointer-events: none;
}
</style>
