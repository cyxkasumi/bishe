<template>
	<div>
		<ul class="nav">
			<li @touchstart="show=true;">筛选</li>
			<li>{{title}}</li>
			<li><router-link to="/">首页</router-link></li>
		</ul>
		<transition name="slide">
			<div class="content" v-if="show" @touchstart="show=!show">
				<ul>
					<li v-for="item in typeArr" :data-id="item.typeid" @touchstart="selectFun(item)">{{item.name}}</li>
				</ul>
			</div>
		</transition>
	</div>
</template>

<script lang="babel">
    export default{
    	data(){
    		return{
    			title:"日常通知",
    			typeArr:[],
    			show:false
    		}
    	},
    	created(){
    		var _this=this;
			this.$http({
				method:"get",
				url:"/newsType"
			}).then((response)=>{
				_this.typeArr=response.body;
				console.log(_this.typeArr);
			},(response)=>{console.log(response);});
    	},
    	methods:{
    		showFun(){
    			this.show=true;
    		},
    		selectFun(item){
    			this.title=item.name;
    			this.$emit('listChange',item.typeid);
    		}
    	}
    }
</script>
<style scoped>
	.nav{width: 100%; height: 0.82rem; line-height: 0.82rem; background: #fff; position: fixed; top: 0; left: 0; z-index: 10;}
	.nav li{width: 33.3%; float: left; text-align: center; color: #666666; font-size: 0.26rem;}
	.nav a{color: #666666;}
	.content{background: rgba(0,0,0,0.6); position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 99;}
	.content ul{width: 80%; height: 100%; background: #fff;}
	.content li{ padding-left: 0.5rem; line-height: 1rem; border-bottom: #999999 1px solid; font-size: 0.3rem; background: #fff;}
	
	.slide-enter,.slide-leave-active{
	  left:-100%;
	}
	.slide-leave-active,.slide-enter-active{
	  transition:left .3s linear;
	}
</style>
