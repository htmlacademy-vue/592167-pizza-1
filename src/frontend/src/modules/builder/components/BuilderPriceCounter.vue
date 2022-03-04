<template>
  <div class="content__result">
    <p>Итого: {{ totalPrice }} ₽</p>
    <button type="button" class="button" disabled>Готовьте!</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("Builder", ["totalPrice"]),
  },
};
</script>
