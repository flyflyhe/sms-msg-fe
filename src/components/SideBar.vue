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
                        <template slot="title">平台</template>
                        <el-menu-item index="/platform">短信服务商</el-menu-item>
                        <el-menu-item index="/secret">短信服务商密钥</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
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

