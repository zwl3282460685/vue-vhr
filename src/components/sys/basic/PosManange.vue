<template>
    <div>
        <div>
            <el-input
                    size="small"
                    class="addPosInput"
                    placeholder="添加职位..."
                    prefix-icon="el-icon-plus"
                    v-model="pos.name">
            </el-input>
            <el-button icon="el-icon-plus" size="small" type="primary">添加</el-button>
        </div>
        <div class="posManageTable">
            <el-table
                    :data="positions"
                    border
                    size="small"
                    stripe
                    style="width: 80%">
                <el-table-column
                        prop="id"
                        label="编号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职位名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="createdate"
                        label="创建时间">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PosManage",
        data() {
            return {
                pos: {
                    name: ''
                },
                positions: []
            }
        }
    }
</script>

<style>
    .addPosInput {
        width: 350px;
        margin-right: 10px;
    }
    .posManageTable {
        margin-top: 10px;
    }
</style>
