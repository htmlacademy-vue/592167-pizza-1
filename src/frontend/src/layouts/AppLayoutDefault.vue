<template>
  <div class="layout__default">
    <app-notifications />
    <app-layout-header />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppNotifications from "@/common/components/AppNotifications";

export default {
  name: "AppLayoutDefault",
  components: { AppNotifications, AppLayoutHeader },
};
</script>

<style lang="scss" scoped>
.layout__default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
