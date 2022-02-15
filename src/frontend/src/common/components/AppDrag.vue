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
import { MOVE, DATA_TRANSFER_PAYLOAD } from "@/constants";

export default {
  name: "AppDrag",
  props: {
    ingredientName: {
      type: String,
      default: "",
    },
    ingredientCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    onDraggable() {
      return this.ingredientCount < 3;
    },
  },
  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = MOVE;
      dataTransfer.dropEffect = MOVE;
      dataTransfer.setData(
        DATA_TRANSFER_PAYLOAD,
        JSON.stringify(this.ingredientName)
      );
    },
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
