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
            src="@/assets/img/cola.svg"
            width="39"
            height="60"
            :alt="additional.name"
          />
          <span>{{ additional.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <div class="counter additional-list__counter">
            <button
              type="button"
              class="counter__button counter__button--minus"
            >
              <span class="visually-hidden">Меньше</span>
            </button>
            <input
              type="text"
              name="counter"
              class="counter__input"
              value="2"
            />
            <button
              type="button"
              class="
                counter__button counter__button--plus counter__button--orange
              "
            >
              <span class="visually-hidden">Больше</span>
            </button>
          </div>

          <div class="additional-list__price">
            <b>× 56 ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartAdditional",
  computed: {
    ...mapGetters("Cart", ["additionals"]),
  },
};
</script>
