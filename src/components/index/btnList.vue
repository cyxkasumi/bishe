<template>
	<div class="index-btn">
		<ul class="btn-list">
			<li class="btn01">
				<a href="/src/artsHtml/school.html">
					<img src="../../img/index1.png" />
					<p>学院介绍</p>
				<a>
			</li>
			
			<li class="btn04">
				<router-link to="/about">
					<img src="../../img/index4.png" />
					<p>相关网页</p>
				</router-link>
			</li>
			<li class="btn04">
				<a href="/admin">
					<img src="../../img/index5.png" />
					<p>管理员</p>
				</a>
			</li>
		</ul>
	</div>
</template>
<style scoped>
	.index-btn{width: 100%; overflow: hidden; background: #fff; margin-top: 5px; border-top: #d7d7d7 1px solid; border-bottom: #d7d7d7 1px solid; margin-bottom: 5px;}
	.btn-list{  padding: .2rem 5% 0; display: flex; flex-wrap: wrap;}
	.btn-list li{ width: 33.3%; margin-bottom: .15rem;}
	.btn-list img{display: block; width: 1rem; height: auto; margin: 0 auto;}
	.btn-list p{font-size: .18rem; color: #9c9d9c; text-align: center; line-height: .4rem;}
</style>