<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        v-for="item of additional"
        :key="item.id"
        class="additional-list__item sheet"
      >
        <p class="additional-list__description">
          <img :src="item.image" width="39" height="60" :alt="item.name" />
          <span>{{ item.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <app-item-counter
            class-counter="additional-list__counter"
            :another-class-button="'counter__button--orange'"
            :ingredient-count="getCount(item.name, selectedAdditional)"
            :ingredient-name="item.name"
            @changeIngredientCount="changeCount"
          />

          <div class="additional-list__price">
            <b>× {{ item.price }} ₽</b>
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
    ...mapGetters("Cart", ["additional", "selectedAdditional"]),
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
