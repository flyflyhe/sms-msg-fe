<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu
            :default-active="$route.path"
            :router=true>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>短信服务</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/platform">短信服务商</el-menu-item>
                        <el-menu-item index="/secret">短信服务商密钥</el-menu-item>
                        <el-menu-item index="/send">发送短信</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
  name: "SideBar",
  methods: {
  },
  created:function(){
  }
};
</script>

