<template>
  <div class="layout-without-header">
    <app-notifications />
    <slot />
  </div>
</template>

<script>
import AppNotifications from "@/common/components/AppNotifications";
export default {
  name: "AppLayoutWithoutHeader",

  components: { AppNotifications },
};
</script>

<style lang="scss" scoped>
.layout-without-header {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
