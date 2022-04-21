<template>
  <div>
    <app-notifications />
    <app-layout-header :sum="sum" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppNotifications from "@/common/components/AppNotifications";

export default {
  name: "AppLayoutDefault",
  components: { AppNotifications, AppLayoutHeader },
  props: {
    sum: {
      type: Number,
      default: 0,
    },
  },
};
</script>
