<template>
  <form action="#" method="post" class="layout-form" @submit.prevent>
    <cart-main ref="cartMain" />
    <cart-footer
      v-if="pizzas.length > 0"
      @makeOrder="onOrderClick"
    ></cart-footer>
    <app-popup v-if="isOpenPopup" @closePopup="onClosePopupClick"></app-popup>
  </form>
</template>

<script>
import CartMain from "@/modules/cart/CartMain";
import CartFooter from "@/modules/cart/CartFooter";
import AppPopup from "@/common/components/AppPopup";
import { mapActions, mapGetters } from "vuex";

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
    ...mapGetters("Auth", ["isAuthenticated"]),
  },
  methods: {
    ...mapActions("Cart", ["resetState"]),
    onOrderClick() {
      if (this.$refs.cartMain.$refs.cartForm.validationFields()) {
        this.isOpenPopup = true;
      }
    },
    onClosePopupClick() {
      this.isOpenPopup = false;
      this.resetState();
      this.$router.push(this.isAuthenticated ? "/orders" : "/");
    },
  },
};
</script>
