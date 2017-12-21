<template>
  <div class="content">
    <div class="title">填写注册信息</div>
    <div class="info-list">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.email="ruleForm2.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <ul class="switch">
      <!-- <li>
        Don't have an account? <a href="" class="sign-up">注册</a>
      </li> -->
      <li>
        已有账号? <router-link to='/logIn' class="log-in-on-talent">登录</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import Lib from 'assets/js/Lib'
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
          }else {
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
        dynamicValidateForm: {
          email: ''
        },
        ruleForm2: {
          pass: '',
          checkPass: '',
          email: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      checkValue(_v, type) {
        switch (type) {
          case "username":
            let v = /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;
            if (!_v) {
              alert("真实姓名不能为空！");
              this.tagUserName = false;
            } else if (!v.test(_v)) {
              alert("真实姓名输入有误！");
              this.tagUserName = false;
            } else {
              this.tagUserName = true; //标志该输入框验证通过
            }
            break;
          case "email":
            let v1 = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
            if (!_v) {
              alert("邮箱地址不能为空！");
              this.tagEmail = false;
              return
            } else if (!v1.test(_v)) {
              alert("邮箱地址有误！");
              this.tagEmail = false;
              return
            } else {
              this.tagEmail = true;
            }
            break;
          case "password":
            let v2 = /^[A-Za-z0-9_-]+$/;
            if (!_v) {
              alert("登录密码不能为空！");
              this.tagPassWord = false;
            } else if (!v2.test(_v)) {
              alert("登录密码格式为字母和数字的组合！");
              this.tagPassWord = false;
              return
            } else {
              this.tagPassWord = true;
            }
            break;
        }
      },
      SignUp() {
        let userData = {
          'username': this.username,
          'email': this.email,
          'password': this.password
        }
        this.checkValue(userData.username, 'username');
        this.checkValue(userData.email, 'email');
        this.checkValue(userData.password, 'password');
        let params = Object.assign({}, userData); //将userData复制到{}中。并且返回给params
        if (this.tagUserName && this.tagEmail && this.tagPassWord) {
          // Api.userSignup(params).then(res => {
          //   if (res.code === 0) {
          //     window.location.href = '../../views/home/list.html'
          //   } else {
          //     alert(res.msg)
          //   }
          // })
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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
    margin-top: 150px;
  }
  .title {
    font-size: 20px;
    margin: 20px auto;
    text-align: center;
  }
  .info-list {
    width: 350px;
    padding: 25px 32px 10px 0px;;
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
