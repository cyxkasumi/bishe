<template>
	<div>
		<ul class="list">
			<li v-for="item in newsArr">
				<a :href='"/src/artsHtml/"+item.newsid+".html"'>
					<div class="newsImg">
						<img :src="item.imgsrc" />
					</div>
					<p>{{item.title}}</p>
					<i class="newsData">{{item.date}}</i>
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
	.list li{height: 1.2rem; border-bottom: #dadada 1px solid; padding: .15rem 0; margin: 0 5px;}
	.list a{display: block; width: 100%; height: 100%; position: relative;}
	.list .newsImg{float: left; width: 2rem; height: 1.2rem; line-height: 1.2rem; text-align: center;}
	.list img{width: auto; height: 100%;}
	.list p{float: left; font-size: 13px; line-height: .34rem; width: 4rem; padding: 0 .1rem;height: .64rem;overflow: hidden;}
	.list .newsData{position: absolute; bottom: 0; right: .1rem; font-style: normal; color: #8a8a8a; font-size: 12px;}
</style>