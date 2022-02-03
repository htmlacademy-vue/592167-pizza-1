<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          class="dough__input"
          :class="' dough__input--' + getDoughThickness(item.name)"
          v-for="item in pizza.dough"
          :key="item.id"
          @click="$emit('onDoughSizeClick', getDoughThickness(item.name))"
        >
          <input
            type="radio"
            name="dough"
            :value="getDoughThickness(item.name)"
            v-model="doughSize"
            class="visually-hidden"
          />
          <b>{{ item.name }}</b>
          <span>{{ item.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import pizza from "../../../static/pizza.json";

export default {
  name: "BuilderDoughSelector",
  props: {
    doughSize: String,
  },
  data() {
    return {
      pizza,
    };
  },
  methods: {
    getDoughThickness(doughName) {
      return doughName === "Тонкое" ? `light` : `large`;
    },
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
