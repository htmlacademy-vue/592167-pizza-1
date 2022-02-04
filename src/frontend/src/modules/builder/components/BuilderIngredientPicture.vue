<template>
  <span class="filling" :class="' filling--' + ingredient.name">
    {{ ingredient.rusName }}
  </span>
</template>

<script>
export default {
  name: "BuilderIngredientPicture",
  props: {
    ingredient: Object,
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
