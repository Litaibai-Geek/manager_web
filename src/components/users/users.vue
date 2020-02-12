<template>
    <el-card class="box-card">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索 -->
        <el-row class="searchRow">
            <el-col>
                <el-input
                        @clear="loadUserList()"
                        clearable
                        placeholder="请输入内容"
                        v-model="query"
                        class="inputSearch">
                    <el-button slot="append" icon="el-icon-search" @click="searchUser()">
                        搜索用户
                    </el-button>
                </el-input>
                <el-button type="success" @click="showAddUserDia()">添加用户</el-button>
            </el-col>
        </el-row>

        <!-- 表格 -->
        <template>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="#"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="电话"
                        width="180">
                </el-table-column>

                <el-table-column
                        label="创建日期"
                        width="180">
                    <template slot-scope="scope">
                        {{scope.row.create_time | fmtdate}}
                    </template>
                </el-table-column>

                <el-table-column
                        label="用户状态">
                    <template slot-scope="scope">
                        <el-switch
                                @change="changeMgState(scope.row)"
                                v-model="scope.row.mg_state"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="date"
                        label="操作"
                        width="180">
                    <template slot-scope="scope">
                        <el-row>
                            <el-button size="mini" type="primary" plain icon="el-icon-edit" circle @click="showEditUserDia(scope.row)"></el-button>
                            <el-button size="mini" type="danger" plain icon="el-icon-delete" circle @click="showDeleteUserMsgBox(scope.row.id)"></el-button>
                            <el-button size="mini" type="success" plain icon="el-icon-check" circle @click="showSetUserRoleDia(scope.row)"></el-button>
                        </el-row>
                    </template>
                </el-table-column>

            </el-table>
        </template>
        <!-- 分页 -->
        <!--
            1.@size-change 每页显示条数变化时触发
            2.@current-change 当前页改变时触发
            3.current-page 设置当前页是第几页
            4.page-sizes 每页多少条的数据组
            5.page-size 设置显示多少条
            6.total 数据总数
         -->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagenum"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>

        <!-- 添加用户的对话框 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
            <el-form :model="form">
                <el-form-item label="用户名" label-width="100px">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="100px">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="100px">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" label-width="100px">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="addUser()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑用户的对话框 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleEdit">
            <el-form :model="form">
                <el-form-item label="用户名" label-width="100px">
                    <el-input disabled v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="100px">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" label-width="100px">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="editUser()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 分配角色的对话框 -->
        <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
            <el-form :model="form">
                <el-form-item label="用户名" label-width="100px">
                    {{currUsername}}
                </el-form-item>
                <el-form-item label="角色" label-width="100px">

                    <el-select v-model="currRoleId">
                        <el-option label="请选择" :value="-1"></el-option>
                        <el-option :label="item.roleName" :value="item.id"
                        v-for="(item,i) in roles" :key="i">

                        </el-option>

                    </el-select>

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
                <el-button type="primary" @click="setRole()">确 定</el-button>
            </div>
        </el-dialog>

    </el-card>

</template>

<script>
export default {
  data () {
    return {
      query: '',
      userlist: [],
      total: -1,
      pagenum: 1,
      pagesize: 2,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,

      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      // 编辑对话框的属性
      dialogFormVisibleEdit: false,
      // 分配角色对话框属性
      dialogFormVisibleRole: false,

      // 添加对话框表单数据
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },

      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],

      currRoleId: -1,
      currUsername: '',
      currUserId: '',
      roles: []
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

      // eslint-disable-next-line no-template-curly-in-string
      const res = this.$http.get('users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}')
      console.log(res)
      const {meta: {status, msg}, data: {users, total}} = res.data
      if (status === 200) {
        this.userlist = users
        this.total = total
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    },
    searchUser () {
      // 搜索用户
      this.getUserList()
    },
    // 修改状态
    async changeMgState (user) {
      // 发送请求
      const res = await this.$http.put('users/${user.id}/state/${user.mg_state}')
      console.log(res)
    },
    async addUser () {
      // 新增用户
      // 关闭对话框
      this.dialogFormVisibleAdd = false
      const res = await this.$http.post('users', this.form)
      console.log(res)
      const {meta: {status, msg}, data} = res.data
      if (status === 201) {
        // 1.提示成功
        this.$message.success(msg)
        // 2.更新视图
        this.getUserList()
        // 3.清空文本框
        this.form = {}
      } else {
        this.$message.warning(msg)
      }
    },
    showAddUserDia () {
      this.form = {}
      this.dialogFormVisibleAdd = true
    },
    loadUserList () {
      // 清空搜索框 重新获取数据
      this.getUserList()
    },
    showEditUserDia (user) {
      // 编辑用户对话框
      this.form = user
      this.dialogFormVisibleEdit = true
    },
    async showSetUserRoleDia (user) {
      // 分配角色对话框
      this.currUsername = user.username
      // 获取全部角色
      const res1 = await this.$http.put('roles')
      console.log(res1)
      this.roles = res1.data.data
      // 获取当前用户的角色id
      const res = await this.$http.put('users/${user.id}')
      console.log(res)
      this.currRoleId = res.data.data.rid
      this.dialogFormVisibleRole = true
    },
    async setRole () {
      const res = await this.$http.put('users/${this.currUserId}/role', {
        rid: this.currRoleId
      })
      console.log(res)
      this.dialogFormVisibleRole = false
    },
    async editUser () {
      // 编辑用户
      const res = await this.$http.put('users/${this.from.id}', this.form)
      // 关闭对话框
      this.dialogFormVisibleEdit = false
      // 更新视图
      this.getUserList()
    },
    showDeleteUserMsgBox (userId) {
      // 删除用户 打开消息盒子
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送删除请求
        // 获取需要删除的用户id
        const res = await this.$http.delete('user/${userId}')
        console.log(res)
        if (res.data.meta.status === 200) {
          // 更新视图
          this.pagenum = 1
          this.getUserList()
          // 提示
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      // this.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    }
  }

}
</script>

<style>
    .el-card{
        height: 100%;
    }
    .inputSearch{
        width: 300px;
    }
    .searchRow{
        margin-top: 20px;
    }
</style>
