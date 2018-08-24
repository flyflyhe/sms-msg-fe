<template>
    <div>
        <el-button type="primary" size="small" @click="createOne">添加</el-button>
        <el-table :data="secretList">
            <el-table-column prop="id" label="#id" width="80" sortable="true"/>
            <el-table-column prop="platformModel.name" label="平台名" width="100"/>
            <el-table-column prop="key" label="平台key/appid" />
            <el-table-column prop="secret" label="平台secret" />
            <el-table-column prop="sign_id" label="签名id" width="80"/>
            <el-table-column prop="sign_name" label="签名name" width="100"/>
            <el-table-column prop="template" label="短信发送模板" />
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" >编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteOne(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="添加平台" :visible.sync="createFormVisible">
             <el-form :model="createForm" :rules="rules" ref="createForm">
                <el-form-item label="所属平台"  label-width="100px" prop="platform_id">
                    <el-select v-model="createForm.platform_id" placeholder="请选择活动区域">
                         <el-option v-for="item in platformOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="key/appid" label-width="100px" prop="key">
                    <el-input v-model="createForm.key" />
                </el-form-item>

                 <el-form-item label="secret" label-width="100px" prop="secret">
                    <el-input v-model="createForm.secret" />
                </el-form-item>

                 <el-form-item label="sign_id" label-width="100px" prop="sign_id">
                    <el-input v-model="createForm.sign_id" />
                 </el-form-item>

                <el-form-item label="sign_name" label-width="100px" prop="sign_name">
                    <el-input v-model="createForm.sign_name" />
                 </el-form-item>

                 <el-form-item label="template" label-width="100px" prop="template" >
                    <el-input v-model="createForm.template" placeholder="模板不能为空 模板中必须包括  {:code:} 作为发送码替换"/>
                 </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="createCancel">取 消</el-button>
                <el-button type="primary" @click="createSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import HttpClient from '@/tool/HttpClient.js';

const domain = process.env.VUE_APP_DOMAIN;
const secret = domain + '/secret';
const platform = domain + '/platform';

export default {
    data(){
        let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error("模板不能为空 模板中必须包括  {:code:} 作为发送码替换"));
                } else {
                    if (!value.includes('{:code:}')) {
                        callback(new Error('请设置{:code:}'));
                    } else {
                        callback();
                    }
                }
            
        };
        return {
            createFormVisible:false,
            secretList:[],
            createForm:{
                platform_id:'',
                key:'',
                secret:'',
                sign_id:'',
                sign_name:'',
                template:'',
            },
            rules:{
                key:[
                    {type: "string", required: true, message: 'key/appid不能为空', trigger: 'blur' }
                ],
                secret:[
                    {type: 'string', required: true, message: 'secret秘钥不能为空', trigger: 'blur'}
                ],
                template:{validator:validatePass, trigger: 'blur'}
            },
            platformOptions:[]
        }
    },
    mounted:function() {
        this.init();
    },
    methods:{
        init:function() {
            HttpClient.hGet(secret).then((res) => {
                this.secretList = res.data;
            }).catch((err) => {
                this.$message(err.message);
            });
            HttpClient.hGet(platform).then((res) => {
                res.data.forEach((item) => {
                    this.platformOptions.push({
                        label:item.name,
                        value:item.id
                    });
                });
            }).catch((err) => {
                alert(err.message);
            });
        },
        createFormVisibleCtrl:function() {
            this.createFormVisible = !this.createFormVisible;
        },
        createOne:function() {
            this.createFormVisibleCtrl();
        },
        createCancel:function() {
            this.createFormVisibleCtrl();
        },
        createSubmit:function() {
            this.$refs["createForm"].validate((valid) => {
                if (!valid) {
                    return false;
                } else {
                    HttpClient.hPost(secret, this.createForm).then(() => {
                        this.init();
                        this.$message("添加成功");
                        this.createFormVisibleCtrl();
                    }).catch((err) => {
                        alert(err.message);
                    })
                }
            });
        },
        deleteOne:function(row) {
            let id = row.id;
            this.$confirm('是否删除 id为' + id, '确认删除', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(() => {
                HttpClient.hDelete(secret + '/' + id).then(() => {
                    this.$message('删除成功');
                    this.init();
                }).then((res) => {
                    alert(res.message);
                });
            });
        },
    }
}
</script>

