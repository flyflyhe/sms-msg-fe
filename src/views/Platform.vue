<template>
    <div>
        <el-button type="primary" plain @click="openCreate">添加服务商</el-button>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column prop="id" label="#id" width="80" sortable="true" />
            <el-table-column
                prop="name"
                label="服务商名">
            </el-table-column>
            <el-table-column
                prop="type"
                label="类型">
            </el-table-column>
            <el-table-column
                prop="created_date"
                label="创建时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button  size="mini"
                        @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button  size="mini" type="danger"
                        @click="handleDelete(scope.row.id)">删除</el-button>
                </template>    
            </el-table-column>
        </el-table>

        <el-pagination background :layout="pagination.layout" 
            :total="pagination.total"
            :page-size="pagination.pageSize"
            @current-change="changePage"
            style="margin-top:20px;">
        </el-pagination>

        <el-dialog title="添加服务商" :visible.sync="dialogFormVisible">
             <el-form :model="createForm" :rules="rules" ref="createForm">
                <el-form-item label="平台名称" label-width="100px" prop="name" >
                    <el-input v-model="createForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="平台类型"  label-width="100px" prop="type">
                    <el-select v-model="createForm.type" placeholder="请选择活动区域">
                        <el-option label="短信" value="1"></el-option>
                        <el-option label="邮箱" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="createCancel">取 消</el-button>
                <el-button type="primary" @click="createSubmit">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑服务商" :visible.sync="dialogUpdateFormVisible">
             <el-form :model="updateForm" :rules="rules" ref="updateForm">
                <el-form-item label="平台名称" label-width="100px" prop="name" >
                    <el-input v-model="updateForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="平台类型"  label-width="100px" prop="type">
                    <el-select v-model="updateForm.type" placeholder="请选择活动区域">
                        <el-option v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="updateCancel">取 消</el-button>
                <el-button type="primary" @click="updateSubmit">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

 <script>
    import HttpClient from '@/tool/HttpClient.js';

    const domain = process.env.VUE_APP_DOMAIN;
    const platform = domain + '/platform';

    export default {
      data() {
        return {
            dialogFormVisible:false,
            dialogUpdateFormVisible:false,
            createForm:{
                name:'',
                type:'',
            },
            updateForm:{
                id:0,
                name:'',
                type:''
            },
            options:[
                {
                    label:"短信",
                    value:1,
                },
                {
                    label:"邮箱",
                    value:2,
                }
            ],
            pagination:{
                total:100,
                layout: 'prev, pager, next',
                pageSize:5,
            },
            rules:{
                name:[
                    { type: "string", required: true, message: '请输入服务商名称', trigger: 'blur' }
                ],
                type:[
                    {type: 'string', required: true, message: '类型不能为空', trigger: 'blur'}
                ]
            },
            tableData: []
        }
      },
      components:{
      },
      mounted:function() {
          this.initData();
      },
      methods:{
          initData:function() {
            let that = this;
            HttpClient.hGet(platform).then((res) => {
                that.tableData = res.data
                this.pagination.total = res.data.length;
            }).catch(err => {alert(err);})
          },
          openCreate:function() {
              this.dialogFormVisible = !this.dialogFormVisible;
          },
          createSubmit:function() {
              if (this.$refs['createForm'].validate((valid) => {
                  if (!valid) {
                      return false;
                  }
                  this.openCreate();
                  HttpClient.hPost(platform, this.createForm).then((res) => {
                    this.$message('添加成功'+res.data.id);
                    this.initData();
                  }).catch((err) => {alert(err.message)})
              }));
          },
          createCancel:function() {
              this.openCreate();
          },
          updateCancel:function() {
              this.dialogUpdateFormVisible = !this.dialogUpdateFormVisible;            
          },
          updateSubmit:function() {
              HttpClient.hPut(platform + "/" + this.updateForm.id, this.updateForm).then(() => {
                 this.$message('修改成功');
                 this.initData();
              }).catch((err) => {alert(err.message);});
          },
          handleDelete:function(id) {
             HttpClient.hDelete(platform+"/"+id).then(() => {
                 this.$message('删除成功');
                 this.initData();
             }).catch((err) => {alert(err.message);})
          },
          handleEdit:function(row) {
              this.dialogUpdateFormVisible = !this.dialogUpdateFormVisible;
              this.updateForm.id = row.id;
              this.updateForm.name = row.name;
              this.updateForm.type = row.type;
          },
          changePage:function(currentPage){
              alert(currentPage);
          },
      }
    }
  </script>
