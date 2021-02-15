<template>
    <div>
        <div>
            <el-input size="small" v-model="jl.name"
                      style="width: 300px"
                      prefix-icon="el-icon-plus"
                      placeholder="添加职称..."></el-input>
            <el-select v-model="jl.titleLevel" placeholder="职称等级" size="small" style="margin-left: 5px;margin-right: 5px" >
                <el-option
                        v-for="item in titleLevels"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
            <el-button icon="el-icon-plus" size="small" type="primary" @click="addJobLevel">添加</el-button>
            <el-button type="danger" size="small" class="deleteJobLevelBatch" style="margin-left: 20px"
                       @click="deleteJobLevelByIds"
                       :disabled="multipleSelection.length === 0">批量删除</el-button>
        </div>
        <div style="margin-top: 10px">
            <el-table
                    :data="jls"
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
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职称名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="titleLevel"
                        width="150"
                        label="职称级别">
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
                        <el-button size="mini" @click="showEditView(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteJobLevel(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="修改职称信息" :visible.sync="dialogVisible" width="30%">
                <div>
                    <table>
                        <tr>
                            <td><el-tag>职称名称</el-tag></td>
                            <td><el-input size="small" v-model="updateJl.name"></el-input></td>
                        </tr>
                        <tr>
                            <td><el-tag>职称级别</el-tag></td>
                            <el-select v-model="updateJl.titleLevel" placeholder="职称等级" size="small">
                                <el-option
                                        v-for="item in titleLevels"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </tr>
                        <tr>
                            <td><el-tag>是否启用</el-tag></td>
                            <td>
                                <el-switch v-model="updateJl.enabled" active-text="启用" inactive-text="禁用" class="enableStyle">
                                </el-switch>
                            </td>
                        </tr>
                    </table>

                </div>
                <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="doUpdateJobLevel">确 定</el-button>
            </span>
            </el-dialog>
                <el-pagination
                        style="display: flex; justify-content: flex-end;width: 80%;margin-top: 6px"
                        background
                        @current-change="currentChange"
                        @size-change="sizeChange"
                        layout="sizes, prev, pager, next, jumper, ->, total, slot"
                        :total="total">
                </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "JobLevelManage",
        data() {
            return {
                multipleSelection: [],
                dialogVisible: false,
                updateJl: {
                    name: '',
                    titleLevel: '',
                    enabled: false,
                    multipleSelection:[],
                },
                jls:[],
                jl: {
                    name: '',
                    titleLevel: '',
                },
                titleLevels: [
                    '正高级',
                    '副高级',
                    '初级',
                    '中级',
                    '员级'
                ],
                page: 1,
                size: 10,
                total: 0,

            }
        },
        mounted() {
            this.initJls();
        },
        methods: {
            sizeChange(currentSize){
                this.size = currentSize;
                this.initJls();
            },
            currentChange(currentPage){
                this.page = currentPage;
                this.initJls();
            },
            deleteJobLevelByIds(){
                this.$confirm('是否删除选中的职称? ', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item=>{
                        ids += 'ids=' + item.id + '&';
                    })
                    this.deleteRequest("/system/basic/joblevel/" + ids).then(resp=>{
                        if(resp){
                            this.initJls();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val){
                this.multipleSelection = val;

            },
            initJls() {
                let url = '/system/basic/joblevel/' + '?page=' + this.page + "&size=" + this.size;
                this.getRequest(url).then(resp=>{
                    if(resp) {
                        this.jls = resp.data;
                        this.total = resp.total;
                    }
                })
            },
            doUpdateJobLevel(){
                this.putRequest("/system/basic/joblevel/", this.updateJl).then(resp=>{
                    if(resp) {
                        this.initJls();
                        this.updateJl.name = '';
                        this.updateJl.titleLevel="";
                        this.updateJl.enabled=false;
                        this.dialogVisible = false;
                    }
                })
            },
            showEditView(index, data) {
                Object.assign(this.updateJl, data)
                this.dialogVisible = true;
            },
            deleteJobLevel(index, data) {
                this.$confirm('是否删除【'+ data.name + '】职位? ', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/joblevel/" + data.id).then(resp=>{
                        if(resp){
                            this.initJls();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addJobLevel() {
                if(this.jl.name && this.jl.titleLevel){
                    this.postRequest("/system/basic/joblevel/", this.jl).then(resp =>{
                        if(resp){
                            this.initJls();
                            this.jl.name = "";
                            this.jl.titleLevel = "";
                        }
                    })
                }else {
                    this.$message.error('职称名称或等级不能为空！');
                }
            }
        }
    }
</script>

<style>
    .deleteJobLevelBatch {
        margin-top: 8px;
    }
    .enableStyle {
        margin-top: 3px;
        margin-left: 8px;
    }
</style>
