<template>
  <app-loader v-if="isLoaded" />
  <main v-else class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <builder-dough-selector />
        <builder-size-selector />
        <builder-ingredients-selector />
        <builder-content-pizza />
      </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderContentPizza from "@/modules/builder/components/BuilderContentPizza";
import AppLoader from "@/common/components/AppLoader";
import { mapGetters } from "vuex";

export default {
  name: "Main",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderContentPizza,
    AppLoader,
  },

  computed: {
    ...mapGetters("Builder", ["isLoaded"]),
  },
};
</script>
