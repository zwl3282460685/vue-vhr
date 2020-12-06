<template>
    <div>
        <div>
            <el-input
                    size="small"
                    class="addPosInput"
                    placeholder="添加职位..."
                    prefix-icon="el-icon-plus"
                    @keydown.enter.native="addPosition"
                    v-model="pos.name">
            </el-input>
            <el-button icon="el-icon-plus" size="small" type="primary" @click="addPosition">添加</el-button>
        </div>
        <div class="posManageTable">
            <el-table
                    :data="positions"
                    border
                    size="small"
                    stripe
                    @selection-change="handleSelectionChange"
                    style="width: 80%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职位名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        width="150"
                        label="创建时间">
                </el-table-column>
                <el-table-column prop="enable" width="100" label="是否启用">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.enabled" style="margin-left: 5px">已启用</el-tag>
                        <el-tag type="danger" style="margin-left: 5px" v-else>未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showEditView(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="small" class="deleteBatch" @click="deletePositionByIds"
                       :disabled="multipleSelection.length===0">
                批量删除
            </el-button>
        </div>
        <el-dialog
                title="修改职位信息"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <table>
                    <tr>
                        <td><el-tag>职位名称</el-tag></td>
                        <td><el-input class="updatePosInput" size="small" v-model="updatePos.name"></el-input></td>
                    </tr>
                    <tr>
                        <td><el-tag>是否启用</el-tag></td>
                        <td>
                            <el-switch v-model="updatePos.enabled" active-text="启用"
                                       inactive-text="禁用"
                                       style="margin-top: 3px;margin-left: 8px;">
                            </el-switch>
                        </td>
                    </tr>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "PosManage",
        data() {
            return {
                pos: {
                    name: ''
                },
                positions: [],
                dialogVisible: false,
                multipleSelection:[],
                updatePos: {
                    name: '',
                    enabled: false
                }
            }
        },
        mounted() {
            this.initPosition();
        },
        methods: {
            handleSelectionChange(val){
                this.multipleSelection = val;

            },
            deletePositionByIds(){
                this.$confirm('是否删除选中的职位? ', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item=>{
                        ids += 'ids=' + item.id + '&';
                    })
                    this.deleteRequest("/system/basic/pos/" + ids).then(resp=>{
                        if(resp){
                            this.initPosition();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            doUpdate(){
              this.putRequest("/system/basic/pos/", this.updatePos).then(resp=>{
                  if(resp) {
                      this.initPosition();
                      this.updatePos.name = '';
                      this.dialogVisible = false;
                  }
              })
            },
            initPosition() {
                this.getRequest("/system/basic/pos/").then(resp =>{
                    if(resp) {
                        this.positions = resp;
                    }
                })
            },
            showEditView(index, data) {
                Object.assign(this.updatePos, data);
                this.dialogVisible = true;
            },
            handleDelete(index, data){
                this.$confirm('是否删除【'+ data.name + '】职位? ', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/pos/" + data.id).then(resp=>{
                        if(resp){
                            this.initPosition();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addPosition(){
                if(this.pos.name){
                    this.postRequest("/system/basic/pos/", this.pos).then(resp =>{
                        if(resp){
                            this.initPosition();
                            this.pos.name = "";
                        }
                    })
                }else {
                    this.$message.error('职位名称不能为空！');
                }
            }
        }
    }
</script>

<style>
    .deleteBatch {
        margin-top: 8px;
    }
    .addPosInput {
        width: 350px;
        margin-right: 10px;
    }
    .posManageTable {
        margin-top: 10px;
    }
    .updatePosInput {
        width: 200px;
        margin-left: 8px;

    }
</style>
