<template>
  <main class="content cart">
    <div class="container">
      <div class="cart__title">
        <h1 class="title title--big">Корзина</h1>
      </div>
      <template v-if="pizzas.length > 0">
        <cart-list />

        <cart-additional />

        <cart-form />
      </template>
      <template v-else>
        <div class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
import CartList from "@/modules/cart/components/CartList";
import CartAdditional from "@/modules/cart/components/CartAdditional";
import CartForm from "@/modules/cart/components/CartForm";
import { mapGetters } from "vuex";

export default {
  name: "CartMain",
  components: { CartList, CartAdditional, CartForm },
  computed: {
    ...mapGetters("Cart", ["pizzas"]),
  },
};
</script>
