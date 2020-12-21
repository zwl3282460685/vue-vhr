<template>
    <div>
        <div style="display: flex; justify-content: space-between">
            <el-button icon="el-icon-plus" type="primary" size="small" @click="showAddSalaryView">添加工资账套</el-button>
            <el-button icon="el-icon-refresh" type="success" size="small" @click="initSalaries"></el-button>
        </div>
        <div style="margin-top: 10px">
            <el-table :data="salaries" border stripe>
                <el-table-column type="selection" width="40px"></el-table-column>
                <el-table-column width="120px" prop="name" label="账套名称"></el-table-column>
                <el-table-column width="100px" prop="basicSalary" label="基本工资"></el-table-column>
                <el-table-column width="100px" prop="trafficSalary" label="交通补助"></el-table-column>
                <el-table-column width="100px" prop="lunchSalary" label="午餐补助"></el-table-column>
                <el-table-column width="100px" prop="bonus" label="奖金"></el-table-column>
                <el-table-column width="100px" prop="createDate" label="启用时间"></el-table-column>
                <el-table-column label="养老金" align="center">
                    <el-table-column width="70px" prop="pensionPer" label="比率"></el-table-column>
                    <el-table-column width="70px" prop="pensionBasic" label="基数"></el-table-column>
                </el-table-column>
                <el-table-column label="医疗保险" align="center">
                    <el-table-column width="70px" prop="medicalPer" label="比率"></el-table-column>
                    <el-table-column width="70px" prop="medicalBase" label="基数"></el-table-column>
                </el-table-column>
                <el-table-column label="公积金" align="center">
                    <el-table-column width="70px" prop="accumulationFundPer" label="比率"></el-table-column>
                    <el-table-column width="70px" prop="accumulationFundBase" label="基数"></el-table-column>
                </el-table-column>
                <el-table-column label="操作" width="150px" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" @click="showEditSalaryView(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="deleteSalaryById(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                    :title="dialogTitle"
                    :visible.sync="dialogVisible"
                    width="45%">
                <div style="display: flex; justify-content: space-around; align-items: center">
                    <el-steps direction="vertical" :active="activeItemIndex">
                        <el-step :title="itemName" v-for="(itemName, index) in salaryItemName" :key="index"></el-step>
                    </el-steps>
                    <el-input v-model="salary[title]" :placeholder="'请输入' + salaryItemName[index] + '...'"
                              v-for="(value,title, index) in salary" :key="index"
                              v-show="activeItemIndex == index" style="width: 200px">

                    </el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="preStep" size="small">{{activeItemIndex == 10 ? "取消" : "上一步"}}</el-button>
                    <el-button type="primary" size="small" @click="nextStep">{{activeItemIndex == 10 ? "完成" : "下一步"}}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SalSob",
        data(){
            return{
                dialogVisible: false,
                salaries: [

                ],
                salaryItemName: [
                    '基本工资',
                    '交通补助',
                    '午餐补助',
                    '奖金',
                    '养老金比率',
                    '养老金基数',
                    '医疗保险比率',
                    '医疗保险基数',
                    '公积金比率',
                    '公积金基数',
                    '账套名称'
                ],
                activeItemIndex: 0,
                salary: {
                    basicSalary: 0,
                    trafficSalary:0,
                    lunchSalary:0,
                    bonus: 0,
                    pensionPer: 0,
                    pensionBasic: 0,
                    medicalPer: 0,
                    medicalBase: 0,
                    accumulationFundPer: 0,
                    accumulationFundBase: 0,
                    name: ""
                },
                dialogTitle: "添加工资账套"
            }
        },
        mounted() {
            this.initSalaries();
        },
        methods: {
            deleteSalaryById(data){
                this.$confirm('确定要永久删除【' + data.name + '】吗？', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                }).then(()=>{
                    this.deleteRequest("/sal/sob/" + data.id).then(resp=>{
                        if(resp){
                            this.initSalaries();
                        }
                    })
                }).catch(()=>{
                    this.$message.info("取消删除！！");
                })
            },
            preStep(){
                if(this.activeItemIndex == 0){
                    return;
                }else if(this.activeItemIndex == 10){
                    //关闭对话框
                    this.dialogVisible = false;

                    return;
                }
                this.activeItemIndex--;
            },
            nextStep(){
                if(this.activeItemIndex == 10){
                    if(this.salary.id){
                        this.putRequest("/sal/sob/", this.salary).then(resp=>{
                            if(resp){
                                this.initSalaries();
                                this.dialogVisible = false;
                            }
                        })
                    }else{
                        this.postRequest("/sal/sob/", this.salary).then(resp=>{
                            if(resp){
                                console.log(this.salary);
                                this.initSalaries();
                                this.dialogVisible = false;
                            }
                        })
                    }
                    return;
                }
                this.activeItemIndex ++;
            },
            showAddSalaryView(){
                //数据初始化
                this.salary={
                    basicSalary: 0,
                    trafficSalary:0,
                    lunchSalary:0,
                    bonus: 0,
                    pensionPer: 0,
                    pensionBasic: 0,
                    medicalPer: 0,
                    medicalBase: 0,
                    accumulationFundPer: 0,
                    accumulationFundBase: 0,
                    name:""
                }
                this.dialogTitle = "添加工资账套";
                this.activeItemIndex = 0;
                this.dialogVisible = true;
            },
            showEditSalaryView(data){
                this.dialogTitle = "修改工资账套";
                this.dialogVisible = true;
                this.salary.basicSalary = data.basicSalary;
                this.salary.trafficSalary = data.trafficSalary;
                this.salary.lunchSalary = data.lunchSalary;
                this.salary.bonus = data.bonus;
                this.salary.pensionPer = data.pensionPer;
                this.salary.pensionBasic = data.pensionBasic;
                this.salary.medicalPer = data.medicalPer;
                this.salary.medicalBase = data.medicalBase;
                this.salary.accumulationFundPer = data.accumulationFundPer;
                this.salary.accumulationFundBase = data.accumulationFundBase;
                this.salary.name = data.name;
                this.salary.id = data.id;
                this.activeItemIndex = 0;
            },
            initSalaries(){
                this.getRequest("/sal/sob/").then(resp=>{
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
