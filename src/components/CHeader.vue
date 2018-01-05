<template>
  <div class="c-header-box">
    <ul class="c-nav-ul clearfix">
      <li class="c-logo c-nav fl">
        <a href="javascript:void(0);">
          <img src="../assets/img/c-logo.png">
        </a>
      </li>
      <li v-if="!isLogIn" class="fr c-sign-up" ref="signUp">
        <a href="../index/index.html#/signUp" :class="{'current-active':type === '/signUp'}">注册</a>
      </li>
      <li v-if="!isLogIn" class="c-log-in fr" ref="logIn">
        <a href="../index/index.html#/logIn"  :class="{'current-active':type === '/logIn'}">登录</a>
      </li>
      <li v-if="isLogIn" class="c-log-in fr" @click="logOut">
        <a href="javascript:void(0);">退出</a>
      </li>
      <li v-if="isLogIn" class="c-log-in fr">用户名：{{name}}</li>
    </ul>
  </div>
</template>

<script>
  import Lib from 'assets/js/Lib';
  export default {
    data() {
      return {
        name:'',
        isLogIn: false,
        type:'/logIn'
      }
    },
    mounted () {
      this.isLogIn = Lib.M.isLogin();
      (this.isLogIn===true) ? (this.name = localStorage.getItem('name')) : this.currentRouter()
    },
    watch: {
      '$route'(){//监听路由的变化
        this.currentRouter();
      }
    },
    methods: {
      currentRouter() {
        this.type = this.$route.path;
      },
      logOut() {
        localStorage.clear();//清空本地缓存
        window.location.href = '../index/index.html#/logIn';
      }
    }
  }
</script>

<style scoped>
  .c-header-box {
    background: #FAFAFB;
    line-height: 60px;
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #DBDBDB;
  }
  .c-nav-ul {
    width: 1100px;
    margin: 0 auto;
  }
  .c-nav-ul .c-logo img {
    width: 150px;
    margin-top: -8px;
    vertical-align: middle;
  }
  .c-nav-ul li {
    padding: 0 12px;
  }
  .c-nav-ul li a {
    display: inline-block;
    height: 32px;
    padding: 0 13px;
    font-size: 13px;
    background: none;
    border: 1px solid transparent;
    border-radius: 2px;
    box-shadow: none;
  }
  .c-nav-ul li.c-sign-up {
    padding: 0  12px;
  }
  .c-nav-ul li a.current-active {
    color: #FFF;
    line-height: 32px;
    background-color: #0095ff;
    border: 1px solid #07c;
    box-shadow: inset 0 1px 0 #66bfff;
  }
  .c-nav-ul .c-log-in a {
    line-height: 33px;
    padding: 0 13px;
    display: inline-block;
    border: 1px transparent solid;
  }

</style>
