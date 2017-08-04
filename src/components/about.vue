<template>
	<div>
		<div class="nav">
			<router-link to="/" class="index"><i></i>返回首页</router-link>
		</div>
		<div class="list" :style="{minHeight: height+'px'}">
			<ul>
				<li v-for="item in netArr">
					<i></i>
					<a :href='item.url'>
						{{item.title}}
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default{
    	data(){
    		return{
    			height:0,
    			netArr:[]
    		}
    	},
        created(){
        	this.height=document.documentElement.clientHeight;
        	var _this=this;
			this.$http({
				method:"get",
				url:"/aboutList"
			}).then((response)=>{
				console.log(response);
				_this.netArr=response.body;
			},(response)=>{console.log(response);});
       }
    }
</script>
<style scoped>
	.nav{background: #fff;margin-bottom: .1rem;border-bottom: #d7d7d7 1px solid;}
	.nav .index{display: block; width: 2rem; height: 0.5rem; padding-left: .5rem; line-height: 0.5rem; font-size: .14rem; color: #666666;position: relative;}
	.index i{position:absolute;height: 100%; width: .3rem;background: url(../img/links-go.png) left center no-repeat; background-size:auto .2rem; transform: rotate(180deg);top: 0; left: 0;}
	.list{background: #fff;}
	.list li{ border-bottom: #dadada 1px dotted; position: relative; margin: 0 6px; background: url(../img/links-go.png) no-repeat right/auto .2rem;}
	.list i{position: absolute; top: 50%; left: .1rem; width: 2px; height: 2px; background: #000;}
	.list a{display: block; height: .5rem; line-height: .5rem; font-size: 0.2rem; color: #3c3535; position: relative;  margin:0 .2rem 0 .3rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
</style>