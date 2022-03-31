<template>
  <div v-if="notifications.length" class="notification__wrapper">
    <div
      v-for="({ text, type }, i) in notifications"
      :key="i"
      :class="`notification notification--${type}`"
    >
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppNotifications",
  computed: {
    ...mapState(["notifications"]),
  },
};
</script>

<style lang="scss" scoped>
.notification {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  padding: 20px;

  text-align: center;

  color: white;
  border-bottom: 2px solid transparent;
}

.notification--error {
  border-color: darkred;
  background: red;
}

.notification--success {
  border-color: darkgreen;
  background: lightgreen;
}

.notification__wrapper {
  position: fixed;
  top: 35px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;

  width: 420px;
  padding: 10px;
}
</style>
