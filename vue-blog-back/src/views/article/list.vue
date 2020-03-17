<template>
    <div class="app-container">
        <div class="my-2">
            <el-button class="mr-2" type="primary" @click="articleAdd">新增文章</el-button>
        </div>
        <el-table
            v-loading="listLoading"
            :data="articleTable"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
        >
            <el-table-column prop="title" align="center" label="标题" min-width="95"></el-table-column>
            <el-table-column label="封面图" min-width="140" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.title_url" alt="" style="width:100px;">
                </template>
            </el-table-column>
            <el-table-column label="文章分类" min-width="110" align="center">
                <template slot-scope="scope">{{ scope.row.categorys_word }}</template>
            </el-table-column>
            <el-table-column label="文章类型" min-width="110" align="center">
                <template slot-scope="scope">{{ scope.row.title_type | statusFilter }}</template>
            </el-table-column>
            <el-table-column label="最后修改时间" min-width="110" align="center">
                <template slot-scope="scope">{{ scope.row.update_time }}</template>
            </el-table-column>
            <el-table-column label="操作" min-width="110" align="center">
                <template slot-scope="scope">
                    <span class="m-1 cur" @click="edit(scope.row._id)">编辑</span>
                    <span class="m-1 cur" @click="deleteRow(scope.row._id)">删除</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="mt-1">
            <el-pagination background  layout="prev, pager, next" :total="total" :current-page="form.page" :page-size="form.per_page"  @current-change="handleCurrentChange"></el-pagination>
        </div>
    </div>
</template>

<script>
import { getList } from "@/api/article";
import { articleList,articleDelete } from '../../api/article'
export default {
    filters: {
        statusFilter(status) {
            const statusMap = {
                '1': "普通文章",
                '2': "简历",
                '3': "管理员介绍"
            };
            return statusMap[status];
        }
    },
    data() {
        return {
            articleTable: null,
            form:{
                page:1,
                per_page:10
            },
            total:0,
            listLoading: false
        };
    },
    created() {
        this.articleList();
    },
    methods: {
        // 新增文章
        articleAdd(){
            this.$router.push({path:'/article/detail',query:{type:'add'}})
        },
        // 获取文章列表
        async articleList(){
            this.listLoading = true;
            if(this.$route.query.page){
                this.form.page = Number(this.$route.query.page);
            }
            let res = await articleList(this.form);
            this.articleTable = res.model.data;
            this.articleTable.forEach(el=>{
                let categorys = []
                el.category.forEach(el=>{
                    categorys.push(el.category_name)
                });
                el.categorys_word = categorys.join(';');
            })
            this.total = res.model.total;
            this.listLoading = false;
        },
        // 删除
        async edit(id){
            this.$router.push({path:'/article/detail',query:{type:'edit',id:id,page:this.form.page}})
        },
        async deleteRow(id){
            await articleDelete({id});
            this.articleList();
        },
        // 分页
        handleCurrentChange(val){
            this.form.page = val;
            this.articleList();
        }
    }
};
</script>
