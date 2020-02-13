<template>
    <el-card>
        <!-- 面包屑 -->
        <my-bread level1="权限管理" level2="角色列表"></my-bread>
        <el-row class="addrolebtn">
            <el-col>
                <el-button type="info">添加角色</el-button>
            </el-col>
        </el-row>

        <!-- 表格 -->
        <el-table
                :data="rolelist"
                style="width: 100%">

            <el-table-column
                    type="expand"
                    width="150">
                <template slot-scope="scope">
                    <el-row v-for="(item1,i) in scope.row.children" :key="i">
                        <el-col :span="4">
                            <el-tag @close="deleteRight(scope.row,item1.id)" type="success" closable>{{item1.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <el-col :span="20">
                            <el-row  v-for="(item2,i) in scope.row.children" :key="i">
                                <el-col :span="4">
                                    <el-tag @close="deleteRight(scope.row,item2.id)" type="info" closable>{{item2.authName}}</el-tag>
                                    <i class="el-icon-arrow-right"></i>
                                </el-col>
                                <el-col :span="20">
                                    <el-tag @close="deleteRight(scope.row,item3.id)" type="warning" closable v-for="(item3,i) in scope.row.children" :key="i">{{item3.authName}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <!-- 无权限的提示 -->
                    <span v-if="scope.row.children.length===0">
                        未分配权限
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    type="index"
                    label="#"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="roleName"
                    label="角色名称"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="roleDesc"
                    label="角色描述"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-row>
                        <el-button size="mini" type="primary" plain icon="el-icon-edit" circle @click="showEditUserDia(scope.row)"></el-button>
                        <el-button size="mini" type="danger" plain icon="el-icon-delete" circle @click="showDeleteUserMsgBox(scope.row.id)"></el-button>
                        <el-button
                                size="mini"
                                type="success"
                                plain icon="el-icon-check"
                                circle
                                @click="showSetRightDia(scope.row)">

                        </el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>

        <!-- 对话框 -->
        <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
            <!-- 树形结构
                data:数据源
                show-checkbox 选择框
                node-key 每个节点的唯一标识 通常时data数据源key名id
                default-expanded-keys 默认展开[要展开的节点的id]
                default-checked-keys [要选择的节点的id]
                props 配置项
                label节点的文字标题和children节点的子节点
                值都来源于data绑定的数据源中的该数据的key名'label'和'children'
            -->
            <el-tree
                    ref="tree"
                    :data="treelist"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    default-checked-keys="arrcheck"
                    :props="defaultProps">
            </el-tree>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
                <el-button
                        type="primary"
                        @click="setRoleRight()">确 定</el-button>
            </div>
        </el-dialog>

</el-card>
</template>

<script>
export default {
  data () {
    return {
      rolelist: [],
      dialogFormVisibleRight: false,
      // 树形结构的数据
      treelist: [],
      defaultProps: {
        lablel: 'authName',
        children: 'children'
      },
      arrexpand: [],
      arrcheck: [],
      currRoleId: -1
    }
  },
  created () {
    this.getRolelist()
  },
  methods: {
    // 修改权限-发送请求
    async setRoleRight () {
      // roleId 当前要修改权限的角色id
      // rids 树形节点中 所有全选和半全选的label的id[]
      // 获取全选的id的数组arr1
      let arr1 = this.$ref.tree.getCheckedKeys()

      // 获取半选的id的数组arr2
      let arr2 = this.$ref.tree.getHalfCheckdKeys()

      let arr = [...arr1, ...arr2]

      const res = await this.$http.post('roles/${this.currRoleId}/rights',
        {rids: arr.join(',')})
      console.log(res)
      // 更新视图
      this.getRolelist()
      // 关闭对话框
      this.dialogFormVisibleRight = false
    },
    // 修改/分配 权限
    async showSetRightDia (role) {
      this.currRoleId = role.id
      const res = await this.$http.get('rights/tree')
      console.log(res)
      this.treelist = res.data.data

      // 遍历显示树形结构中的数据
      /*      var arrtemp1 = []
      this.treelist.forEach(item1 => {
        arrtemp1.push(item1.id)
        item1.children.forEach(item2 => {
          arrtemp1.push(item2.id)
          item2.children.forEach(item3 => {
            arrtemp1.push(item3.id)
          })
        })
      })
      console.log(arrtemp1)
      this.arrexpand = arrtemp1 */

      // 获取当前角色role的权限id
      var arrtemp2 = []
      this.treelist.forEach(item1 => {
        // arrtemp2.push(item1.id)
        item1.children.forEach(item2 => {
          // arrtemp2.push(item2.id)
          item2.children.forEach(item3 => {
            arrtemp2.push(item3.id)
          })
        })
      })
      console.log(arrtemp2)
      this.arrcheck = arrtemp2

      this.dialogFormVisibleRight = true
    },
    async getRolelist () {
      const res = await this.$http.get('roles')
      this.rolelist = res.data.data
      console.log(res)
    },
    // 取消权限
    async deleteRight (role, rightId) {
      // roleId 当前角色的id
      // rightId 要删除的权限id
      const res = await this.$http.delete('roles/${role.id}/rights/${rightId}')
      console.log(res)
      // 删除成功 返回200和该角色的剩余权限
      role.children = res.data.data
    }

  }
}
</script>

<style>
    .addrolebtn{
        margin-top: 20px;
    }
</style>
