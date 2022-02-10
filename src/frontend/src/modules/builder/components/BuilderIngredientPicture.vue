<template>
  <span class="filling" :class="' filling--' + ingredientName">
    {{ ingredientRusName }}
  </span>
</template>

<script>
export default {
  name: "BuilderIngredientPicture",
  props: {
    ingredientName: String,
    ingredientRusName: String,
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
