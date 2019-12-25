<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <p>sub-element monospaced arrangement</p> -->

    <!-- <div class="gutter-example">
    <a-row :gutter="16">
      <a-col class="gameitem" :span="6">
        <div class="gutter-box">col-6</div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </a-col>
    </a-row>
    </div>-->

    <section class="gamelist">
      <ul class="gamelist-wrap">
        <li class="gameitem">
          <div class="gameitem-cont">
            <div class="gameitem-img">
              <img src="../assets/logo.png" />
              <div class="gameitem-intr">
                <h2 style="color:white;font-size:14px">云游戏</h2>
              </div>
              <a-button type="primary" @click="startGame()" target="_blank">启动</a-button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    // HelloWorldsrc\assets
  },
  methods: {
    startGame() {
      //     console.log(11111111111);
      //       // const params = { id: val };
      // let routeData = this.$router.resolve({
      //    name: "about",
      //   //  query: params,
      // });
      // window.open(routeData.href, '_blank');
      this.$router.push("local");
      // let routeData = this.$router.resolve({
      //   name: "local",
      //   query: { goodsId: "1111" }
      // });
      // window.open(routeData.href, "_blank");
      //  let routeUrl = this.$router.resolve({
      //       path: "/sb",
      //       query: {id:96}
      //  });
      //  window.open(routeUrl.href, '_blank');
      //  window.open("/local");
      // let routeData = this.$router.resolve({
      //   path: "/about",
      //   query: {}
      // });
      // window.open(routeData.href, "_blank");
    }
  }
};
</script>
<style scoped>
.home {
  background: url(../assets/bg.jpg) 100% 0 no-repeat;
  background-size: 100% 40%;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  opacity: 1;
  -webkit-transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* .gutter-example >>> .ant-row > div {
    background: transparent;
    border: 0;
  }
  .gutter-box {
    background: #00a0e9;
    padding: 5px 0;
  }*/
.gamelist {
  width: 100%;
  padding-top: 24px;
}

.gamelist-wrap {
  margin: -8px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}

.gameitem {
  width: 16.66666667%;
  box-sizing: border-box;
  padding: 0px;
  position: relative;
}

.gameitem-cont {
  background: #28333d;
  border-radius: 4px;
  height: 100%;
  padding: 15%;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
}

.gameitem-img {
  height: 0;
  padding-bottom: 100%;
  position: relative;
  box-sizing: border-box;
}
.gameitem-img,
.gameitem-img > img {
  width: 100%;
  border-radius: 24%;
}
</style>
