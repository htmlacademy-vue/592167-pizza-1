<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in pizza.sizes"
          :key="size.id"
          class="diameter__input"
          :class="' diameter__input--' + getPizzaDiameterClassName(size.name)"
          @click="
            $emit('onPizzaDiameterClick', getPizzaDiameterClassName(size.name))
          "
        >
          <input
            type="radio"
            name="diameter"
            :value="getPizzaDiameterClassName(size.name)"
            class="visually-hidden"
            :checked="isChecked(size.name)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import pizza from "@/static/pizza.json";

export default {
  name: "BuilderSizeSelector",
  props: {
    pizzaDiameter: {
      type: String,
      default: "",
    },
  },
  data() {
    return { pizza };
  },
  methods: {
    getPizzaDiameterClassName(diametr) {
      switch (diametr) {
        case "23 см":
          return "small";
        case "32 см":
          return "normal";
        default:
          return "big";
      }
    },
    isChecked(size) {
      return this.getPizzaDiameterClassName(size) === this.pizzaDiameter;
    },
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
