<template>
  <div class="content__result">
    <p>Итого: {{ sum }} ₽</p>
    <button type="button" class="button" disabled>Готовьте!</button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    sum: Number,
  },
};
</script>

<!--<style scoped>-->
<!--</style>-->
