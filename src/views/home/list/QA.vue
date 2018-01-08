<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%"
      :empty-text="emptyText"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        prop="qas_id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="qas_title"
        label="标题"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="qas_tags"
        label="标签"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="qas_status"
        label="状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="statusTransfer(scope.row.qas_id)">状态流转</el-button>
          <el-button type="text" size="small"  @click="toEdit(scope.row)">校正</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px" v-show="false">
      <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <div class="block" v-show="tableData3">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Lib from 'assets/js/Lib'
import Api from 'assets/js/api'
export default {
  data() {
    return {
      checked:true,
      currentPage: 1,
      tableData3: [],
      pageSize: 15,
      totalPage: 0,
      multipleSelection: [],
      emptyText:'加载中',
      token:'',
      uid:''
    }
  },
  mounted(){
    this.uid = localStorage.getItem('uid');
    this.token = localStorage.getItem('token');
    this.soLists({p:this.currentPage,uid:this.uid,token:this.token});
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toEdit(row){
      this.$router.push({path:'/Edit',query:{id:row.qas_id}});
    },
    getUrl(id) {
      this.url = Lib.M.getUrlQuery(id);
    },
    // 状态流转
    statusTransfer(id) {
      this.$router.push({path:'/ST',query:{id:id}});
    },
    // 分页按钮的点击事件
    handleCurrentChange(val) {
      this.soLists({p:`${val}`});
    },
    // 问题列表接口
    soLists(p) {
      Api.soList(p).then(res => {
        if(res.code === 0) {
          if(res.data.data.length<1) {
            this.emptyText = '暂无数据'
            return
          }
          this.tableData3 = res.data.data;
          this.totalPage = res.data.totalPage;
        } else {
          this.emptyText = res.msg
        }
      })
    }
  }
}
</script>

<style scoped>
  .block {
    margin-top: 20px;
  }
</style>
