<template>
    <div style="width: 500px">
        <el-input
                prefix-icon="el-icon-search"
                placeholder="输入部门名称进行搜索..."
                v-model="filterText">
        </el-input>
        <el-tree
                style="margin-top: 5px"
                :data="dps"
                :props="defaultProps"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                ref="tree">
            <span class="custom-tree-node" slot-scope="{ node, data }" style="display: flex; justify-content: space-between; width: 100%">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                          type="primary"
                          size="mini"
                          class="depBtn"
                          @click="() => showAddView(data)">
                    添加部门
                  </el-button>
                  <el-button
                          type="danger"
                          size="mini"
                          class="depBtn"
                          @click="() => deleteDep(data)">
                    删除部门
                  </el-button>
                </span>
          </span>
        </el-tree>
        <el-dialog
                title="添加部门"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <table>
                    <tr>
                        <td><el-tag>上级部门</el-tag></td>
                        <td><span>{{pname}}</span></td>
                    </tr>
                    <tr>
                        <td><el-tag>部门名称</el-tag></td>
                        <td><el-input size="small" v-model="dep.name" placeholder="请输入部门名称..."></el-input></td>
                    </tr>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="doAddDep">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "DepManage",
        data() {
            return {
                dialogVisible: false,
                dep: {
                    name: '',
                    parentId: -1
                },
                pname: '',
                filterText: '',
                dps: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        watch: {
            filterText(val) { //当filterText值发生变化时会触发此方法
                this.$refs.tree.filter(val); //获取树形控件并调用filter方法
            }
        },
        mounted() {
            this.initDps();
        },
        methods: {
            removeDepFromDeps(p, deps, id){
                for(let i =0; i < deps.length; i++){
                    let d = deps[i];
                    if(d.id == id){
                        deps.splice(i, 1);
                        if(deps.length == 0){
                            p.parent = false;
                        }
                        return;
                    }else{
                        this.removeDepFromDeps(d, d.children, id);
                    }
                }
            },
            addDep2Deps(deps, dep){
                for(let i = 0; i < deps.length; i ++){
                    let d = deps[i];
                    if(d.id == dep.parentId){
                        d.children=d.children.concat(dep);
                        if(d.children.length > 0){
                            d.parent=true;
                        }
                        return;
                    }else{
                        this.addDep2Deps(d.children, dep);
                    }
                }
            },
            initDep(){
              this.dep={
                  name: '',
                  parentId: -1
              }
              this.pname = '';
            },
            doAddDep(){
                this.postRequest("/system/basic/department/", this.dep).then(resp=>{
                    if(resp){
                        this.addDep2Deps(this.dps, resp.obj);
                        this.dialogVisible = false;
                        //初始化变量
                        this.initDep();
                    }
                })
            },
            showAddView(data) {
                this.pname = data.name;
                this.dep.parentId=data.id
                this.dialogVisible = true;
            },
            deleteDep(data) {
                if(data.parent){
                    this.$message.error("父部门删除失败！")
                }else{
                    this.$confirm('是否删除选【'+ data.name +'】部门? ', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.deleteRequest("/system/basic/department/" + data.id).then(resp=>{
                            if(resp){
                                this.removeDepFromDeps(null, this.dps, data.id);
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }

            },
            initDps() {
                this.getRequest("/system/basic/department/").then(resp=>{
                    if(resp){
                        this.dps = resp;
                    }
                })
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            }
        },
    }
</script>

<style>
    .depBtn {
        padding: 2px;
    }
</style>
