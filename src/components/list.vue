<template>
	<div :style="{minHeight: height+'px'}">
		<navV @listChange="changeFun"></navV>
		<!--纯文本类型-->
		<newsList1 v-if="listType[0]=='true'" :newsArr="newsArr"></newsList1>
		<!--单图类型，无图时默认图片-->
		<newsList2 v-if="listType[1]=='true'" :newsArr="newsArr"></newsList2>
		
		<div class="next" v-if="next" @touchend="nextFun">点击加载下一页</div>
	</div>
</template>

<script lang="babel">
	
	import navV from './nav.vue';
	import newsList1 from './common/newsList1.vue';//纯文字模板
	import newsList2 from './common/newsList2.vue';//单图片模板
    export default{
    	data(){
    		return{
    			listType:[],
    			newsArr:[],
    			newsType:"153",
    			page:1,
    			next:false,
    			height:0
    		}
    	},
        components:{
        	navV,
        	newsList1,
        	newsList2
        },
        created(){
        	this.height=document.documentElement.clientHeight;
        	var _this=this;
			this.$http({
				method:"get",
				url:"/style"
			}).then((response)=>{
				for( var i=0;i<response.body.length;i++){
					_this.listType.push(response.body[i].current);
				}
			},(response)=>{console.log(response);});
			this.ajaxFun(_this.newsType);
       	},
       	methods:{
			ajaxFun(str){
				var _this=this;
				this.$http({
					method:"get",
					url:"/listNews",
					params:{"type":str,"pageNum":1}
				}).then((response)=>{
					_this.next = response.body.next;
					_this.newsArr=response.body.newsList;
				},(response)=>{console.log(response);})
			},
			changeFun(item){
				this.ajaxFun(item);//请求该类型的新闻
				this.newsType=item;//将当前类型改为该类型
			},
			nextFun(){
				var _this=this;
				_this.page++;
				console.log(_this.page);
				this.$http({
					method:"get",
					url:"/listNews",
					params:{"type":_this.newsType,"pageNum":_this.page}
				}).then((response)=>{
					_this.next = response.body.next;
					for(var i =0;i<response.body.newsList.length;i++){
						_this.newsArr.push(response.body.newsList[i]);
					}
				},(response)=>{console.log(response);})
			}
		}
    }
</script>
<style scoped>
	.next{height: 20px; line-height: 20px; font-size: 12px; text-align: center; color: #fff; background: #2D85FB;}
</style>
