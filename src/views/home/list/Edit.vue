<template>
  <div class="right-box">
    <!-- 问题题目 -->
    <h1 class="titile">
      <a>中文标题：{{trans.qats_title}}</a>
    </h1>
    <h1 class="titile">
      <a>英文标题：{{raw.qas_title}}</a>
    </h1>
    <div class="flg">
      中文标签：
      <a :key="index" v-for="(item, index) in trans.qats_tags">{{item}}</a>
    </div>
    <div class="flg">
      英文标签：
      <a :key="index" v-for="(item, index) in raw.qas_tags">{{item}}</a>
    </div>
    <!-- 问题详细描述 -->
    <div class="center">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="中文内容区：" name="1">
          <quill-editor ref="ChineseContentEditor" v-model="ChineseContent">
          </quill-editor>
        </el-collapse-item>
        <el-collapse-item title="英文内容区：" name="2">
          <quill-editor ref="EnglishContentEditor" v-model="EnglishContent">
          </quill-editor>
        </el-collapse-item>
        <el-collapse-item title="中文答案区：" name="3">
          <quill-editor ref="ChineseAnswerEdit" v-model="ChineseAnswer">
          </quill-editor>
        </el-collapse-item>
        <el-collapse-item title="英文答案区：" name="4">
          <quill-editor ref="EnglishAnswerEdit" v-model="EnglishAnswer">
          </quill-editor>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="line"></div>
    <div>
      <a class="btn-submit" @click.prevent="deleteBtn">删除</a>
      <a class="btn-submit" @click.prevent="saveBtn">保存</a>
      <a class="btn-submit" @click.prevent="onLine">上线</a>
    </div>
  </div>
</template>

<script>
  import Lib from 'assets/js/Lib'
  import Api from 'assets/js/api'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  export default {
    data() {
      return {
        ChineseContent: '',
        EnglishContent: '',
        ChineseAnswer: '',
        EnglishAnswer: '',
        ChineseTag: [],
        English: [],
        EnglishTitle: '',
        ChineseTitle: '',
        url: '',
        raw: {},
        activeNames: [],
        trans: {},
        uid: '',
        token: ''
      }
    },
    components: {
      quillEditor
    },
    //实例初始化最之前，无法获取到data里的数据
    beforeCreate() {},
    //在挂载开始之前被调用
    beforeMount() {
      this.getUrl('id');
    },
    //已成功挂载，相当ready()
    mounted() {
      this.uid = localStorage.getItem('uid');
      this.token = localStorage.getItem('token');
      this.getQuestionDetail();
    },
    computed: {
      editor() {
        return this.$refs.EnglishContentEditor.quill
      }
    },
    //相关操作事件
    methods: {
      getQuestionDetail() {
        Api.soShowTrans({
          id: this.url,
          uid: this.uid,
          token: this.token
        }).then(res => {
          if (res.code === 0) {
            this.raw = res.data.raw;
            this.trans = res.data.trans;
            this.EnglishAnswer = this.raw.qas_answer_one;
            this.EnglishContent = this.raw.qas_content;
            this.ChineseAnswer = this.trans.qats_answer_one;
            this.ChineseContent = this.trans.qats_content;
          } else if (res.code === 10010 || res.code === 10011 || res.code === 10012|| res.code === 10014 || res.code === 10015){
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.href = '../index/index.html#/logIn';
              }
            });
          } else {
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          }
        })
      },
      getUrl(id) {
        this.url = Lib.M.getUrlQuery(id)
      },
      deleteBtn() {
        Api.soDelete({
          id: this.url,
          uid: this.uid,
          token: this.token
        }).then(res => {
          if (res.code === 0) {
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          } else if (res.code === 10010 || res.code === 10011 || res.code === 10012|| res.code === 10014 || res.code === 10015){
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.href = '../index/index.html#/logIn';
              }
            });
          } else {
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          }
        })
      },
      saveBtn: function() {
        Api.soTransSave({
          id: this.url,
          uid: this.uid,
          token: this.token,
          title: this.trans.qats_title,
          tag: this.trans.qats_tags.join(','),
          content: this.ChineseContent,
          answer: this.ChineseAnswer
        }).then(res => {
          if (res.code === 0) {
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          } else if (res.code === 10010 || res.code === 10011 || res.code === 10012|| res.code === 10014 || res.code === 10015){
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.href = '../index/index.html#/logIn';
              }
            });
          } else {
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          }
        })
      },
      onLine: function() {
        Api.soOnLine({
          id: this.url,
          uid: this.uid,
          token: this.token
        }).then(res => {
          if (res.code === 0) {
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          } else if (res.code === 10010 || res.code === 10011 || res.code === 10012|| res.code === 10014 || res.code === 10015){
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.href = '../index/index.html#/logIn';
              }
            });
          } else {
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          }
        })
      }
    }
  }
</script>

<style scoped>
  .quill-editor {
    margin-top: 10px;
  }

  .c-header-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }

  .btn-submit:active {
    border: none;
  }

  .line {
    box-sizing: border-box;
    padding: 10px 0;
    border-top: 1px dotted #c8ccd0;
    border-bottom: 1px dotted #c8ccd0;
    margin: 20px 0;
  }

  .titile {
    font-weight: normal;
  }

  .titile a:nth-child(1) {
    font-size: 24px;
    color: #242729;
    display: block;
    padding: 20px 0 10px;
  }

  .titile a:nth-child(2) {
    font-size: 15px;
    line-height: 25px;
    color: #39739D;
    display: block;
  }

  .center {
    display: inline-block;
    font-size: 15px;
    color: #242729;
    line-height: 22px;
    margin: 10px auto;
    width: 100%;
  }

  .detail {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #E4E6E8;
  }

  .answer {
    padding: 10px;
    margin-bottom: 13px;
    background: #EFF0F1;
  }

  .flg {
    margin: 20px auto 0;
    border-bottom: #E4E6E8;
  }

  .flg a {
    display: inline-block;
    padding: 6px 6px;
    color: #39739d;
    margin-right: 3px;
    margin-bottom: 10px;
    background-color: #E1ECF4;
    border-color: transparent;
  }

  .div-news {
    display: inline-block;
    width: 300px;
    height: 500px;
    border: #E4E6E8 1px solid;
  }

  .share-title {
    font-size: 16px;
    margin-top: 10px;
  }

  .your-answer {
    font-size: 18px;
    line-height: 55px;
    font-weight: normal;
    border-bottom: 1px solid #E4E6E8;
    margin-bottom: 15px;
  }

  .answer-list {
    padding-bottom: 15px;
    border-bottom: 1px solid #E4E6E8;
  }
</style>
