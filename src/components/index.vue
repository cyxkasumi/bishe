<template>
	<div>
		<imgFlash></imgFlash>
		<btnList></btnList>
		<h1 class="title">最新资讯<router-link to="/list">查看更多</router-link></h1>
		<div class="list">
			<!--纯文本类型-->
			<newsList1 v-if="listType[0]=='true'" :newsArr="newsArr"></newsList1>
			<!--单图类型，无图时默认图片-->
			<newsList2 v-if="listType[1]=='true'" :newsArr="newsArr"></newsList2>
		</div>
	</div>
</template>

<script lang="babel">
	import imgFlash from './index/imgFlash.vue';
	import btnList from './index/btnList.vue';
	import newsList1 from './common/newsList1.vue';//纯文字模板
	import newsList2 from './common/newsList2.vue';//单图片模板
    export default{
    	data(){
    		return{
    			imgSrc:"src/img/headerImg.png",
    			listType:[],
    			newsArr:[]
    		}
    	},
        components:{
        	imgFlash,
        	btnList,
        	newsList1,
        	newsList2
        },
        created(){
        	var _this=this;
			this.$http({
				method:"get",
				url:"/style"
			}).then((response)=>{
				for( var i=0;i<response.body.length;i++){
					_this.listType.push(response.body[i].current);
				}
			},(response)=>{console.log(response);});
			
			this.$http({
				method:"get",
				url:"/new"
			}).then((response)=>{
				console.log(response.body,"最新资讯");
				_this.newsArr=response.body;
			},(response)=>{console.log(response);});
			
       }
    }
</script>
<style scoped>
	img{display: block; width: 100%; height: auto;}
	.title{border-bottom: #15A2F3 1px solid; border-top: #d7d7d7 1px solid; padding-left: .3rem; font-size: .28rem; line-height: .6rem; color: #2f2f2f; font-weight:bold; position: relative; background: #fff;}
	.title a{position: absolute; width: 1.2rem; height: .2rem; line-height: .2rem; color: #7F858B; font-size: .2rem; font-weight: 400; background: url(../img/links-go.png) no-repeat right; background-size: 0.12rem auto; top: 50%; right: 0.3rem; margin: -0.1rem 0 0 0;;}
	.list{margin-top: -0.82rem;}
</style>
