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
                <el-button type="success" icon="el-icon-plus" size="small" @click="showAddEmpView">
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
        <el-dialog
                title="添加员工"
                :visible.sync="dialogVisible"
                width="80%">
            <div>
                <el-form :model="emp" :rules="rules" ref="empForm">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓名：" prop="name">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="emp.name"
                                          placeholder="请输入员工姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="性别：" prop="gender">
                                <el-radio-group v-model="emp.gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio label="女">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="出生日期：" prop="birthday">
                                <el-date-picker
                                        v-model="emp.birthday"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 150px"
                                        placeholder="出身日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="政治面貌：" prop="politicId">
                                <el-select v-model="emp.politicId" placeholder="政治面貌" size="mini" style="width: 200px">
                                    <el-option
                                            v-for="item in politicsstatus"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="民族：" prop="nationId">
                                <el-select v-model="emp.nationId" placeholder="民族" size="mini" style="width: 150px">
                                    <el-option
                                            v-for="item in nations"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="籍贯：" prop="nativePlace">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="emp.nativePlace" placeholder="员工籍贯"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="电子邮箱：" prop="email">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-message"
                                          v-model="emp.email" placeholder="员工邮箱"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="联系地址：" prop="address">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                                          v-model="emp.address" placeholder="联系地址"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="职位：" prop="posId">
                                <el-select v-model="emp.posId" placeholder="请选择职位" size="mini" style="width: 150px">
                                    <el-option
                                            v-for="item in positions"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="职称：" prop="jobLevelId">
                                <el-select v-model="emp.jobLevelId" placeholder="请选择职称" size="mini"
                                           style="width: 150px">
                                    <el-option
                                            v-for="item in jobLevels"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="所属部门：" prop="departmentId">
                                <el-popover
                                        placement="right"
                                        title="请选择部门"
                                        width="220"
                                        trigger="manual"
                                        v-model="popVisible">
                                    <el-tree default-expand-all :data="allDeps" :props="defaultProps"
                                             @node-click="handleNodeClick"></el-tree>
                                    <div style="width: 150px; display: inline-flex; font-size: 13px;
                                            border: 1px solid #dedede;
                                            height: 24px; border-radius: 4px; margin-top: 8px;
                                            cursor: pointer; align-items: center; padding-left: 8px;box-sizing: border-box"
                                         @click="showDepView"
                                         slot="reference">
                                        {{inputDepName}}
                                    </div>
                                </el-popover>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="电话号码：" prop="phone">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-phone"
                                          v-model="emp.phone" placeholder="所属部门"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="工号：" prop="workId">
                                <el-input size="mini" style="width: 150px"
                                          prefix-icon="el-icon-edit"
                                          v-model="emp.workId"
                                          placeholder="工号" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="学历：" prop="tiptopDegree">
                                <el-select v-model="emp.tiptopDegree" placeholder="请选择学历" size="mini"
                                           style="width: 150px">
                                    <el-option
                                            v-for="item in tiptopDegrees"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="毕业院校：" prop="school">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="emp.school" placeholder="请输入毕业院校"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="专业名称：" prop="specialty">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                                          v-model="emp.specialty" placeholder="请输入专业名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="入职日期：" prop="beginDate">
                                <el-date-picker
                                        v-model="emp.beginDate"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 130px"
                                        placeholder="入职日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="转正日期：" prop="conversionTime">
                                <el-date-picker
                                        v-model="emp.conversionTime"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 130px"
                                        placeholder="转正日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同起始日期：" prop="beginContract">
                                <el-date-picker
                                        v-model="emp.beginContract"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 130px"
                                        placeholder="合同起始日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同终止日期：" prop="endContract">
                                <el-date-picker
                                        v-model="emp.endContract"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 130px"
                                        placeholder="合同终止日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="身份证号码：" prop="idCard">
                                <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                                          v-model="emp.idCard" placeholder="请输入身份证号码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="聘用形式：" prop="engageForm">
                                <el-radio-group v-model="emp.engageForm">
                                    <el-radio label="劳动合同">劳动合同</el-radio>
                                    <el-radio label="劳务合同">劳务合同</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="婚姻状况：" prop="wedlock">
                                <el-radio-group v-model="emp.wedlock">
                                    <el-radio label="已婚">已婚</el-radio>
                                    <el-radio label="未婚">未婚</el-radio>
                                    <el-radio label="离异">离异</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doAddEmp">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "EmpBasic",
        data() {
            return {
                allDeps: [],
                popVisible: false,
                tiptopDegrees: ['本科', '大专', '硕士', '博士', '高中', '初中', '小学', '其他'],
                nations: [],
                jobLevels: [],
                politicsstatus: [],
                positions: [],
                dialogVisible: false,
                emps: [],
                loading: false,
                keyword: '',
                page: 1,
                size: 10,
                total: 0,
                inputDepName: '',
                emp: {
                    name: "",
                    gender: "",
                    birthday: "",
                    idCard: "",
                    wedlock: "",
                    nationId: null,
                    nativePlace: "",
                    politicId: null,
                    email: "",
                    phone: "",
                    address: "",
                    departmentId: null,
                    jobLevelId: null,
                    posId: null,
                    engageForm: "",
                    tiptopDegree: "",
                    specialty: "",
                    school: "",
                    beginDate: "",
                    workState: "在职",
                    workId: "",
                    contractTerm: 2,
                    conversionTime: "",
                    notworkDate: null,
                    beginContract: "",
                    endContract: "",
                    workAge: null
                },
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                rules: {
                    name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                    gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
                    birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
                    idCard: [{required: true, message: '请输入身份证号', trigger: 'blur'}, {
                        pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                        message: '身份证号码格式不正确',
                        trigger: 'blur'
                    }],
                    wedlock: [{required: true, message: '请输入婚姻状况', trigger: 'blur'}],
                    nationId: [{required: true, message: '请输入民族', trigger: 'blur'}],
                    nativePlace: [{required: true, message: '请输入籍贯', trigger: 'blur'}],
                    politicId: [{required: true, message: '请输入政治面貌', trigger: 'blur'}],
                    email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'}, {
                        type: 'email',
                        message: '邮箱格式错误',
                        trigger: 'blur'
                    }],
                    phone: [{required: true, message: '请输入手机号码', trigger: 'blur'}],
                    address: [{required: true, message: '请输入地址信息', trigger: 'blur'}],
                    departmentId: [{required: true, message: '请输入所属部门', trigger: 'blur'}],
                    jobLevelId: [{required: true, message: '请输入职称', trigger: 'blur'}],
                    posId: [{required: true, message: '请输入职位', trigger: 'blur'}],
                    engageForm: [{required: true, message: '请输入聘用形式', trigger: 'blur'}],
                    tiptopDegree: [{required: true, message: '请输入最高学历', trigger: 'blur'}],
                    specialty: [{required: true, message: '请输入专业名称', trigger: 'blur'}],
                    school: [{required: true, message: '请输入毕业院校', trigger: 'blur'}],
                    beginDate: [{required: true, message: '请输入入职日期', trigger: 'blur'}],
                    workState: [{required: true, message: '请输入工作状态', trigger: 'blur'}],
                    workId: [{required: true, message: '请输入工号', trigger: 'blur'}],
                    contractTerm: [{required: true, message: '请输入合同期限', trigger: 'blur'}],
                    conversionTime: [{required: true, message: '请输入转正日期', trigger: 'blur'}],
                    notworkDate: [{required: true, message: '请输入离职日期', trigger: 'blur'}],
                    beginContract: [{required: true, message: '请输入合同起始日期', trigger: 'blur'}],
                    endContract: [{required: true, message: '请输入合同终止日期', trigger: 'blur'}],
                    workAge: [{required: true, message: '请输入工龄', trigger: 'blur'}]
                }
            }
        },
        mounted() {
            this.initEmps();
            this.initData();
        },
        methods: {
            doAddEmp() {
                this.$refs['empForm'].validate(valid => {
                    if (valid) {
                        this.postRequest("/emp/basic/", this.emp).then(resp => {
                            if (resp) {
                                this.dialogVisible = false;
                                this.initEmps();
                            }
                        })
                    }
                })
            },
            handleNodeClick(data) {
                this.inputDepName = data.name;
                this.emp.departmentId = data.id;
                this.popVisible = !this.popVisible;
            },
            showDepView() {
                this.popVisible = !this.popVisible;
            },
            getMaxWorkID() {
                this.getRequest("/emp/basic/maxWorkId").then(resp => {
                    if (resp) {
                        this.emp.workId = resp.obj;
                    }
                })
            },
            initPositions() {
                this.getRequest("/emp/basic/positions").then(resp => {
                    if (resp) {
                        this.positions = resp;
                    }
                })
            },

            initData() {
                if (!window.sessionStorage.getItem("nations")) {
                    this.getRequest("/emp/basic/nations").then(resp => {
                        if (resp) {
                            this.nations = resp;
                            window.sessionStorage.setItem("nations", JSON.stringify(resp));
                        }

                    });
                } else {
                    this.nations = JSON.parse(window.sessionStorage.getItem("nations"));
                }

                if (!window.sessionStorage.getItem("jobLevels")) {
                    this.getRequest("/emp/basic/jobLevels").then(resp => {
                        if (resp) {
                            this.jobLevels = resp;
                            window.sessionStorage.setItem("jobLevels", JSON.stringify(resp));
                        }
                    });
                } else {
                    this.jobLevels = JSON.parse(window.sessionStorage.getItem("jobLevels"));
                }

                if (!window.sessionStorage.getItem("politicsstatus")) {
                    this.getRequest("/emp/basic/politicsstatus").then(resp => {
                        if (resp) {
                            this.politicsstatus = resp;
                            window.sessionStorage.setItem("politicsstatus", JSON.stringify(resp));
                        }
                    });
                } else {
                    this.politicsstatus = JSON.parse(window.sessionStorage.getItem("politicsstatus"));
                }

                if (!window.sessionStorage.getItem("deps")) {
                    this.getRequest("/emp/basic/deps").then(resp => {
                        if (resp) {
                            this.allDeps = resp;
                            window.sessionStorage.setItem("deps", JSON.stringify(resp));
                        }
                    });
                } else {
                    this.allDeps = JSON.parse(window.sessionStorage.getItem("deps"));
                }
            },
            showAddEmpView() {
                this.initPositions();
                this.getMaxWorkID();
                this.dialogVisible = true;
            },
            sizeChange(currentSize) {
                this.size = currentSize;
                this.initEmps();
            },
            currentChange(currentPage) {
                this.page = currentPage;
                this.initEmps();
            },
            initEmps() {
                this.loading = true;
                this.getRequest("/emp/basic/?page=" + this.page + "&size=" + this.size + "&keyword=" + this.keyword).then(resp => {
                    this.loading = false;
                    if (resp) {
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
