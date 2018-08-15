<template>

  <el-form ref="form" :model="roleAdd" label-width="100px" label-position="left" class="roleAdd-main">
    <el-row>
      <el-col :span="24">
        <el-form-item label="角色名">
          <el-input v-model="roleAdd.name"></el-input>
        </el-form-item>

      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="角色类型" >
          <el-select v-model="roleAdd.type" placeholder="地城用户"  style="width:100%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="城市" >
          <el-select v-model="roleAdd.city" style="width:100%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-form-item label="角色额描述">
          <el-input type="textarea" v-model="roleAdd.desc"></el-input>
        </el-form-item>

        <el-form-item label="可选权限">
          <el-tree
            :span="12"
            :data="roleData"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps">
          </el-tree>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12"></el-col>
      <el-col :span="6">
        <el-button type="success" @click="roleAddConfirm">确认</el-button>
        <el-button type="primary" @click="roleAddCancel">取消</el-button>
      </el-col>
    </el-row>


  </el-form>

</template>
<script>
  import roleAdd from './../../http/role/role'
  import './../../mock/role'

  export default{
    data:function () {
      return{
        roleAdd:{
          name:'',
          type:'',
          city:'',
          desc:''
        },
        roleData:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods:{
      roleAddConfirm(){
        console.log(1)
      },
      roleAddCancel(){
        console.log(1)
      }
    },
    created(){
      console.log(this.$router)
      if(this.$router.params){
          console.log(222)
      }
      roleAdd.getRoleAddList().then(res=>{
        console.log(res.data.data.data2)
        this.roleData=res.data.data.data2
      })
    }
  }
</script>
<style>
  .roleAdd-main{
    margin:20px;
  }
</style>
