<template>
    <div class="login-container">
        <el-form
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :rules="rules" :model="loginForm"
                class="loginContainer" ref="loginForm">
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input type="text" v-model="loginForm.code" auto-complete="off" placeholder="点击图片更换验证码"
                          @keydown.enter.native="submitLogin"
                          style="width: 250px"></el-input>
                <img :src="vcUrl" @click="updateVerifyCode"/>
            </el-form-item>
            <el-checkbox class="loginRemember" v-model="checked">记住我</el-checkbox>
            <el-button type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                loading: false,
                rules: {
                    username: [{required: true, message:'请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message:'请输入密码', trigger: 'blur'}],
                    code: [{required: true, message:'请输入验证码', trigger: 'blur'}]
                },
                loginForm:{
                    username: 'admin',
                    password: '123',
                    code: ""
                },
                checked: true,
                vcUrl: '/verifyCode?time' + new Date(),
            }
        },
        methods: {
            updateVerifyCode(){
                this.vcUrl = '/verifyCode?time' + new Date();
            },
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.postKeyValueRequest('/doLogin', this.loginForm).then(resp=>{
                            this.loading = false;
                            if(resp){
                                this.$store.commit('INIT_CURRENTHR', resp.obj);
                                window.sessionStorage.setItem("user", JSON.stringify(resp.obj)); //将用户信息保存在sessionStorage中
                                let path = this.$route.query.redirect; //设置跳转的页面
                                this.$router.replace(path === '/' || path === undefined ? '/home': path);
                            }else{
                                this.vcUrl = '/verifyCode?time' + new Date();
                            }
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .login-container {
        min-height: 100%;
        width: 100%;
        background-image: url(../assets/login.jpg);
        overflow: hidden;
    }
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 168px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
    }
    .loginTitle{
        margin: 15px auto 20px auto;
        text-align: center;
        color: white;
    }
    .loginRemember{
        text-align: left;
        margin: 0px 0px 10px 0px;
        color: white;
    }
    .el-form-item__content{
        display: flex;
        align-items: center;
    }
</style>
