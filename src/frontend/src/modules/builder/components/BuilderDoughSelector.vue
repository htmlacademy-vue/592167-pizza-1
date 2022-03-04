<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="item in doughs"
          :key="item.id"
          class="dough__input"
          :class="' dough__input--' + item.slug"
          @click="changeDough(item.slug)"
        >
          <input
            type="radio"
            name="dough"
            :value="item.slug"
            :checked="isChecked(item.slug)"
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderDoughSelector",
  computed: {
    ...mapGetters("Builder", ["doughs", "dough"]),
  },
  methods: {
    ...mapActions("Builder", ["updateDough"]),

    isChecked(data) {
      return data === this.dough;
    },
    changeDough(dough) {
      this.updateDough(dough);
    },
  },
};
</script>
