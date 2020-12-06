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
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
                positions: []
            }
        },
        mounted() {
            this.initPosition();
        },
        methods: {
            initPosition() {
                this.getRequest("/system/basic/pos/").then(resp =>{
                    if(resp) {
                        this.positions = resp;
                    }
                })
            },
            handleEdit(index, data) {

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
    .addPosInput {
        width: 350px;
        margin-right: 10px;
    }
    .posManageTable {
        margin-top: 10px;
    }
</style>
