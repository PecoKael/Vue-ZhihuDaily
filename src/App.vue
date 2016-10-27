<template>
<div class="container">
<!-- <div class="page-swipe"> -->
<mt-swipe :auto="4000">
	<mt-swipe-item class="slide1" v-for="item in items" >
		<div class="banner" :style="{'background-image': 'url('+ item.src +')'}">
			<h1>{{item.title}}</h1>
		</div>
	</mt-swipe-item>
</mt-swipe>
<hello></hello>
<!-- </div> -->
</div>
</template>

<script>
import Hello from './components/Hello'
import {
	Swipe,
	SwipeItem
} from 'mint-ui';
export default {
	name: 'app',
	data () {
        return {
            items: []
        }
	},
	components: {
		Hello,
	},
	mounted: function() {
		this.$nextTick(() => {
			this.$http.get('api/4/news/latest').then((response) => {
				if(response.status == 200) {
					let topStories = response.data.top_stories;
					topStories.forEach(e => {
						// console.log(e.image);
						this.items.push({
							src : e.image.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p'),
							title : e.title
						})

					})
					console.log(this.item);
				}

			}, (response) => {
				// error callback
			});
		})
	},
}
</script>

<style>
.mint-swipe-indicator {
/*	     opacity: 0.8 !important; 
	     background: #5a5a5a !important ;*/
}
.mint-swipe {
	height: 220px;
	color: #fff;
	font-size: 30px;
	/*text-align: center;*/
	margin-bottom: 20px;
	/*background: url("https://images.weserv.nl/?url=pic2.zhimg.com/8d7cbda26697696335605ad956a9a73d.jpg");*/
	background-size: cover !important;
}
.banner{
	width: 100%;
	height: 100%;
	background-size: cover;
	position: relative;
}
h1{
	position: absolute;
	bottom:1.8rem;
	padding: 0 1rem;
    line-height: 1.2;
    font-weight: 500;
    font-size: 1.9rem;
    color: #fff;
}
/*.mint-swipe-item {
	line-height: 200px;
}
*/img{
	width: 100%;
	height: 100%;
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
