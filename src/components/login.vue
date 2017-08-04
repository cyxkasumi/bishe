<template>
	<div class="login" :style="{minHeight: height+'px'}">
		<form>
			<section><label for="username">用户名：</label><input v-model="username" id="username" type="text" /></section>
			<section><label for="password">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label><input v-model="password" id="password" type="password" /></section>
			<input class="submit" type="button" @touchstart="submit" value="登录" />
		</form>
	</div>
</template>

<script lang="babel">
    export default{
    	data(){
    		return{
    			height:null,
    			username:"",
    			password:"",
    			info:""
    		}
    	},
    	mounted:function(){
			this.height=document.documentElement.clientHeight;
		},
		methods:{
	    	submit:function(){
	    		var _this=this;
	    		if(_this.username==null||_this.username==""){
	    			alert("用户名不能为空！");
	    		}else if(_this.password==null||_this.password==""){
	    			alert("密码不能为空！");
	    		}else{
	    			var formdata = new FormData();  
					formdata.append('username',_this.username);  
					formdata.append('password',_this.password); 
		    		this.$http({
		    			method:"post",
		    			url:"/loginInfo",
		    			body:formdata,
		    			headers:{
		    				"content-Type":"application/x-www-form-urlencoded"
		    			}
		    		}).then((response)=>{
		    			if(response.body=="true"){
		    				this.$router.push({path:'/admin'});
		    			}else{
		    				alert(response.body);
		    			}
		    			
		    		},(response)=>{console.log(response);});	
	    		}
	    	}
    	}
    }
</script>
<style scoped>
.login{height: 100%; width: 100%; background: url(../img/login-bg.jpg) no-repeat 0 0/auto 100%;}
form{ padding-top: 3rem;}
section{width: 5.76rem; margin: .16rem auto 0; position: relative;}
label{display: inline-block; height: .88rem; line-height: .88rem; color: #646565; font-size: .3rem; position: absolute; top: 0; left: .34rem;}
input{display: inline-block; width: 4.21rem; height: .86rem; border: #d4d4d4 1px solid; border-radius: 5px; padding-left: 1.53rem;}
.submit,.registered{display: block; width: 4.9rem; height: .63rem; border-radius: 5px; color: #fff; font-size: .24rem; margin: .4rem auto; padding: 0; border: 0 none;
background: -webkit-linear-gradient(#ff2a1f,#d3332b 75%,#d3332b 89%,#ff4d4d);
	background: -moz-linear-gradient(#ff2a1f,#d3332b 75%,#d3332b 89%,#ff4d4d);
	background: -o-linear-gradient(#ff2a1f,#d3332b 75%,#d3332b 89%,#ff4d4d);
	background: linear-gradient(#ff2a1f,#d3332b 75%,#d3332b 89%,#ff4d4d);
}
.registered{text-align: center; line-height: .63rem;
	background: url(../img/registered.jpg) repeat-x 0 0/auto 100%;
	}
</style>