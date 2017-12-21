<template>
  <el-aside width="15%" style="minWidth:170px;background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>后台管理系统
        </template>
        <el-menu-item-group>
          <template slot="title">
            问答管理
          </template>
          <el-menu-item index="1-1" id="QA">
            <!-- 问答管理 -->
            <a href="../home/list.html">问答管理</a>
            </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">
            新闻管理
          </template>
          <el-menu-item index="1-2" id="news">
            <a >新闻管理</a>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">
            文档管理
          </template>
          <el-submenu index="1-3">
            <template slot="title">
              文档管理
            </template>
            <el-menu-item :index="item.index" :key="index" v-for="(item, index) in navList" :class="{background: currentIndex === index}">
              <a  :class="{active: currentIndex === index }">{{item.type}}</a>
            </el-menu-item>
          </el-submenu>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import Lib from "assets/js/Lib";
export default {
  data() {
    return {
      currentIndex: null,
      navList:[
        {
          index: '1-3-1',
          type: 'css'
        },
        {
          index: '1-3-2',
          type: 'html'
        },
        {
          index: '1-3-3',
          type: 'php'
        },
        {
          index: '1-3-4',
          type: 'java'
        }
      ]
    }
  },
  components: {
    // CHeader
  },
  methods: {

  }
};
</script>

<style scoped>
	.c-problem-list-nav {
		width: 728px;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #e4e6e8;
	}

	.c-problem-list {
		display: inline-block;
		margin-top: 15px;
	}

	.c-problem-list-nav:nth-child(1) {
		color: #242729;
		font-size: 18px;
	}

	.c-problem-list-nav li a {
		padding: 0 10px;
		display: inline-block;
		color: #848d95;
		margin: -3px 5px 0;
		border-left: 1px solid transparent;
		border-right: 1px solid transparent;
		border-bottom: transparent solid 1px;
		border-top: transparent solid 2px;
	}

	.c-problem-list-nav li a:hover {
		background: #f9f9fa;
		color: #535a60;
		border-bottom: #e4e6e8 solid 1px;
	}

	.c-problem-list-nav li a.active {
		background: #f9f9fa;
		color: #535a60;
		border-top: #f69c55 solid 2px;
		border-bottom: #fff solid 1px;
		border-left: 1px solid #e4e6e8;
		border-right: 1px solid #e4e6e8;
	}

	.c-problem-list-nav li a:last-child {
		margin-right: 0;
	}

	.div-news {
		display: inline-block;
		width: 300px;
		height: 500px;
		border: #e4e6e8 1px solid;
	}

  .el-aside {
    color: #333;
    background: #fff !important;
  }

	.active {
		color:#409EFF;
	}
	.background {
		background: #ebf5ff;
	}
</style>
