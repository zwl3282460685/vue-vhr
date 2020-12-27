<template>
    <div v-if="hr">
        <el-card class="box-card" style="width: 400px">
            <div slot="header" class="clearfix">
                <span>{{hr.name}}</span>
            </div>
            <div>
                <div style="display: flex;justify-content: center;margin-bottom: 15px">
                    <el-upload
                            :show-file-list="false"
                            :on-success="onSuccess"
                            :data="hr"
                            action="/hr/userface">
                        <img title="点击修改用户头像" :src="hr.userface" style="width: 100px; height: 100px;border-radius: 50px" alt="">
                    </el-upload>
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
                    <el-button type="primary" size="small" @click="showUpdateInfoView">修改信息</el-button>
                    <el-button type="danger" size="small" @click="showUpdatePasswordView">修改密码</el-button>
                </div>
            </div>
        </el-card>
        <el-dialog
                title="修改密码"
                :visible.sync="dialogVisiblePass"
                width="30%">
            <div>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="请输入旧密码" prop="oldPass">
                        <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="请输入新密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码确认" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog
                title="修改个人信息"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <table>
                    <tr>
                        <td><el-tag>用户名称：</el-tag></td>
                        <td><el-input v-model="hr2.name">
                        </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td><el-tag>电话号码：</el-tag></td>
                        <td><el-input v-model="hr2.telephone">
                        </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td><el-tag>手机号码：</el-tag></td>
                        <td><el-input v-model="hr2.phone">
                        </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td><el-tag>联系地址：</el-tag></td>
                        <td><el-input v-model="hr2.address">
                        </el-input>
                        </td>
                    </tr>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateHrInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'HrInfo',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    oldPass: '',
                    pass: '',
                    checkPass: '',
                },
                rules: {
                    oldPass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
                hr: null,
                hr2: null,
                dialogVisible: false,
                dialogVisiblePass: false
            }
        },
        mounted() {
            this.initHr();
        },
        methods: {
            onSuccess(){
                this.initHr();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        this.ruleForm.hrid = this.hr.id;
                        this.putRequest("/hr/pass", this.ruleForm).then(resp=>{
                            if(resp){
                                this.getRequest("/logout");
                                window.sessionStorage.removeItem("user");
                                this.$store.commit('initRoutes', []);
                                this.$router.replace("/");
                            }
                        })
                    }
                    else{
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            updateHrInfo(){
              this.putRequest("/hr/info", this.hr2).then(resp=>{
                  if(resp){
                      this.dialogVisible = false;
                      this.initHr();
                  }
              })
            },
            showUpdateInfoView(){
              this.dialogVisible = true;
            },
            showUpdatePasswordView(){
                this.dialogVisiblePass = true;
            },
            initHr(){
                this.getRequest("/hr/info").then(resp=>{
                    if(resp){
                        this.hr = resp;
                        this.hr2 = Object.assign({}, this.hr);
                        window.sessionStorage.setItem("user", JSON.stringify(resp));
                        this.$store.commit('INIT_CURRENTHR',resp);
                    }
                })
            }
        }
    }
</script>

<style>

</style>
