(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d5e60f5"],{2423:function(e,t,r){"use strict";r.d(t,"d",(function(){return n})),r.d(t,"b",(function(){return i})),r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){return l}));var a=r("b775");function n(e){return Object(a["a"])({url:"/article/list",method:"get",params:e})}function i(e){return Object(a["a"])({url:"/article/delete",method:"get",params:e})}function o(e){return Object(a["a"])({url:"/article/detail",method:"get",params:e})}function l(e){return Object(a["a"])({url:"/article/add",method:"post",data:e})}},"29a2":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"article-detail"},[r("el-form",{ref:"articleForm",staticClass:"articleForm",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"标题",prop:"title"}},[r("el-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),r("el-form-item",{attrs:{label:"封面图",prop:"title_url"}},[r("el-upload",{staticClass:"upload-demo",attrs:{action:"/api/upload",headers:e.header,name:"file","file-list":e.fileList,"on-change":e.handleChange,"on-success":e.handleSuccess,"show-file-list":!1,"list-type":"picture"}},[e.form.title_url?e._e():r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("上传图片")]),e.form.title_url?r("div",[r("img",{staticStyle:{width:"120px"},attrs:{src:e.form.title_url}})]):e._e()],1)],1),r("el-form-item",{attrs:{label:"文章类型",prop:"title_type"}},[r("el-select",{staticStyle:{width:"120px"},model:{value:e.form.title_type,callback:function(t){e.$set(e.form,"title_type",t)},expression:"form.title_type"}},e._l(e.articleType,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"文章分类",prop:"category"}},[r("el-select",{staticStyle:{width:"120px"},attrs:{multiple:""},model:{value:e.form.category,callback:function(t){e.$set(e.form,"category",t)},expression:"form.category"}},e._l(e.categorys,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"文章内容",prop:"content"}},[r("vue-editor",{staticClass:"editor",attrs:{editorToolbar:e.editorOptions,customModules:e.customModulesForEditor,editorOptions:e.editorSettings,useCustomImageHandler:""},on:{"image-added":e.handleImageAdded},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("articleForm")}}},[e._v("确定")]),r("el-button",{on:{click:function(t){return e.resetForm("articleForm")}}},[e._v("取消")])],1)],1)],1)},n=[],i=(r("4160"),r("159b"),r("96cf"),r("1da1")),o=(r("2f62"),r("c405")),l=r("2423"),u=r("b775");function s(e){return Object(u["a"])({url:"/upload",method:"post",data:e})}var c=r("5873"),d=r("2a19"),m=r("f318"),f=r.n(m),p={components:{VueEditor:c["a"]},data:function(){return{form:{category:[]},articleType:[{label:"普通文章",value:1},{label:"简历",value:2},{label:"管理员",value:3}],rules:{title:[{required:!0,message:"请输入分类名称",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}],title_url:[{required:!0,message:"请填写描述",trigger:"change"}],title_type:[{required:!0,message:"请选择文章类型",trigger:"change"}],category:[{required:!0,message:"请选择文章分类",trigger:"change"}],content:[{required:!0,message:"请填写文章内容",trigger:"change"}]},fileList:[],header:{},categorys:[],customModulesForEditor:[{alias:"imageDrop",module:d["a"]},{alias:"imageResize",module:f.a}],editorSettings:{modules:{imageDrop:!0,imageResize:{}}},editorOptions:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{font:[]}],[{color:[]},{background:[]}],[{align:[]}],["clean"],["image"]]}},created:function(){this.getArticleCategorys(),this.token&&(this.header={Authorization:"Bearer "+this.token}),"edit"==this.$route.query.type&&this.getDetail()},computed:{editor:function(){return this.$refs.myTextEditor.quill},token:function(){return this.$store.getters.token}},methods:{getArticleCategorys:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["b"])();case 2:r=t.sent,e.categorys=[],r.model.data.forEach((function(t){var r={};r.label=t.category_name,r.value=t._id,e.categorys.push(r)}));case 5:case"end":return t.stop()}}),t)})))()},handleSuccess:function(e,t,r){this.form.title_url=e.model.url},handleChange:function(e,t){this.fileList=[e]},getDetail:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.$route.query.id,t.next=3,Object(l["c"])({id:r});case 3:a=t.sent,e.form=Object.assign({},e.form,a.model);case 5:case"end":return t.stop()}}),t)})))()},submitForm:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:a=t,t.$refs[e].validate(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=6;break}return e.next=3,Object(l["a"])(t.form);case 3:a.$router.push({path:"/article/list"}),e.next=7;break;case 6:return e.abrupt("return",!1);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return r.stop()}}),r)})))()},resetForm:function(){this.$router.push({path:"/article/list",query:{page:this.$route.query.page}})},handleImageAdded:function(e,t,r,a){return Object(i["a"])(regeneratorRuntime.mark((function n(){var i,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=new FormData,i.append("file",e),n.next=4,s(i);case 4:o=n.sent,t.insertEmbed(r,"image",o.model.url),a();case 7:case"end":return n.stop()}}),n)})))()}}},g=p,h=(r("3771"),r("2877")),b=Object(h["a"])(g,a,n,!1,null,null,null);t["default"]=b.exports},3771:function(e,t,r){"use strict";var a=r("be2d"),n=r.n(a);n.a},be2d:function(e,t,r){},c405:function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return i}));var a=r("b775");function n(e){return Object(a["a"])({url:"/category/list",method:"get",params:e})}function i(e){return Object(a["a"])({url:"/category/add",method:"post",data:e})}}}]);