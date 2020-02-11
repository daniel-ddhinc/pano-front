<template>
  <div />
</template>

<script>
import { verificationAPI } from "@/api/auth";
export default {
  async mounted() {
    const { token } = this.$route.params;
    const { data } = await verificationAPI(token);
    data && alert(data);
    this.$router.replace("/login");
  }
};
</script>
