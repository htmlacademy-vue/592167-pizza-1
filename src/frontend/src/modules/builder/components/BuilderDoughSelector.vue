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
          @click="changeDough(item.id)"
        >
          <input
            type="radio"
            name="dough"
            :value="item.slug"
            :checked="isChecked(item.id)"
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
    ...mapGetters("Builder", ["doughs", "doughId"]),
  },

  methods: {
    ...mapActions("Builder", ["updateDough"]),

    isChecked(doughId) {
      return doughId === this.doughId;
    },

    changeDough(id) {
      this.updateDough(id);
    },
  },
};
</script>
