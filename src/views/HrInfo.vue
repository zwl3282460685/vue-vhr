<template>
    <div>
        <el-card class="box-card" style="width: 400px">
            <div slot="header" class="clearfix">
                <span>{{hr.name}}</span>
            </div>
            <div>
                <div style="display: flex;justify-content: center">
                    <img title="点击修改用户头像" :src="hr.userface" style="width: 100px; height: 100px;border-radius: 50px" alt="">
                </div>
                <div>电话号码：<el-tag style="margin-left: 5px">{{hr.telephone}}</el-tag></div>
                <div style="margin-top: 5px">手机号码：<el-tag style="margin-left: 5px">{{hr.phone}}</el-tag></div>
                <div style="margin-top: 5px">联系地址：<el-tag style="margin-left: 5px">{{hr.address}}</el-tag></div>
                <div style="margin-top: 5px">用户角色：
                    <el-tag type="success" style="margin-right: 5px" v-for="(r, index) in hr.roles" :key="index">
                        {{r.nameZh}}
                    </el-tag>
                </div>
                <div style="display: flex;justify-content: space-around; margin-top: 10px">
                    <el-button type="primary" size="small">修改信息</el-button>
                    <el-button type="danger" size="small">修改密码</el-button>
                </div>
            </div>

        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'HrInfo',
        data() {
            return {
                hr: null
            }
        },
        mounted() {
            this.initHr();
        },
        methods: {
            initHr(){
                this.getRequest("/hr/info").then(resp=>{
                    if(resp){
                        this.hr = resp;
                    }
                })
            }
        }
    }
</script>

<style>

</style>
