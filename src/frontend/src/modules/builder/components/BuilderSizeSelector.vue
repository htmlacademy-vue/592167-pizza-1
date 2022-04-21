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
          @click="updatePizzaSize(size.id)"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.slug"
            class="visually-hidden"
            :checked="isChecked(size.id)"
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
    ...mapGetters("Builder", ["pizzaSizes", "pizzaSizeId"]),
  },
  methods: {
    ...mapActions("Builder", ["updateSize"]),
    updatePizzaSize(id) {
      this.updateSize(id);
    },

    isChecked(id) {
      return id === this.pizzaSizeId;
    },
  },
};
</script>
