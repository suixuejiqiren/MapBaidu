<template>
  <div>
    <el-container :style="{height: layout.windowHeight}">
      <el-card shadow="hover" :body-style="{ padding: '0px' }" style="width: 300px;">
        <div>
          <el-aside>
            <el-container>
              <el-header
                style="height: 35px;background-color: #E0ECFF;text-align: left;line-height: 35px;font-size: larger">
                配置项
              </el-header>
              <el-main style="padding:0px;">
                <el-input
                  placeholder="输入关键字进行过滤"
                  v-model="filterText"
                  style="margin: 5px 0px 5px 0px">
                </el-input>
                <el-tree :data="treeData"  :style="{height: layout.treeHeight,'overflow': 'auto'}"
                         :props="defaultProps"
                         @node-click="handleNodeClick"
                         :filter-node-method="filterNode"
                         ref="tree"
                         highlight-current>
                </el-tree>
              </el-main>
            </el-container>
          </el-aside>
        </div>
      </el-card>
      <el-main style="padding: 0px 0px 0px 5px">
        <div v-if="showPropPage">
          <el-container>
            <el-main style="padding: 0px">
              <el-card :body-style="{ padding: '0px' }" style="height: 370px;">
                <el-container>
                  <el-header
                    style="height: 35px; background-color: #E0ECFF;color: #333;text-align: left;line-height: 35px;font-size: larger">
                    配置信息
                  </el-header>
                  <el-main>
                    <el-row style="margin: 5px">
                      <el-col :span="4" style="text-align: left">
                        参数名称:
                      </el-col>
                      <el-col :span="20" style="text-align: left">
                        {{data.propName}}
                      </el-col>
                    </el-row>
                    <el-row style="margin: 5px">
                      <el-col :span="4" style="text-align: left">
                        参数中文名:
                      </el-col>
                      <el-col :span="20" style="text-align: left">
                        {{data.propCn_name}}
                      </el-col>
                    </el-row>
                    <el-row style="margin: 5px">
                      <el-col :span="4" style="text-align: left">
                        参数默认值:
                      </el-col>
                      <el-col :span="20" style="text-align: left">
                        <el-input
                          type="textarea"
                          readonly
                          :rows="4"
                          v-model="data.propDefaultValue">
                        </el-input>
                      </el-col>
                    </el-row>
                    <el-row style="margin: 5px">
                      <el-col :span="4" style="text-align: left">
                        子系统:
                      </el-col>
                      <el-col :span="20" style="text-align: left">
                        {{data.propParameterType}}
                      </el-col>
                    </el-row>
                    <el-row style="margin: 5px">
                      <el-col :span="4" style="text-align: left">
                        参数系统类别:
                      </el-col>
                      <el-col :span="20" style="text-align: left">
                        {{data.propSystemType}}
                      </el-col>
                    </el-row>
                    <!--<el-row style="margin: 5px">
                      <el-col :span="4" style="text-align: left">
                        是否用户参数:
                      </el-col>
                      <el-col :span="20" style="text-align: left">
                        {{data.propIsUserParameter}}
                      </el-col>
                    </el-row>-->
                    <el-row style="margin: 5px;">
                      <el-col :span="4" style="text-align: left">
                        参数描述:
                      </el-col>
                      <el-col :span="20" style="text-align: left">
                        <el-input
                          type="textarea"
                          readonly
                          :rows="2"
                          v-model="data.propDescription">
                        </el-input>
                      </el-col>
                    </el-row>
                  </el-main>
                </el-container>
              </el-card>
              <div style="padding: 5px 0px 0px 0px">
                <el-card shadow="hover" :body-style="{ padding: '0px'}" style="height: 300px;">
                  <el-container style="width: 600px;height:  265px;">
                    <el-header
                      style="height: 35px; background-color: #E0ECFF;color: #333;text-align: left;line-height: 35px;font-size: larger">
                      配置编辑
                    </el-header>
                    <el-main>
                      <span v-if=isUserParameter>
                        <el-row style="margin: 5px">
                          <el-col :span="4" style="text-align: left">
                            用户值:
                          </el-col>
                          <el-col :span="20" style="text-align: left">
                            <el-select v-model="data.propUserValue" value-key="propUserId" placeholder="请选择">
                              <el-option
                                v-for="propUserValue in propUserValues"
                                :key="propUserValue.propUserId"
                                :label="propUserValue.propUserId"
                                :value="propUserValue.propUserId"
                                :blur="onChange()">
                              </el-option>
                            </el-select>
                          </el-col>
                        </el-row>
                      </span>
                      <el-row style="margin: 5px">
                        <el-col :span="4" style="text-align: left">
                          参数当前值:
                        </el-col>
                        <el-col :span="20" style="text-align: left">
                          <el-input
                            type="textarea"
                            :rows="4"
                            v-model="data.propCurrentValue">
                          </el-input>
                        </el-col>
                      </el-row>
                    </el-main>
                    <el-footer style="height: 35px;line-height: 0px">
                      <el-button type="primary" size="mini" @click="saveInfo">保存
                      </el-button>
                    </el-footer>
                  </el-container>
                </el-card>
              </div>
            </el-main>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">

  import configManage from './../../http/config/configManage'

  export default{
    props: [],
    data() {
      return {
        layout: {
          windowHeight: (window.outerHeight) + 'px',
          windowWidth: window.outerWidth + 'px',
          treeHeight:(window.outerHeight-175) + 'px'
        },
        showPropPage: false,
        filterText: '',
        data: {
          propName: '',
          propCn_name: '',
          propDefaultValue: '',
          propParameterType: '',
          propSystemType: '',
          propIsUserParameter: '',
          propDescription: '',
          propCurrentValue: '',
          propUserValue: '',
          propType: '',
          propUserId: ''
        },
        propUserValues: [],
        treeData: [],
        isUserParameter: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        propLabel: ''
      };
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      onChange(){
        this.data.propCurrentValue = this.data.propUserValue.propValue;
      },
      filterNode(value, data) {
        if (!value) return true;
        if(data.label){
          return data.label.toUpperCase().indexOf(value.toUpperCase()) !== -1;
        }
      },
      handleNodeClick(data) {
        console.log(data);
        if (data.data != null) {
          if (data.data instanceof Array) {
            this.propUserValues = data.data;
            console.log(data.data[0]);
            this.data.propUserValue = data.data[0].propUserId;
            this.showPropPage = true;
            this.isUserParameter = true;
            this.data.propIsUserParameter = '是';
            this.data.propName = data.data[0].propKey;
            this.data.propCn_name = data.data[0].propText;
            this.data.propDefaultValue = data.data[0].propValueDefault;
            this.data.propParameterType = data.data[0].propApplication;
            this.data.propSystemType = data.data[0].propProfile;
            this.data.propDescription = data.data[0].propDescription;
            this.data.propCurrentValue = data.data[0].propValue;
            this.data.propType = data.data[0].propType;
            this.data.propUserId = data.data[0].propUserId;
            this.propLabel = data.label;
          } else {
            this.showPropPage = true;
            this.isUserParameter = false;
            this.data.propIsUserParameter = '否';
            this.data.propName = data.data.propKey;
            this.data.propCn_name = data.data.propText;
            this.data.propDefaultValue = data.data.propValueDefault;
            this.data.propParameterType = data.data.propApplication;
            this.data.propSystemType = data.data.propProfile;
            this.data.propDescription = data.data.propDescription;
            this.data.propCurrentValue = data.data.propValue;
            this.data.propUserValue = '';
            this.data.propType = data.data.propType;
            this.data.propUserId = data.data.propUserId;
            this.propLabel = data.label;
          }
        }
      },
      saveInfo(){
        let params = {
            propType: this.data.propType,
            propApplication: this.data.propParameterType,
            propProfile: this.data.propSystemType,
            propLabel: this.propLabel,
            propKey: this.data.propName,
            propValue: this.data.propCurrentValue,
            propUserId: this.data.propUserId
          }
        this.$confirm('是否确定保存信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          configManage.updateSysProperties(params).then((res)=>{
            console.log(res);
            this.$message({
              message: '信息保存成功!',
              type: 'success'
            });
          }).catch((ex)=>{
            console.log(ex);
            this.$alert(ex.message, '错误')
          })
        }).catch(() => {
          console.log('已取消保存!');
        });
        this.refresh();
      },
      refresh(){
        configManage.getSysPropertiesTreeData().then((res)=>{
          console.log(res);
          if(res.data.status == 0){
            this.treeData = res.data.data;
          }else {
            this.$alert(res.data.message, "提示");
          }
        }).catch((ex)=>{
          console.log(ex);
          this.$alert(ex.message, '错误')
        })
      }
    },
    created(){
      configManage.getSysPropertiesTreeData().then((res)=>{
        console.log(res);
        if(res.data.status == 0){
          this.treeData = res.data.data;
        }else {
          this.$alert(res.data.message, "提示");
        }
      }).catch((ex)=>{
        console.log(ex);
        this.$alert(ex.message, '错误')
      })
    }
  }
</script>
