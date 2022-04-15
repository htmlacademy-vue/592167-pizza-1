<template>
  <div
    :draggable="onDraggable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { MOVE, DATA_TRANSFER_PAYLOAD, MAX_INGREDIENT_COUNT } from "@/constants";

export default {
  name: "AppDrag",
  props: {
    ingredientId: {
      type: Number,
      default: 0,
    },
    ingredientCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    onDraggable() {
      return this.ingredientCount < MAX_INGREDIENT_COUNT;
    },
  },
  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = MOVE;
      dataTransfer.dropEffect = MOVE;
      dataTransfer.setData(
        DATA_TRANSFER_PAYLOAD,
        JSON.stringify(this.ingredientId)
      );
    },
  },
};
</script>
