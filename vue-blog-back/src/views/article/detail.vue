<template>
    <div class="article-detail">

        <el-form
            :model="form"
            :rules="rules"
            ref="articleForm"
            label-width="100px"
            class="articleForm"
        >
            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="封面图" prop="title_url">
                <el-upload
                        class="upload-demo"
                        action="/api/upload"
                        :headers="header"
                        name="file"
                        :file-list="fileList"
                        :on-change="handleChange"
                        :on-success="handleSuccess"
                        :show-file-list="false"
                        list-type="picture">
                        <el-button size="small" type="primary" v-if="!form.title_url">上传图片</el-button>
                        <div v-if="form.title_url">
                            <img :src="form.title_url" style="width:120px;"/>
                        </div>
                </el-upload>
            </el-form-item>
            <el-form-item label="文章类型" prop="title_type">
                <el-select v-model="form.title_type" style="width:120px;">
                    <el-option
                        v-for="item in articleType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="文章分类" prop="category">
                <el-select v-model="form.category" multiple style="width:120px;">
                    <el-option
                        v-for="item in categorys"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <vue-editor class="editor" :editorToolbar="editorOptions" :customModules="customModulesForEditor" :editorOptions="editorSettings" v-model="form.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('articleForm')">确定</el-button>
                <el-button @click="resetForm('articleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import mapGetters from 'vuex';
import { categoryList } from '../../api/category'
import { articleAdd,articleDetail } from '../../api/article'
import { Upload } from "@/api/upload";
import { VueEditor} from "vue2-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
export default {
    components: { VueEditor },
    data() {
        return {
            form:{
                category:[]
            },
            articleType:[{label:'普通文章',value:1},{label:'简历',value:2},{label:'管理员',value:3}],
            rules: {
                title: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                title_url: [
                    { required: true, message: '请填写描述', trigger: 'change' }
                ],
                title_type:[
                    { required: true, message: '请选择文章类型', trigger: 'change' }
                ],
                category:[
                    { required: true, message: '请选择文章分类', trigger: 'change' }
                ],
                content:[
                    { required: true, message: '请填写文章内容', trigger: 'change' }
                ],
            },
            fileList:[],
            header:{},
            categorys:[],
            customModulesForEditor: [{ alias: "imageDrop", module: ImageDrop }, { alias: "imageResize", module: ImageResize }],
            editorSettings: {
                modules: {
                    imageDrop: true,
                    imageResize: {}
                }
            },
            editorOptions:[
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'font': [] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['clean'],
                ['image']
            ],
        };
    },
    created() {
        this.getArticleCategorys();
        if (this.token) {
            this.header = {
                'Authorization': 'Bearer ' + this.token
            }
        }
        if(this.$route.query.type == 'edit'){
            this.getDetail();
        }
    },
    computed: {
        editor() {
            return this.$refs.myTextEditor.quill
        },
        token(){
            return this.$store.getters.token;
        }
    },
    methods: {
        // 获取文章分类
        async getArticleCategorys(){
            let res = await categoryList();
            this.categorys = [];
            res.model.data.forEach(el=>{
                let obj = {};
                obj.label = el.category_name;
                obj.value = el._id;
                this.categorys.push(obj);
            });
        },
        handleSuccess(response, file, fileList) {
            this.form.title_url = response.model.url
        },
        handleChange(file, fileList) {
            this.fileList = [file]
        },
        // 获取文章详情
        async getDetail(){
            let id = this.$route.query.id;
            let res = await articleDetail({id:id});
            this.form = Object.assign({},this.form,res.model)
        },
        async submitForm(formName){
            let that = this;
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    await articleAdd(this.form);
                    that.$router.push({path:'/article/list'})
                } else {
                    return false;
                }
            })
        },
        resetForm(){
            this.$router.push({path:'/article/list',query:{page:this.$route.query.page}})
        },
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            const formData = new FormData();
            formData.append("file", file);
            const res = await Upload(formData);
            Editor.insertEmbed(cursorLocation, "image",res.model.url);
            resetUploader();
        },
    }
};
</script>
<style>
.editor {
    line-height: normal !important;
}
</style>

 
