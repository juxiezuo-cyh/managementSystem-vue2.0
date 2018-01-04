<template>
  <div class="c-header-box">
    <ul class="c-nav-ul clearfix">
      <li class="c-logo c-nav fl">
        <a href="../home/list.html">
          <img src="../assets/img/c-logo.png">
        </a>
      </li>
      <li class="fr c-sign-up" ref="signUp">
        <router-link to="/signUp">注册</router-link>
      </li>
      <li class="c-log-in fr" ref="logIn">
        <router-link to="/logIn">登录</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {}
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
  .c-nav-ul li a.router-link-active {
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
