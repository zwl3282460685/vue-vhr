<template>
    <div>
        <div style="margin-top: 10px; display: flex; justify-content: center">
            <el-input v-model="keywords" placeholder="通过用户名搜索用户..."
             prefix-icon="el-icon-search" style="width: 400px; margin-left: 10px"
             size="small" @keydown.enter.native="doSearch"></el-input>
            <el-button icon="el-icon-search" type="primary" size="small" style="margin-left: 5px" @click="doSearch">搜索</el-button>
        </div>
        <div class="hr-container">
            <el-card class="Hr-boxCard" v-for="(hr, index) in hrs" :key="index">
                <div slot="header" class="clearfix">
                    <span>{{hr.name}}</span>
                    <el-button style="float: right; padding: 3px 0; color: #ff5b22" type="text" icon="el-icon-delete" @click="deleteHrById(hr)"></el-button>
                </div>
                <div>
                    <div class="img-container">
                        <img :src="hr.userface" :alt="hr.name" :title="hr.name" class="userface-img">
                    </div>
                    <div class="userInfo-container">
                        <div>用户名：{{hr.name}}</div>
                        <div>手机号码：{{hr.phone}}</div>
                        <div>电话号码：{{hr.telephone}}</div>
                        <div>地址：{{hr.address}}</div>
                        <div>用户状态：
                            <el-switch
                                v-model="hr.enabled"
                                active-text="启用"
                                inactive-text="禁用"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="enabledChange(hr)"
                                >
                            </el-switch>
                        </div>
                        <div>用户角色：
                            <el-tag type="success"
                                    v-for="(role, indexj) in hr.roles"
                                    :key="indexj"
                                    size="small"
                                    style="margin-right: 2px; margin-top: 2px">
                                {{role.nameZh}}</el-tag>
                            <el-popover
                                    placement="right"
                                    title="角色列表"
                                    @show="showPop(hr)"
                                    @hide="hidePop(hr)"
                                    width="280"
                                    trigger="click">
                                <el-select v-model="selectRoles" multiple placeholder="请选择">
                                    <el-option
                                            v-for="(r, indexk) in allRoles"
                                            :key="indexk"
                                            :label="r.nameZh"
                                            :value="r.id">
                                    </el-option>
                                </el-select>
                                <el-button slot="reference" icon="el-icon-more" type="text"></el-button>
                            </el-popover>
                        </div>
                        <div>备注：{{hr.remark}}</div>
                    </div>
                </div>
            </el-card>
        </div>

    </div>
</template>

<script>
    export default {
        name: "SysHr",
        data() {
            return {
                keywords: '',
                hrs: [],
                allRoles: [],
                selectRoles: []
            }
        },
        mounted() {
            this.initHrs();
        },
        methods: {
            hidePop(hr){
              let roles =[];
              Object.assign(roles, hr.roles);
              let flag = false;
              if(roles.length != this.selectRoles.length) {
                  flag = true;
              }else{
                  for(let i= 0; i < roles.length; i++){
                      let role = roles[i];
                      for(let j = 0; j < this.selectRoles.length; j++){
                          let sr = this.selectRoles[j]
                          if(role.id == sr){
                              roles.splice(i, 1);
                              i--;
                              break;
                          }
                      }
                  }
                  if(roles.length != 0){
                      flag = true;
                  }
              }
              if(flag){
                  let url = '/system/hr/upRoles?hrId=' + hr.id;
                  this.selectRoles.forEach(sr=>{
                      url += '&rids=' + sr;
                  })
                  this.putRequest(url).then(resp=>{
                      if(resp){
                          this.initHrs();
                      }
                  })
              }
            },
             showPop(hr){
                this.initAllRoles();
                let roles = hr.roles;
                this.selectRoles = [];
                roles.forEach(r=>{
                    this.selectRoles.push(r.id);
                })
            },
            deleteHrById(hr){
                this.$confirm('是否删除选中的人员? ', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/hr/" + hr.id).then(resp=>{
                        if(resp){
                            this.initHrs();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            doSearch(){
                this.initHrs();
            },
            enabledChange(hr){
                delete hr.roles;
                this.putRequest("/system/hr/", hr).then(resp=>{
                    if(resp){
                        this.initHrs();
                    }
                });
            },
            initAllRoles(){
                this.getRequest("/system/hr/roles").then(resp=>{
                    if(resp){
                        this.allRoles = resp;
                    }
                })
            },
            initHrs(){
                this.getRequest("/system/hr/?keywords=" + this.keywords).then(resp=>{
                    if(resp){
                        this.hrs = resp;
                    }
                })
            }
        }
    }
</script>

<style>
    .hr-container {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .Hr-boxCard {
        width: 350px;
        margin-bottom: 20px;
    }
    .userface-img {
        width: 72px;
        height: 72px;
        border-radius: 72px;
    }
    .img-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .userInfo-container {
        margin-top: 20px;
    }
    .userInfo-container div {
        font-size: 12px;
        color: rgba(37,51,138,0.93);
    }
</style>
