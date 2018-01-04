<template>
  <div class="content">
    <div class="title">填写登录信息</div>
    <div class="info-list">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="ruleForm2.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <ul class="switch">
      <li>
        没有账号？
        <router-link to="/signUp" class="sign-up">注册</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import Lib from 'assets/js/Lib';
  import Api from 'assets/js/api'
  export default {
    data() {
      var checkEmail = (rule, value, callback) => {
        let v = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        setTimeout(() => {
          if (!v.test(value)) {
            callback(new Error('请正确输入邮箱'));
          } else {
            callback();
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          email: ''
        },
        rules2: {
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          email: [{
            validator: checkEmail,
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      Login() {
        let userData = {
          'email': this.ruleForm2.email,
          'password': this.ruleForm2.pass
        };
        Api.userLogin(userData).then(res => {
          if (res.code === 0) {
            // const uid =
            // Lib.M.Rxports.addCookie('uid',)
            // window.location.href = '../home/list.html'
          } else {
            alert(res.msg)
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.Login();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .content {
    margin-top: 110px;
  }

  .title {
    font-size: 20px;
    margin: 20px auto;
    text-align: center;
  }

  .info-list {
    width: 350px;
    padding: 25px 32px 10px 0px;
    ;
    margin: 0 auto;
    border: 1px solid #E4E6E8;
  }

  .switch {
    text-align: center;
    line-height: 25px;
    width: 342px;
    padding: 20px;
    margin: 20px auto 0;
    border: 1px solid #E4E6E8;
  }

  .sign-up,
  .log-in-on-talent,
  .more-login-options {
    color: #0077CC;
  }

  label {
    font-weight: bold;
    font-size: 13px;
    line-height: 20px;
  }

  input {
    width: 263px;
    line-height: 34px;
    font-size: 100%;
    padding: 8px;
    margin-bottom: 10px;
    height: 18px;
    border: 1px solid #e4e6e8;
    border-radius: 0;
    outline: none;
    cursor: auto !important;
  }

  input:hover {
    border: #ADD8E6 1px solid;
  }

  .forgot {
    text-align: right;
    font-size: 11px;
    margin-bottom: 5px;
  }

  .forgot a {
    color: #9FA6AD;
  }

  .log-in-btn {
    height: 32px;
    padding: 3px 40px;
    font-size: 13px;
    background: none;
    border-radius: 2px;
    box-shadow: none;
    color: #FFF;
    line-height: 32px;
    display: inline-block;
    margin-left: 55px;
    background-color: #0077CC;
  }

  .more-login-options {
    line-height: 32px;
  }
</style>
