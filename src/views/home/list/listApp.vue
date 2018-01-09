<template>
	<el-container>
		<el-header style="line-height:60px;">
			<c-header></c-header>
		</el-header>
		<el-container>
			<nav-side></nav-side>
      <!-- <menu-side></menu-side> -->
      <el-main>
        <router-view></router-view>
      </el-main>
		</el-container>
		<el-footer height="60px">Footer</el-footer>
	</el-container>
</template>

<script>
	import CHeader from "components/CHeader";
  import NavSide from "components/Aside";
  import MenuSide from "components/Menu";
	export default {
		components: {
			CHeader,
      NavSide,
      MenuSide
    },
    mounted(){

    },
    data() {
      return {

      }
    }
	};
</script>

<style scoped>
  .el-header {
    padding: 0 !important;
  }
</style>
