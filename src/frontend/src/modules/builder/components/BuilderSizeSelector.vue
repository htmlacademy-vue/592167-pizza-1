<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in changeInputPizzaSize"
          :key="size.id"
          class="diameter__input"
          :class="' diameter__input--' + size.slug"
          @click="$emit('onPizzaDiameterClick', size.slug)"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.slug"
            class="visually-hidden"
            :checked="isChecked(size.slug)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import pizza from "@/static/pizza.json";
import { PIZZA_SIZE } from "@/constants";

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
  computed: {
    changeInputPizzaSize() {
      return this.pizza.sizes.map((it) => {
        it.slug = PIZZA_SIZE[it.multiplier];
        return it;
      });
    },
  },
  methods: {
    isChecked(size) {
      return size === this.pizzaDiameter;
    },
  },
};
</script>
