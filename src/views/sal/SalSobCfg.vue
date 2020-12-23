<template>
    <div>
        <div>
            <el-table :data="emps" border stripe>
                <el-table-column type="selection" align="left" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名" fixed width="120" align="left"></el-table-column>
                <el-table-column prop="workId" label="工号"  width="120" align="left"></el-table-column>
                <el-table-column prop="email" label="电子邮件"  width="200" align="left"></el-table-column>
                <el-table-column prop="phone" label="电话号码"  width="180" align="left"></el-table-column>
                <el-table-column prop="department.name" label="所属部门"  width="120" align="left"></el-table-column>
                <el-table-column label="工资账套信息" align="center">
                    <template slot-scope="scope">
                        <el-tooltip placement="right">
                            <div slot="content">
                                <table>
                                    <tr>
                                        <td>基本工资</td>
                                        <td>{{scope.row.salary.basicSalary}}</td>
                                    </tr>
                                    <tr>
                                        <td>交通补助</td>
                                        <td>{{scope.row.salary.trafficSalary}}</td>
                                    </tr>
                                    <tr>
                                        <td>午餐补助</td>
                                        <td>{{scope.row.salary.lunchSalary}}</td>
                                    </tr>
                                    <tr>
                                        <td>奖金</td>
                                        <td>{{scope.row.salary.bonus}}</td>
                                    </tr>
                                    <tr>
                                        <td>养老金比率</td>
                                        <td>{{scope.row.salary.pensionPer}}</td>
                                    </tr>
                                    <tr>
                                        <td>养老金基数</td>
                                        <td>{{scope.row.salary.pensionBase}}</td>
                                    </tr>
                                    <tr>
                                        <td>医疗保险比率</td>
                                        <td>{{scope.row.salary.medicalPer}}</td>
                                    </tr>
                                    <tr>
                                        <td>医疗保险基数</td>
                                        <td>{{scope.row.salary.medicalBase}}</td>
                                    </tr>
                                    <tr>
                                        <td>公积金比率</td>
                                        <td>{{scope.row.salary.accumulationFundPer}}</td>
                                    </tr>
                                    <tr>
                                        <td>公积金基数</td>
                                        <td>{{scope.row.salary.accumulationFundBase}}</td>
                                    </tr>
                                    <tr>
                                        <td>启用时间</td>
                                        <td>{{scope.row.salary.createDate}}</td>
                                    </tr>
                                </table>
                            </div>
                            <el-tag>{{scope.row.salary.name}}</el-tag>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-popover
                                placement="left"
                                title="修改工资账套"
                                @show="showPop(scope.row.salary)"
                                width="200"
                                trigger="click">
                            <div>
                                <el-select v-model="currentSalary" placeholder="请选择">
                                    <el-option
                                            v-for="item in salaries"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <el-button slot="reference" type="danger" size="small">修改工资账套</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SalSobCfg",
        data() {
            return{
                emps: [],
                salaries:[],
                currentSalary: -1
            }
        },
        mounted() {
            this.initEmps();
            this.initSalaries();
        },
        methods: {
            showPop(data){
                this.currentSalary = data.id;
            },
            initEmps(){
                this.getRequest("/salary/sobcfg/").then(resp=>{
                    if(resp){
                        this.emps = resp.data;
                    }
                })
            },
            initSalaries(){
                this.getRequest("/salary/sobcfg/salaries/").then(resp=>{
                    if(resp){
                        this.salaries = resp;
                    }
                })
            }
        }
    }
</script>

<style>

</style>
