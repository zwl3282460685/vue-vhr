<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">人事系统</div>
                <div>
                    <el-button icon="el-icon-bell" type="text"
                               style="margin-right: 8px; color: #000000" size="big"
                               @click="goChat"></el-button>
                    <el-dropdown class="userInfo" @command="commandHandler">
                        <span class="el-dropdown-link">
                                {{user.name}}
                            <i><img :src="user.userface" alt=""/></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                            <el-dropdown-item command="setting">设置</el-dropdown-item>
                            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>

            <!--左侧导航栏-->
            <el-container>
                <el-aside width="200px">
                    <el-menu router unique-opened>
                        <!--设置左侧菜单动态修改-->
                        <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
                            <template slot="title">
                                <i style="color: #409eff;margin-right: 5px" :class="item.iconcls"></i>
                                <span>{{item.name}}</span>
                            </template>
                                <el-menu-item :index="child.path" v-for="(child, indexj) in item.children" :key="indexj">
                                    {{child.name}}
                                </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>

                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path != '/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="homeWelcome"  v-if="this.$router.currentRoute.path == '/home'">
                        欢迎使用人事系统!
                    </div>
                    <router-view class="homeRouterView"/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                //user: JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        methods: {
            goChat(){
              this.$router.push("/chat");
            },
            commandHandler(cmd) {
                if(cmd == 'logout') {
                    this.$confirm('是否注销登录?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout");
                        window.sessionStorage.removeItem("user");
                        this.$store.commit('initRoutes', []); //清空routes中的数据，防止注销后另一个不同角色的用户看到上一个用户的菜单
                        this.$router.replace("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }else if(cmd == 'userInfo'){
                    this.$router.push("/hrInfo");
                }
            }
        },
        computed: {
            routes() {
                return this.$store.state.routes; //从vuex的store中获取routes数组
            },
            user(){
                return this.$store.state.currentHr;
            }
        }
    }
</script>

<style>
    .homeRouterView {
        margin-top: 15px;
    }
    .homeHeader {
        background-color: #409eff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 15px;
        box-sizing: border-box;
    }
    .homeHeader .title {
        font-size: 30px;
        font-family: 方正舒体;
        color: #ffffff;
    }
    .homeHeader .userInfo {
        cursor: pointer;
    }
    .el-dropdown-link img{
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }
    .el-dropdown-link {
        display: flex;
        align-items: center;
    }

    .homeWelcome {
        text-align: center;
        font-size: 30px;
        font-family: 华文行楷;
        color: #409eff;
        padding-top: 50px;
    }
</style>
