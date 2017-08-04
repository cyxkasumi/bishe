<template>
    <div :style="{minHeight:winH+'px'}">
    	<router-view></router-view>
    </div>
</template>

<script>
	function fontAuto(width){
	    var winW=document.documentElement.clientWidth;
	    if(winW>=width)
	    {
	        document.documentElement.style.fontSize="625%";
	    }
	    else
	    {
	        document.documentElement.style.fontSize=(winW/width*625)+"%";
	    }
	}
	fontAuto(640);
	window.onresize=fontAuto;
	export default{
		data(){
			return{
				winH:100
			}
		},
        mounted:function(){
			this.winH=document.documentElement.clientHeight;
       	}
    }
</script>
<style>
	*{margin: 0; padding: 0;}
	html{font-size: 625%;}
	body{max-width: 640px; min-width: 320px; margin: 0 auto; font-size: 12px; font-family: "微软雅黑"; background: #f1f2f2;}
	li{list-style: none;}
	img{vertical-align: top; border: 0 none;}
	a{color: #000; text-decoration: none;}
	a:hover{color: #000;}
</style>
