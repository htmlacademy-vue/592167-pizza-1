<template>
  <form action="#" method="post" class="layout-form" @submit.prevent>
    <cart-main ref="cartMain" />
    <cart-footer
      v-if="pizzas.length > 0"
      @makeOrder="onOrderClick"
    ></cart-footer>
    <app-popup v-if="isOpenPopup" @closePopup="onClosePopupClick" />
  </form>
</template>

<script>
import CartMain from "@/modules/cart/CartMain";
import CartFooter from "@/modules/cart/CartFooter";
import AppPopup from "@/common/components/AppPopup";
import { mapActions, mapGetters } from "vuex";
import { NEW_ADDRESS } from "@/constants";

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
    ...mapActions("Cart", ["resetCartState", "addAddress"]),
    ...mapActions("Orders", ["addOrder"]),
    onOrderClick() {
      if (this.$refs.cartMain.$refs.cartForm.validationFields()) {
        this.isOpenPopup = true;
      }
    },
    async onClosePopupClick() {
      this.isOpenPopup = false;
      let link = "/";
      if (this.isAuthenticated) {
        const fieldsValue =
          this.$refs.cartMain.$refs.cartForm.giveAddressFields();
        if (+fieldsValue[0] === NEW_ADDRESS) {
          this.addAddress(fieldsValue[1]);
        }
        link = "/orders";
        await this.addOrder();
      }
      this.resetCartState();
      await this.$router.push(link);
    },
  },
};
</script>
