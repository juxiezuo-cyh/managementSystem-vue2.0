<template>
  <div id="app">
    <c-header ref="header"></c-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import CHeader from 'components/CHeader'
  export default {
    data() {
      return {
      }
    },
    components: {
      CHeader
    },
    methods: {
      logIn() {
        // console.log(this.$refs)
      }
    },
    mounted() {
      // this.$refs.header.$refs.signUp.style.display = 'none';
      // this.$refs.header.$refs.logIn.style.display = 'none';
    }
  }
</script>

<style scoped>
  #app {
    width: 100%;
    margin: 0 auto;
  }
  .nav a.router-link-active {
    color: #535A60;
    border-top: #F69C55 solid 2px;
    border-bottom: #fff solid 1px;
    border-left: 1px solid #E4E6E8;
    border-right: 1px solid #E4E6E8;
  }
  .nav a {
    font-size: 12px;
    line-height: 39px;
    width: 60px;
    text-align: center;
    display: inline-block;
    color: #848D95;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    border-bottom: transparent solid 0px;
    border-top: transparent solid 2px;
  }
  .nav {
    border-bottom: 1px solid #E4E6E8;
    height: 41px;
    margin-bottom: 30px;
  }
</style>
