<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        v-for="additional of additionals"
        :key="additional.id"
        class="additional-list__item sheet"
      >
        <p class="additional-list__description">
          <img
            :src="additional.imageSrc"
            width="39"
            height="60"
            :alt="additional.name"
          />
          <span>{{ additional.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <app-item-counter
            class-counter="additional-list__counter"
            :another-class-button="'counter__button--orange'"
            :ingredient-count="getCount(additional.name, selectedAdditional)"
            :ingredient-name="additional.name"
            @changeIngredientCount="changeCount"
          />

          <div class="additional-list__price">
            <b>× {{ additional.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppItemCounter from "@/common/components/AppItemCounter";

export default {
  name: "CartAdditional",
  components: { AppItemCounter },
  computed: {
    ...mapGetters("Cart", ["additionals", "selectedAdditional"]),
  },
  methods: {
    ...mapActions("Cart", ["changeSelectedAdditional"]),
    getCount(name, selected) {
      return selected[name] ? selected[name] : 0;
    },
    changeCount(value, name) {
      const data = { [name]: value };
      this.changeSelectedAdditional(data);
    },
  },
};
</script>
