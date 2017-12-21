<template>
  <div class="right-box">
    <!-- 问题题目 -->
    <h1 class="titile">
      <a>标题：{{questionDetail.qas_title}}</a>
    </h1>
    <div class="flg">
      标签：
      <a href="javascript:void(0);" :key="index" v-for="(item, index) in questionDetail.qas_tags">{{item}}</a>
    </div>
    <div class="line"></div>
    <!-- 问题详细描述 -->
    <div class="center">
      内容区：
      <quill-editor
        ref="myTextEditor"
        v-model="content">
      </quill-editor>
    </div>
    <div class="line"></div>
    <div class="center">
      答案区：
      <quill-editor v-model="answer">
      </quill-editor>
      <div class="line"></div>
      <a class="btn-submit" @click.prevent="transBtn">翻译</a>
      <a class="btn-submit" @click.prevent="saveBtn">保存</a>
      <a class="btn-submit" @click.prevent="deleteBtn">删除</a>
    </div>
  </div>
</template>

<script>
  import Lib from 'assets/js/Lib'
  import Api from 'assets/js/api'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import Common from 'assets/js/common'
  import { quillEditor } from 'vue-quill-editor'
  export default {
    data() {
      return {
        content: '',
        title:'',
        tag:'',
        answer:'',
        url: '',
        questionDetail: {}
      }
    },
    components: {
      quillEditor
    },
    //实例初始化最之前，无法获取到data里的数据
    beforeCreate() {},
    //在挂载开始之前被调用
    beforeMount() {
      this.getUrl('id')
    },
    //已成功挂载，相当ready()
    mounted() {
      this.getQuestionDetail()
    },
    computed: {
      editor() {
        console.log(this.$refs.myTextEditor.quill)
        return this.$refs.myTextEditor.quill
      }
    },
    //相关操作事件
    methods: {
      // 问题的原始内容接口
      getQuestionDetail() {
        Api.soStep({ 'id': this.url}).then(res => {
          if (res.code === 0) {
            this.questionDetail = res.data;
            this.content = res.data.qas_content;
            this.answer = res.data.qas_answer_one;
            this.title = res.data.qas_title;
            this.tag = res.data.qas_tags;
          } else {
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          }
        })
      },
      getUrl(id) {
        this.url = Common.getUrlQuery(id)
      },
      transBtn() {
        Api.soTrans({ 'id': this.url}).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          } else {
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          }
        })
      },
      saveBtn() {
        let data = {
          title: this.title,
          id: this.url,
          tag: this.tag.join(','),
          answer: this.answer,
          content: this.content
        };
        Api.soSaveRaw(data).then(res => {
          if (res.code === 0) {
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          } else {
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          }
        })
      },
      deleteBtn() {
        Api.soDelete({ 'id': this.url}).then(res => {
          if (res.code === 0) {
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          } else {
            this.$alert(res.msg, '消息提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          }
        })
      },
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
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
    border-bottom: 1px solid #E4E6E8;
    margin-bottom: 13px;
  }
  .titile a:nth-child(1) {
    font-size: 24px;
    color: #242729;
    display: block;
    padding: 40px 0 10px;
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
  }
  .detail {
    margin-top:10px;
    padding: 10px;
    border: 1px solid #E4E6E8;
  }
  .answer {
    padding: 10px;
    margin-bottom: 13px;
    background: #EFF0F1;
  }
  .flg {
    margin: 25px auto;
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
