<template>
    <div>
        <div class="permissionManagerTool">
            <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input size="small" placeholder="请输入角色中文名" v-model="role.nameZh" @keydown.enter.native="doAddRole"></el-input>
            <el-button type="primary" size="small" icon="el-icon-plus" @click="doAddRole">添加角色</el-button>
        </div>
        <div class="permissionManagerMain">
            <el-collapse accordion @change="change" v-model="activeName">
                <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r, index) in roles" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可访问的资源</span>
                            <el-button style="float: right; padding: 3px 0;color: red" type="text" icon="el-icon-delete" @click="doDeleteRole(r)"></el-button>
                        </div>
                        <div>
                            <el-tree
                                    ref="tree"
                                    :key="index"
                                    :data="allMenus"
                                    :props="props"
                                     node-key="id"
                                    :default-checked-keys= "selectMenus"
                                    show-checkbox>
                            </el-tree>
                            <div style="display: flex;justify-content: flex-end">
                                <el-button size="mini" @click="cancelUpdate">取消修改</el-button>
                                <el-button type="primary" size="mini" @click="doUpdate(r.id, index)">确认修改</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PermissionManage",

        data() {
            return {
               role: {
                   name: '',
                   nameZh: ''
               },
               roles: [],
               allMenus: [],
               props: {
                   label: 'name',
                   children: 'children'
               },
               selectMenus: [],
               activeName: -1
            }
        },
        mounted() {
            this.initRoles();
        },
        methods: {
            doDeleteRole(role){
                this.$confirm('此操作将永久删除【' + role.nameZh + '】角色，是否继续? ', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/permission/role/" + role.id).then(resp=>{
                        if(resp){
                            this.initRoles();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            doAddRole(){
                if(this.role.name && this.role.nameZh){
                    this.postRequest("/system/basic/permission/role", this.role).then(resp=>{
                        if(resp){
                            this.role.name= "";
                            this.role.nameZh="";
                            this.initRoles();
                        }
                    })
                }else {
                    this.$message.error("数据不能为空")
                }
            },
            cancelUpdate(){
                this.activeName = -1;
            },
            doUpdate(rid, index){
                let tree = this.$refs.tree[index];
                let selectedKeys = tree.getCheckedKeys(true);
                let url = '/system/basic/permission/?rid=' + rid;
                // if(selectedKeys.length === 0){
                //     this.$message.error('必须给定一个权限');
                //     return;
                // }
                selectedKeys.forEach(key=>{
                    url += '&mids=' + key;
                })
                this.putRequest(url).then(resp=>{
                    if(resp){
                        this.initRoles();
                    }
                })
            },
            initSelectMenus(rid){
                this.getRequest("/system/basic/permission/mid/" + rid).then(resp=>{
                    if(resp) {

                        this.selectMenus = resp;
                    }
                })
            },
            change(rid) {
                if(rid){
                    this.initMenus();
                    this.initSelectMenus(rid);
                }
            },
            initMenus() {
                this.getRequest("/system/basic/permission/menus").then(resp=>{
                    if(resp) {
                        this.allMenus = resp;
                    }
                })
            },
            initRoles() {
                this.getRequest("/system/basic/permission/").then(resp=>{
                    if(resp) {
                        this.roles = resp
                    }
                })
            }
        }
    }
</script>

<style>
    .permissionManagerTool {
        display: flex;
        justify-content: flex-start;
    }
    .permissionManagerTool .el-input {
        width: 300px;
        margin-right: 6px;
    }
    .permissionManagerMain {
        margin-top: 10px;
        width: 720px;
    }
</style>
