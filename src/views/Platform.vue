<template>
    <div>
        <el-button type="primary" plain>添加服务商</el-button>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="#id"
                width="80">
            </el-table-column>
            <el-table-column
                prop="name"
                label="服务商名">
            </el-table-column>
            <el-table-column
                prop="type"
                label="地址">
            </el-table-column>
            <el-table-column
                prop="created_date"
                label="创建时间">
            </el-table-column>
        </el-table>
    </div>
</template>

 <script>
    import HttpClient from '@/tool/HttpClient.js';

    const domain = process.env.VUE_APP_DOMAIN;
    const platform = domain + '/platform';

    export default {
      data() {
        return {
          tableData: []
        }
      },
      mounted:function() {
          let that = this;
          HttpClient.hGet(platform).then((res) => {
              that.tableData = res.data
          }).catch(err => {alert(err);})
      }
    }
  </script>
