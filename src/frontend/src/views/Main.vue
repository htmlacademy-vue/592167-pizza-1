<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <builder-dough-selector></builder-dough-selector>
        <builder-size-selector></builder-size-selector>
        <builder-ingredients-selector></builder-ingredients-selector>
        <builder-content-pizza></builder-content-pizza>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "../static/pizza.json";
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector";
import BuilderContentPizza from "../modules/builder/components/BuilderContentPizza";

export default {
  name: "Main",
  data() {
    return { pizza };
  },
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderContentPizza,
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
