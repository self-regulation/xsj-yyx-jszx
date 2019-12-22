<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {};
  },
  created() {
    if (this.$route.params) {
      this.active = this.$route.params.id;
      this.init();
    }
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (to.params.id != from.params.id) {
        this.active = to.params.id;
        this.init(); //重新加载数据
      }
    }
  }
};
</script>

<style scoped></style>
