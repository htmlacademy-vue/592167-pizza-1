<template>
  <div>
    <app-layout-header :sum="sum" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutDefault",
  components: { AppLayoutHeader },
  props: {
    sum: {
      type: Number,
      default: 0,
    },
  },
};
</script>
