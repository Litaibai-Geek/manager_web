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
                        <el-submenu :index="''+item1.order" v-for="(item1,index) in menus" :key="index">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{item1.authName}}</span>
                            </template>
                            <el-menu-item
                                    :index="item2.path"
                                    v-for="(item2,index) in item1.children" :key="index">
                                <i class="el-icon-success"></i>
                                <span>{{item2.authName}}</span>
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
  data () {
    return {
      menus: []
    }
  },

  // newVue之前自动触发此方法
  beforeCreate () {
/*    // 获取token
    const token = localStorage.getItem('token')
    // 没有token 跳转登录
    if (!token) {
      this.$router.push({name: 'login'})
    }
    // 有token 渲染组件*/
  },
  created () {
    this.getMenus()
  },
  methods: {
    // 获取左侧导航数据
    async getMenus () {
      const res = await this.$http.get('menus')
      this.menus = res.data.data
      console.log(res)
    },
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
