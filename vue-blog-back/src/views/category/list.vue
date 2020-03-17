<template>
    <div class="app-container">
        <div style="margin-bottom:20px;">
            <el-input v-model="searchForm.title" style="width:150px;margin-right:20px;" placeholder="请输入分类名"></el-input>
            <el-input v-model="searchForm.desc" style="width:150px;margin-right:20px;" placeholder="请输入描述"></el-input>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="primary" @click="dialogVisible = true">新增分类</el-button>
        </div>
        <el-table
            v-loading="listLoading"
            :data="articleList"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
        >
            <el-table-column prop="category_name" align="center" label="分类名" min-width="120"></el-table-column>
            <el-table-column prop="desc" align="center" label="描述" min-width="120"></el-table-column>
            <el-table-column prop="created_time" label="创建时间" min-width="120" align="center"></el-table-column>
        </el-table>
        <el-pagination background  layout="prev, pager, next" :total="total" :current-page="searchForm.page" :page-size="searchForm.per_page"  @current-change="handleCurrentChange"></el-pagination>
        <el-dialog :visible.sync="dialogVisible" title="新增分类">
            <el-form
                :model="form"
                :rules="rules"
                ref="categoryForm"
                label-width="100px"
                class="categoryForm"
            >
                <el-form-item label="分类名称" prop="category_name">
                    <el-input v-model="form.category_name"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('categoryForm')">确定</el-button>
                    <el-button @click="resetForm('categoryForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { categoryList,categoryAdd } from "@/api/category";

export default {
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: "success",
                draft: "gray",
                deleted: "danger"
            };
            return statusMap[status];
        }
    },
    data() {
        return {
            articleList: null,
            listLoading: false,
            dialogVisible: false,
            title:'',
            searchForm:{
                title:'',
                desc:'',
                page:1,
                per_page:10
            },
            form:{},
            total:0,
            rules: {
                category_name: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                desc: [
                    { required: true, message: '请填写描述', trigger: 'change' }
                ],
            }
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        // 搜索
        search(){
            this.fetchData();
        },
        // 获取列表数据
        async fetchData() {
            this.listLoading = true;
            let res = await categoryList(this.searchForm);
            this.listLoading = false;
            this.articleList = res.model.data;
            this.total = res.model.total;
        },
        // 新增分类保存
        submitForm(formName){
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    await  categoryAdd(this.form);
                    this.dialogVisible = false;
                    this.$refs.categoryForm.resetFields();
                    this.fetchData();
                } else {
                    return false;
                }
            });
        },
        // 新增分类取消
        resetForm(formName){
            this.$refs[formName].resetFields();
            this.dialogVisible = false;
        },
        handleCurrentChange(val){
            this.searchForm.page = val;
            this.fetchData();
        }
    }
};
</script>
