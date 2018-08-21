<template>
  <div id="app">
    <el-container>
        <el-header>SMS</el-header>
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
  .el-header {
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    margin-top: 20px;
    color: #333;
  }
  
  .el-main {
    margin-top:20px;
    margin-left: 20px;
  }
</style>