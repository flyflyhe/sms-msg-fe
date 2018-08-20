<template>
  <div id="app">
    <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">
              <side-bar />
            </el-aside>
            <el-main>
                <div>
                  <router-view/>                  
                </div>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
export default {
  name: 'App',
  components:{
    SideBar
  }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    margin-top: 20px;
    background-color: #D3DCE6;
    color: #333;
  }
  
  .el-main {
    margin-top:20px;
    background-color: rgb(233, 238, 243);
    color: #333;
    text-align: center;
    line-height: 160px;
    margin-left: 20px;
  }
</style>