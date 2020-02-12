<template>
    <div class="login-warp">

      <el-form
        class="login-form"
        label-position="left"
        label-width="80px"
        :model="formdata">
        <h2 class="login-title">用户登录</h2>
        <el-form-item label="用户名">
          <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button
            @click.prevent="handleLogin()"
            class="login-btn"
            type="primary">登录</el-button>
          </el-form-item>
      </el-form>

    </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      this.$router.push({name: 'home'})
      const res = this.$http.post('login', this.formdata)
      // console.log(res)
      const {
        data,
        meta: {msg, status}
      } = res.data

      if (status === 200) {
        // 存储token
        localStorage.setItem('token', data.token)
        // 登录成功
        this.$message.success('登录成功！')
        // 跳转home
        this.$router.push({name: 'home'})
      } else {
        // 登录失败
        this.$message.warning('登录失败！')
      }
    }
  }
}
</script>

<style>
  .login-title{
    text-align: center;
  }
  .login-warp{
    height: 100%;
    background-image:url("../../assets/img/login-back.jpg");
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-warp .login-form{
    width: 400px;
    background-color: #ffffff;
    opacity: 0.7;
    border-radius: 5px;
    padding: 30px;
  }
  .login-warp .login-btn{
    width: 30%;
  }
  .el-form-item{
    text-align: center;
  }
</style>
