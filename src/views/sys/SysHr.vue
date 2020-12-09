<template>
    <div>
        <div style="margin-top: 10px; display: flex; justify-content: center">
            <el-input v-model="keywords" placeholder="通过用户名搜索用户..."
             prefix-icon="el-icon-search" style="width: 400px; margin-left: 10px"
             size="small"></el-input>
            <el-button icon="el-icon-search" type="primary" size="small" style="margin-left: 5px">搜索</el-button>
        </div>
        <div class="hr-container">
            <el-card class="Hr-boxCard" v-for="(hr, index) in hrs" :key="index">
                <div slot="header" class="clearfix">
                    <span>{{hr.name}}</span>
                    <el-button style="float: right; padding: 3px 0; color: #ff5b22" type="text" icon="el-icon-delete"></el-button>
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
                                width="30px"
                                >
                            </el-switch>
                        </div>
                        <div>用户角色：
                            <el-tag type="success"
                                    v-for="(role, indexj) in hr.roles"
                                    :key="index"
                                    size="small"
                                    style="margin-right: 2px; margin-top: 2px">
                                {{role.nameZh}}</el-tag>
                            <el-button icon="el-icon-more" type="text"></el-button>
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
                hrs:[]
            }
        },
        mounted() {
            this.initHrs();
        },
        methods: {
            initHrs(){
                this.getRequest("/system/hr/").then(resp=>{
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
