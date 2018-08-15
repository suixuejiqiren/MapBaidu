<template>
  <div style="margin: 5px;">
    <el-row style="margin-bottom: 5px;">
      <el-col :span="6" style="text-align: left;vertical-align: middle">
        <!--<el-form ref="form" :model="role" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="role.name" style="width:200px;"></el-input>
          </el-form-item>
        </el-form>-->
        角色名称:
        <el-input v-model="role.name" style="width:200px;" size="mini"></el-input>
      </el-col>
      <el-col :span="18" style="text-align: right;">
        <el-button   type="primary" plain @click="roleSearch">查询</el-button>
        <el-button   type="success" plain @click="newRoleAdd">添加角色</el-button>
      </el-col>
    </el-row>

    <div>
      <div :style="{height:height} ">
        <el-table
          :data="tableData"
          border
          stripe
          align="center"
          max-height="680"
          style="width: 100%">
          <el-table-column
            prop="roleName"
            label="角色名称"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="roleType"
            label="角色类型"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="createUserId"
            label="角色创建者"
            align="center">
          </el-table-column>

          <el-table-column
            prop="roleDescription"
            label="角色描述"
            align="center">
          </el-table-column>
          <el-table-column label="操作"  align="center">
            <template slot-scope="scope">
              <el-button type="success"  @click="roleEdit(scope.$index, scope.row)" >编辑</el-button>
              <el-button type="danger"   @click="roleDelete(scope.$index, scope.row)"  >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row style="margin-top: 10px;">
        <!--<el-col :span="12"></el-col>-->
        <el-col>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-col>
      </el-row>


    </div>


    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogVisible">

      <el-form :rules="rules" :model="roleAdd" label-width="100px" label-position="left" ref="ruleForm" >
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色名" prop="roleName">
              <el-input v-model="roleAdd.roleName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="角色类型" prop="roleType" >
              <el-select v-model="roleAdd.roleType" placeholder="请选择角色类型"  style="width:100%">

                <el-option :key="item.roleID" :label="item.Name" :value="item.Id" v-for="item in roleTypeItems"></el-option>

              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="城市" prop="regionId">
              <el-select v-model="roleAdd.regionId" style="width:100%">
                <el-option v-for="item in roleRegionItems" :key="item.id" :label="item.regionName" :value="item.id" ></el-option>

              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" >
            <el-form-item label="角色描述" prop="roleDescription">
              <el-input type="textarea" v-model="roleAdd.roleDescription"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="可选权限">
              <el-tree
                v-model="roleAdd.resourceIds"
                :span="12"
                :data="roleData"
                show-checkbox
                node-key="id"
                ref="permitTree"
                highlight-current
                :props="defaultProps">
              </el-tree>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="roleAddCancel">取 消</el-button>
        <el-button v-if="this.dialogStatus=='create'" type="primary" @click="roleAddConfirm('ruleForm')">新增角色</el-button>

        <el-button v-if="this.dialogStatus=='update'"  type="primary" @click="roleEditConfirm('ruleForm')">编辑角色</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import role from './../../http/role/role'

  import roleAdd from './../../http/role/role'

  export default{
    data:function () {
      return{
        height:window.innerHeight-100+'px',
        role:{ name: ''},
        tableData: [],
        currentPage: 1,
        total:null,
        pageSize: 10,     //table一页显示条数
        pageSizes:[],
        dialogVisible:false,
        roleAdd:{
          roleId:'',
          roleName:'',
          roleType:'',
          roleDescription:'',
          regionId:'',
          resourceIds:''
        },
        roleData:[],
        roleTypeItems:[
          { Name: "地市用户", Id: "4" },
          { Name: "地市管理员", Id: "3" },
          { Name: "省用户", Id: "2" },
          { Name: "省管理员", Id: "1" },
          { Name: "代维用户", Id: "9" },
          { Name: "系统管理员", Id: "0" },
          { Name: "省领导", Id: "5" },
          { Name: "地市领导", Id: "6" }],    //角色类型
        roleRegionItems:[],
        defaultProps: {
          children: 'menus',
          label: 'text'
        },
        textMap:{
          'update': '角色编辑',
          'create': '角色新增'
        },
        dialogStatus:'',
        rules: {
          roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
          roleType: [{ required: true, message: '请选择角色类型', trigger: 'change' }],
          regionId: [{ required: true, message: '请选择角色所属城市', trigger: 'change' }],
          roleDescription: [{  required: true, message: '请输入角色描述', trigger: 'blur' }],
//          resourceIds: [{ required: true, message: '请选择权限', trigger: 'change' }]
        },
      }
    },
    methods:{
      roleEdit(index,row){
        console.log(row.roleId)
        this.dialogVisible=true;
        this.dialogStatus="update";

//        this.getRoles();
        this.getAllRegion()
        this.getEditList({roleId:row.roleId});
      },
      roleDelete(index,row){
        console.log(index,row)
        let params={
          roleId:row.roleId
        }
        role.deleteInfo(params).then(res=>{
          console.log(res)
          if(res.data.status==0){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            console.log(index)
            console.log(this.tableData)
            this.tableData.splice(index,1)
            console.log(this.tableData)
          }else{
            console.log(res.message);
            this.$message.error('删除失败');
          }
        })
      },
      roleSearch(){
        this.getRoleList()

      },
      newRoleAdd(){       //角色新增
//        this.$router.push({ path: 'roleAdd' })
        this.dialogVisible=true
        this.dialogStatus="create";
        console.log(this.textMap)
        this.emptyList()
//        this.getRoles();
        this.getAllRegion()

      },
      handleSizeChange(val) {
        console.log(val)
        this.pageSize=val;
        this.getRoleList()
      },
      handleCurrentChange(val) {

        console.log(`当前页: ${val}`);
        this.currentPage=val;
        this.getRoleList()
      },
//      弹窗获取角色类型（前端数据写死）
//      getRoles(){
//        role.getAllRoles().then(res=>{
//          console.log(res)
//          this.roleTypeItems=res.data
//        })
//      },
//      弹窗，获取地市信息
      getAllRegion(){
        role.getAllRegion().then(res=>{
          console.log(res.data.data)
          this.roleRegionItems=res.data.data

        })
      },

//      获取角色列表
      getRoleList(){
        let data={
          pageIndex:this.currentPage,
          pageSize:this.pageSize,
          name:this.role.name
        };
        console.log(data)
        role.getInfo(data).then(res=>{
          console.log(res)
          this.total=res.data.data.total;
          this.tableData=res.data.data.record
        })
          .catch((error) => {
            reject(error);
          })
      },
      emptyList(){
        this.roleAdd={}
      },
      handleClose(){
        console.log(1)
      },
      roleAddConfirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {

            var permitTree=this.$refs.permitTree.getCheckedNodes();
            console.log(permitTree)
            let index,resourceIds=[];
            for (var value of permitTree) {
              console.log(value.id);
              resourceIds.push(value.id)
            }
            console.log(resourceIds)
            console.log(this.roleAdd)
            this.roleAdd.resourceIds=resourceIds;
            this.addRole(this.roleAdd)

            this.dialogVisible = false;

          } else {
            console.log('error submit!!');
            this.dialogVisible = false;
            return false;

          }
        })
      },
      roleEditConfirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var permitTree=this.$refs.permitTree.getCheckedNodes();
            let index,resourceIds=[];
            for (var value of permitTree) {
              resourceIds.push(value.id)
            }

            this.roleAdd.resourceIds=resourceIds;
            let params={
              roleId:this.roleAdd.roleId,
              regionId:this.roleAdd.regionId,
              resourceIds:this.roleAdd.resourceIds,
              roleName:this.roleAdd.roleName,
              roleType:this.roleAdd.roleType,
              roleDescription:this.roleAdd.roleDescription
            }
            console.log(this.roleAdd)
            this.updateRole(params)
            this.dialogVisible = false;
          } else {
            console.log('error submit!!');
            this.dialogVisible = false;
            return false;
          }
        })

      },
      roleAddCancel(){
        this.dialogVisible=false;
      },
