<template>
	<div>
		<div class="nav">
			<router-link to="/" class="index"><i></i>返回首页</router-link>
		</div>
		<ul class="choose">
			<li :class="{choosed:choosed==1}" @touchstart="choose(1)">列表样式设置</li>
			<li :class="{choosed:choosed==2}" @touchstart="choose(2)">更新间隔设置</li>
		</ul>
		<div v-if="choosed==1" class="edit">
			<h1 class="title">选择列表类型</h1>
			<label for="listType1" class="box">
				<input id="listType1" name="listType" type="radio" value="1" v-model="currentId" />
				<div class="style1">
					<div>
						<i></i>
						<p>这是新闻标题</p>
					</div>
				</div>
			</label>
			<label for="listType2" class="box">
				<input id="listType2" name="listType" type="radio" value="2" v-model="currentId" />
				<div class="style2">
					<div class="newsImg">
						<img src="../img/default.png" />
					</div>
					<p>这是新闻标题</p>
					<i class="newsData">2017.1.1</i>
				</div>
			</label>
			<div class="btn">
				<input type="button" @touchstart="submitFun" value="确认提交" />
				<input type="button" @touchstart="resetFun" value="取消" />
			</div>
		</div>
		<div v-if="choosed==2" class="edit">
			<h1 class="title">设置更新时间间隔</h1>
			<div class="time">
				<label class="text">时间间隔：</label><input type="text" v-model="time" /><span class="unit">小时</span>
			</div>
			<div class="btn">
				<input type="button" @touchstart="timeSubmit" value="确认提交" />
				<input type="button" @touchstart="timeReset" value="取消" />
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			currentId:0,
			login:"true",
			choosed:1,
			time:""
		}
	},
	methods:{
		submitFun:function(){
			var _this=this;
			if(this.currentId==0){
				alert("请选择一种类型");
			}else if(this.currentId>0&&this.currentId<=2){
				console.log(this.currentId);
				this.$http({
					method:"get",
					url:"/admin/changeStyle",
					params:{"id":_this.currentId}
				}).then((response)=>{
					if(response.body){
						alert("修改成功！");
					}
				},(response)=>{console.log(response);})
			}else{
				alert("出错");
			}
		},
		resetFun:function(){
			this.currentId=0;
		},
		choose:function(num){
			this.choosed=num;
		},
		timeSubmit:function(){
			var _this=this;
			if(this.time!=""){
				var timeNum = Number(this.time);
				console.log(typeof(timeNum),typeof(timeNum)=="number",timeNum);
				if(typeof(timeNum)==='number'&&timeNum!=0&&(!isNaN(timeNum))){
					if(confirm("是否将更新间隔改为"+timeNum+"小时？")){
						console.log(timeNum,222);
						this.$http({
							method:"get",
							url:"/updataTime",
							params:{"time": timeNum}
						}).then((response)=>{
							if(response.body){
								alert("修改成功，更新时间为"+_this.time+"每小时！");
							}
						},(response)=>{console.log(response);})	
					}
				}else{
					alert("格式错误！请重新输入！");
				}
			} else{
				alert("请输入时间！");
			}
				
		},
		timeReset:function(){
			this.time="";
		}
	}
}
</script>
<style scoped>
	.nav{background: #fff;margin-bottom: .1rem;border-bottom: #d7d7d7 1px solid;}
	.index{display: block; width: 2rem; height: 0.5rem; padding-left: .5rem; line-height: 0.5rem; font-size: .14rem; color: #666666;position: relative;}
	.index i{position:absolute;height: 100%; width: .3rem;background: url(../img/links-go.png) left center no-repeat; background-size:auto .2rem; transform: rotate(180deg);top: 0; left: 0;}
	
	.choose{width: 100%;height: 0.8rem;margin-bottom: 5px;}
	.choose li{float: left; width: 50%; height: 100%;text-align: center; background: #fff; font-size: 0.18rem; line-height: 0.8rem;}
	.choose .choosed{border-bottom: #15A2F3 1px solid;}
	
	.edit{ background: #fff; padding-bottom: 10px; border-bottom: #d7d7d7 1px solid;border-top: #d7d7d7 1px solid;}
	.title{border-bottom: #15A2F3 1px solid; padding-left: .3rem; font-size: .28rem; line-height: .6rem; color: #2f2f2f; font-weight:bold; position: relative;}
	.box{display: block; padding-left: .3rem; position: relative;}
	.box input{position: absolute; top: 50%; left: .1rem; margin-top: -6px;}
	.style1{ border-bottom: #dadada 1px dotted; position: relative; margin: 0 6px; background: url(../img/links-go.png) no-repeat right/auto .2rem;}
	.style1 i{position: absolute; top: 50%; left: .1rem; width: 2px; height: 2px; background: #000;}
	.style1 p{display: block; height: .5rem; line-height: .5rem; font-size: 0.2rem; color: #3c3535; position: relative;  margin:0 .2rem 0 .3rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
	
	.style2{height: 1.2rem; border-bottom: #dadada 1px solid; padding: .15rem 0; margin: 0 5px; position: relative;}
	.style2 .newsImg{float: left; width: 2rem; height: 1.2rem; line-height: 1.2rem; text-align: center;}
	.style2 img{width: auto; height: 100%;}
	.style2 p{float: left; font-size: 13px; width: 3.7rem; line-height: .34rem; padding: 0 .1rem;}
	.style2 .newsData{position: absolute; bottom: 0; right: .1rem; font-style: normal; color: #8a8a8a; font-size: 12px;}
	
	.btn{margin: 10px 10px 0 0; text-align: right;}
	.btn input{display: inline-block; padding: 3px 5px; margin: 0 5px; background: #2D85FB; border: none; color: #fff; outline: none;}
	
	.time{padding: 10px 0 10px 0.5rem;}
	.time input{line-height: ;}
	.time span{padding-left: 5px;}
</style>