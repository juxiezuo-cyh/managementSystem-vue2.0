<template>
  <div class="content">
    <div class="title">填写注册信息</div>
    <div class="info-list">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm2.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="ruleForm2.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <ul class="switch">
      <li>
        已有账号?
        <router-link to='/logIn' class="log-in-on-talent">登录</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import Lib from 'assets/js/Lib'
  import Api from 'assets/js/api'
  export default {
    data() {
      var checkName = (rule, value, callback) => {
        let v = /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          if (!v.test(value)) {
            callback(new Error('请正确输入用户名'));
          } else {
            callback();
          }
        }, 1000);
      };
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
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          email: '',
          name: ''
        },
        rules2: {
          name: [{
            validator: checkName,
            trigger: 'blur'
          }],
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: validatePass2,
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
      SignUp() {
        let userData = {
          'username': this.ruleForm2.name,
          'email': this.ruleForm2.email,
          'password': this.ruleForm2.pass
        };
        let params = Object.assign({}, userData); //将userData复制到{}中。并且返回给params
        Api.userSignup(params).then(res => {
          if (res.code === 0) {
            const data = res.data;
            localStorage.setItem('uid',data.uid);
            localStorage.setItem('token',data.token);
            localStorage.setItem('name',data.username);
            window.location.href = '../home/list.html';
          } else {
            alert(res.msg)
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.SignUp();
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

  .log-in-btn {
    height: 32px;
    padding: 3px 40px;
    font-size: 13px;
    background: none;
    border-radius: 2px;
    box-shadow: none;
    color: #FFF;
    line-height: 32px;
    background-color: #0077CC;
  }

  .more-login-options {
    line-height: 32px;
  }

  .registering {
    padding-top: 20px;
    font-size: 12px;
    text-align: center;
    color: #6A737C;
  }
</style>
