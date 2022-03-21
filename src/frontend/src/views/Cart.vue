<template>
  <form action="#" method="post" class="layout-form" @submit.prevent>
    <cart-main />
    <cart-footer @makeOrder="isOpenPopup = true"></cart-footer>
    <app-popup v-if="isOpenPopup" @closePopup="isOpenPopup = false"></app-popup>
  </form>
</template>

<script>
import CartMain from "@/modules/cart/CartMain";
import CartFooter from "@/modules/cart/CartFooter";
import AppPopup from "@/common/components/AppPopup";

export default {
  name: "Cart",
  components: { CartMain, CartFooter, AppPopup },
  data() {
    return {
      isOpenPopup: false,
    };
  },
};
</script>
