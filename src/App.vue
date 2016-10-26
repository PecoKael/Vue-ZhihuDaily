<template>
<!-- <div class="container"> -->
<!-- <div class="page-swipe"> -->
<mt-swipe :auto="4000">
	<mt-swipe-item class="slide1">
		<img src="http://ofn881vu0.bkt.clouddn.com/1.jpg" alt="" />
		<img src="http://pic3.zhimg.com/272cc24d2765fbbb36a7ad9459de5406.jpg" alt="" />
		<img src="http://ac-dpefsmm4.clouddn.com/61b2e2bfc2f22e5d8f98.jpg" alt="" />
		<div class="ss" style="background:url(http://pic3.zhimg.com/272cc24d2765fbbb36a7ad9459de5406.jpg)">
			是的
		</div>
	</mt-swipe-item>
	<mt-swipe-item class="slide2">2</mt-swipe-item>
	<mt-swipe-item class="slide3">3</mt-swipe-item>
</mt-swipe>
<!-- </div> -->
<!-- </div> -->
</template>

<script>
import Hello from './components/Hello'
import {
	Swipe,
	SwipeItem
} from 'mint-ui';

export default {
	name: 'app',
	components: {
		Hello,
	},
	mounted: function() {
		this.$nextTick(() => {
			this.$http.get('api/4/news/latest').then((response) => {
				console.log(response);
			}, (response) => {
				// error callback
			});
		})
	},
}
</script>

<style>
.mint-swipe {
	height: 200px;
	color: #fff;
	font-size: 30px;
	text-align: center;
	margin-bottom: 20px;
}

.mint-swipe-item {
	line-height: 200px;
}

.slide1 {
	background-color: #0089dc;
	color: #fff;
}

.slide2 {
	background-color: #ffd705;
	color: #000;
}

.slide3 {
	background-color: #ff2d4b;
	color: #fff;
}

html {
	font-size: 62.5%;
	font-family: Hiragino Sans GB, Helvetica, Arial, STHeiti, WenQuanYi Micro Hei, sans-serif;
}

* {
	padding: 0;
	margin: 0;
}

body {
	background-color: #F5F5F5;
}

.container {
	max-width: 80rem;
	margin: 0 auto;
}

.mint-header {
	display: none !important;
}
</style>
