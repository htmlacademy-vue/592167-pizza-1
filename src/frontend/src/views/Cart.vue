<template>
  <form action="#" method="post" class="layout-form" @submit.prevent>
    <cart-main />
    <cart-footer
      v-if="pizzas.length > 0"
      @makeOrder="isOpenPopup = true"
    ></cart-footer>
    <app-popup v-if="isOpenPopup" @closePopup="isOpenPopup = false"></app-popup>
  </form>
</template>

<script>
import CartMain from "@/modules/cart/CartMain";
import CartFooter from "@/modules/cart/CartFooter";
import AppPopup from "@/common/components/AppPopup";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: { CartMain, CartFooter, AppPopup },
  data() {
    return {
      isOpenPopup: false,
    };
  },
  computed: {
    ...mapGetters("Cart", ["pizzas"]),
  },
};
</script>