//      获取编辑页面列表ajax
      getEditList(id){
        role.editInfo(id).then(res=>{
          console.log(res.data.message)

          this.roleAdd=res.data.data;
        })
      },

//    获取权限列表
      getRoleAddList(){
        role.getRoleAddList().then(res=>{
          console.log(res.data);
          this.roleData=res.data
        })
      },
      //更新角色
      updateRole(params){
        role.updateRole(params).then(res=>{
          console.log(params);
          console.log(res);
          console.log(res.data.status);
          if(res.data.status == 0){
            this.$message({
              message: '角色编辑成功',
              type: 'success'
            });
          }else {
            console.log(res.data.message);
            this.$alert('这里有一个错误!', "提示");
          }
        })
      },
      //新增角色
      addRole(params){
        role.addRole(params).then(res=>{
          console.log(res.data.status)
          if(res.data.status==0){
            this.$message({
              message: '新增成功',
              type: 'success'
            });
          }else {
            console.log(res.data.message);
            this.$alert(res.data.message, "提示");
          }
        })
      },
    },

    created:function () {
      this.pageSizes = this.$conf.page.page_sizes;
      this.pageSize = this.pageSizes[0];
      console.log(role)
      this.getRoleList()
      this.getRoleAddList();
    }
  }
</script>
<style>

</style>
