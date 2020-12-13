<template>
    <div>
        <div style="display: flex; justify-content: space-between">
            <div>
                <el-input placeholder="请输入员工名进行搜索" prefix-icon="el-icon-search"
                style="width: 300px; margin-right: 10px" size="small"
                v-model="keyword" @keydown.enter.native="initEmps"
                clearable
                @clear="initEmps"
                ></el-input>
                <el-button type="primary" @click="" icon="el-icon-search" size="small" @click="initEmps">搜索</el-button>
                <el-button type="primary" @click="" size="small">
                    <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                    高级搜索
                </el-button>
            </div>
            <div>
                <el-button type="success" size="small">
                    <i class="fa fa-level-down" aria-hidden="true"></i>
                    导入数据
                </el-button>
                <el-button type="success" size="small">
                    <i class="fa fa-level-up" aria-hidden="true"></i>
                    导出数据
                </el-button>
                <el-button type="success" icon="el-icon-plus" size="small">
                    添加用户
                </el-button>
            </div>
        </div>
        <div style="margin-top: 10px">
            <el-table
                    v-loading="loading"
                    :data="emps"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        fixed
                        align="left"
                        label="姓名"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="workId"
                        label="工号"
                        align="left"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="birthday"
                        align="left"
                        label="出生日期"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="idCard"
                        align="left"
                        label="身份证号码"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="wedlock"
                        label="婚姻状况"
                        width="85">
                </el-table-column>
                <el-table-column
                        prop="nation.name"
                        label="民族"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="nativePlace"
                        align="left"
                        label="籍贯"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="politicsStatus.name"
                        label="政治面貌">
                </el-table-column>
                <el-table-column
                        prop="email"
                        align="left"
                        label="电子邮件"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        align="left"
                        label="电话号码"
                        width="130">
                </el-table-column>
                <el-table-column
                        prop="address"
                        align="left"
                        label="联系地址"
                        width="220">
                </el-table-column>
                <el-table-column
                        prop="department.name"
                        align="left"
                        label="所属部门"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="position.name"
                        align="left"
                        label="职位"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="jobLevel.name"
                        align="left"
                        label="职称"
                        width="110">
                </el-table-column>
                <el-table-column
                        prop="engageForm"
                        align="left"
                        label="聘用形式"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="beginDate"
                        align="left"
                        label="入职日期"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="conversionTime"
                        align="left"
                        label="转正日期"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="beginContract"
                        align="left"
                        label="合同起始日期"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="endContract"
                        align="left"
                        label="合同终止日期"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="left"
                        label="合同期限"
                        width="80">
                    <template slot-scope="scope">
                        {{scope.row.contractTerm}}年
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tiptopDegree"
                        label="最高学历"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="workState"
                        label="在职状态"
                        width="90">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        width="200"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button style="padding: 3px" size="mini">编辑</el-button>
                        <el-button style="padding: 3px" size="mini" type="primary">查看高级资料</el-button>
                        <el-button style="padding: 3px" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: 5px">
            <el-pagination
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
        name: "EmpBasic",
        data() {
            return {
                emps: [],
                loading: false,
                keyword: '',
                page: 1,
                size: 10,
                total: 0
            }
        },
        mounted() {
            this.initEmps();
        },
        methods: {
            sizeChange(currentSize){
                this.size = currentSize;
                this.initEmps();
            },
            currentChange(currentPage){
                this.page = currentPage;
                this.initEmps();
            },
            initEmps() {
                this.loading = true;
                this.getRequest("/emp/basic/?page=" + this.page + "&size=" + this.size+ "&keyword=" + this.keyword).then(resp=>{
                    this.loading = false;
                    if(resp){
                        this.emps = resp.data;
                        this.total = resp.total;
                    }
                })
            }
        }
    }
</script>

<style>

</style>
