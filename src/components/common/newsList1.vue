<template>
	<div class="list">
		<ul class="newsArr">
			<li v-for="item in newsArr">
				<i></i>
				<a :href='"/src/artsHtml/"+item.newsid+".html"'>
					{{item.title}}
				</a>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		props:['newsArr']
	}
</script>
<style scoped>
	.list{background: #fff; padding-top: 0.82rem}
	.list li{ border-bottom: #dadada 1px dotted; position: relative; margin: 0 6px; background: url(../../img/links-go.png) no-repeat right/auto .2rem;}
	.list i{position: absolute; top: 50%; left: .1rem; width: 2px; height: 2px; background: #000;}
	.list a{display: block; height: .5rem; line-height: .5rem; font-size: 0.2rem; color: #3c3535; position: relative;  margin:0 .2rem 0 .3rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
</style>