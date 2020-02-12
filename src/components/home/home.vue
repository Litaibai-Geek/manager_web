<template>
        <el-container class="container">
            <el-header class="header">
                <el-row>
                    <el-col :span="4"><div class="grid-content bg-purple">
                        <img src="" alt="图片无法显示">
                    </div></el-col>
                    <el-col class="middle" :span="18"><div class="grid-content bg-purple-light">
                        <h3>后台管理系统</h3>
                    </div></el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple">
                            <a class="loginout" href="" @click.prevent="handleSignout">退出</a>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside class="aside" width="200px">

                    <!--侧边导航栏-->
                    <!--开启路由模式-->
                    <el-menu
                            :router="true"
                            :unique-opened="true"
                    >

                        <!-- 1 -->
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item index="users">
                                <i class="el-icon-success"></i>
                                <span></span>
                            </el-menu-item>
                        </el-submenu>

                        <!-- 2 -->
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>权限管理</span>
                            </template>
                            <el-menu-item index="2-1">
                                <i class="el-icon-location"></i>
                                <span></span>
                            </el-menu-item>
                        </el-submenu>

                        <!-- 3 -->
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>商品管理</span>
                            </template>
                            <el-menu-item index="3-1">
                                <i class="el-icon-location"></i>
                                <span>选项一</span>
                            </el-menu-item>
                        </el-submenu>

                        <!-- 4 -->
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>订单管理</span>
                            </template>
                            <el-menu-item index="4-1">
                                <i class="el-icon-location"></i>
                                <span>选项一</span>
                            </el-menu-item>
                        </el-submenu>

                        <!-- 5 -->
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>数据统计</span>
                            </template>
                            <el-menu-item index="5-1">
                                <i class="el-icon-location"></i>
                                <span>选项一</span>
                            </el-menu-item>
                        </el-submenu>

                    </el-menu>

                </el-aside>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
</template>

<script>
export default {

  // newVue之前自动触发此方法
/*  beforeCreate () {
    // 获取token
    const token = localStorage.getItem('token')
    // 没有token 跳转登录
    if (!token) {
      this.$router.push({name: 'login'})
    }
    // 有token 渲染组件
  } */
  methods: {
    handleSignout () {
      localStorage.clear()
      this.$message.success('退出成功')
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style>
    .container{
        height: 100%;
    }
    .header{
        background-color: #b3c0d1;
    }
    .aside{
        background-color: #d3dce6;
    }
    .main{
        background-color: #e9eef3;
    }
    .middle{
        text-align: center;
    }
    .loginout{
        line-height: 60px;
        text-decoration: none;
    }

</style>
