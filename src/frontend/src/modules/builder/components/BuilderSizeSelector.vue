<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in pizzaSizes"
          :key="size.id"
          class="diameter__input"
          :class="' diameter__input--' + size.slug"
          @click="updatePizzaSize(size.slug)"
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderSizeSelector",
  computed: {
    ...mapGetters("Builder", ["pizzaSizes", "pizzaSize"]),
  },
  methods: {
    ...mapActions("Builder", ["updateSize"]),
    updatePizzaSize(pizzaSize) {
      this.updateSize(pizzaSize);
    },

    isChecked(size) {
      return size === this.pizzaSize;
    },
  },
};
</script>
