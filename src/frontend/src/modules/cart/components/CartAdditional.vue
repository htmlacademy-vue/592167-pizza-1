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
            :ingredient-count="getCount(item.id, selectedAdditional)"
            @changeIngredientCount="changeCount($event, item.id)"
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

    getCount(id, selected) {
      const misc = selected?.find((it) => it.miscId === id);
      return misc ? misc.quantity : 0;
    },

    changeCount(count, id) {
      const data = {
        miscId: id,
        quantity: count,
      };
      this.changeSelectedAdditional(data);
    },
  },
};
</script>
