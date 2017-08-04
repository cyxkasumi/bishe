<template>
	<div class="flash">
		<ul class="imgList" @touchstart="touchFun($event)" @touchmove="touchFun($event)" @touchend="touchFun($event)" :style='{left: moveX+"px",transition: "left "+time+"s"}'>
			<li v-for="item in flashArr">
				<router-link :to='"/src/artsHtml/"+item.newsid+".html"'>
					<img :src="item.imgsrc" />
					<p>{{item.title}}</p>
				</router-link>
			</li>
		</ul>
		<div class="btn">
			<span :class="{current:num==1}" @touchstart="turnTo(1)" @touchend="autoFun"></span>
			<span :class="{current:num==2}" @touchstart="turnTo(2)" @touchend="autoFun"></span>
			<span :class="{current:num==3}" @touchstart="turnTo(3)" @touchend="autoFun"></span>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				flashArr:[],
				num:1,
				startX:0,
				moveStart:0,
				moveEnd:0,
				moveX:0,
				time:0.5
			}
		},
		created(){
			var _this=this;
			_this.moveX = -window.innerWidth;
			this.$http({
				method:"get",
				url:"/flash"
			}).then((response)=>{
				var arr = response.body;
				for(var i =0;i<arr.length;i++){
					_this.flashArr.push(arr[i]);
				}
				_this.flashArr.unshift(arr[arr.length-1]);
				_this.flashArr.push(arr[0]);
			},(response)=>{console.log(response);});
		},
		mounted(){
			var _this=this;
			this.timer=window.setInterval(function(){
				_this.num++;
				_this.moveX=-_this.num*window.innerWidth;
				_this.time=0.5;
				if(_this.num==4){
					_this.num=1;
					window.setTimeout(function(){
						_this.moveX=-window.innerWidth;
						_this.time=0;
					},500);
				}
			},3000);
		},
		methods:{
			turnTo:function(num){
				this.num=num;
				var _this=this;
				_this.moveX=-_this.num*window.innerWidth;
				window.clearInterval(_this.timer);
			},
			autoFun:function(){
				var _this=this;
				this.timer=window.setInterval(function(){
					_this.num++;
					_this.moveX=-_this.num*window.innerWidth;
					_this.time=0.5;
					if(_this.num==4){
						_this.num=1;
						window.setTimeout(function(){
							_this.moveX=-window.innerWidth;
							_this.time=0;
						},500);
					}
				},3000);
			},
			touchFun:function(e){
				var event=e||window.event;
				var target=event.targetTouches[0];
				var _this=this;
				if(event.type=="touchstart"){
					this.startX=target.pageX;
					this.moveStart=target.pageX;
					window.clearInterval(_this.timer);
					_this.time=0;
				}else if(event.type=="touchmove"){
					if(_this.num<=3){
						this.moveEnd=target.pageX;
						this.moveX+=this.moveEnd-this.moveStart;
						this.moveStart=target.pageX;
					}
				}else if(event.type=="touchend"){
					if(this.startX-this.moveEnd>window.innerWidth*0.3){
						if(_this.num<=2){
							_this.num++;
						}else if(_this.num==3){
							_this.num=1;
						}
					}else if(this.moveEnd-this.startX>window.innerWidth*0.3){
						if(_this.num>1){
							_this.num--;
						}else if(_this.num==1){
							_this.num=3;
						}
					}
					_this.moveX=-_this.num*window.innerWidth;
					this.autoFun();
				}
				
			}
		}
	};
	
</script>
<style scoped>
	.flash{width: 100%; height: 3rem; overflow: hidden; position: relative; border-bottom: #d7d7d7 1px solid;}
	.imgList{width:500%;height: 100%; position: absolute; left: 0; top: 0; }
	.imgList li{float: left; width: 20%; height: 100%;}
	.imgList a{display: block; width: 100%; height: 100%; position: relative;}
	.imgList img{width: 100%; height: auto;}
	.imgList p{ width: 100%; box-sizing: border-box; padding: 0 1.2rem 0 1em; line-height: .6rem; background: rgba(0,0,0,0.3); color: #fff; position: absolute; bottom: 0; left: 0; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}
	.btn{ height: 0.6rem; line-height: .6rem; position: absolute; bottom: 0; right: 5%; text-align: center;}
	.btn span{display: inline-block; width: 0.14rem; height: 0.14rem; border-radius: 50%; background: #fff; margin-left: 2px;}
	.btn .current{width: 0.18rem; height: 0.18rem; background: #2d85fb;}
	.flash-enter-active{animation: flash-in .5s;}
	.flash-leave-active {animation: flash-out .5s;}
	@keyframes flash-in{
		0%{left:100%;}
		100%{left:0;}
	}
	@keyframes flash-out{
		0%{left:0;}
		100%{left:-100%;}
	}
</style>