<template>
  <form action="#" method="post" class="layout-form">
    <cart-main />
    <cart-footer />
  </form>
</template>

<script>
import CartMain from "@/modules/cart/CartMain";
import CartFooter from "@/modules/cart/CartFooter";

export default {
  name: "Cart",
  components: { CartMain, CartFooter },
};
</script>
