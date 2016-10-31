<template>
    <div class="home">
        <div v-show="slide" class="sidebar-mask" v-on:click="slideShow()">
        </div>
        <div class="slide-box" v-bind:class="{ show: slide }">
            <div class="user">
                <img src="http://7xqch8.com1.z0.glb.clouddn.com/4.pic_hd.jpg" alt="">
                <span>请登录</span>
            </div>
            <div class="set">
                <div class="contents">
                    <i class="iconfont icon-shoucang"></i>
                    <div class="p">收藏</div>
                </div>
                <div class="contents">
                    <i class="iconfont icon-lingdang"></i>
                    <div class="p">消息</div>
                </div>
                <div class="contents">
                    <i class="iconfont icon-shezhi"></i>
                    <div class="p">设置</div>
                </div>
            </div>
              
            <div class="themes">
                <ul>
                    <li v-for="theme in themes.others">
                    <router-link :to="{ name: 'themes',  params: { id: theme.id }}">
                    {{theme.name}}
                    </router-link>
                    </li>
                </ul>
            </div>
        </div>

        <div class="homecontent" v-bind:class="{ show: slide }">
            <div class="header" id="header">
                <i class="iconfont icon-gengduo" v-on:click="slideShow()"></i> 今日热文
            </div>
            <mt-swipe :auto="4000">
                <mt-swipe-item class="slide1" v-for="item in items">
                    <router-link :to="{ name: 'detail',  params: { id: item.id }}">
                        <div class="banner" :style="{'background-image': 'url('+ item.image.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p') +')'}">
                            <div class="banner-title">{{item.title}}</div>
                        </div>
                    </router-link>
                </mt-swipe-item>
            </mt-swipe>
            <articles></articles>
        </div>


    </div>
</template>
<script>
import articles from './articles'
import {
    Swipe,
    SwipeItem
} from 'mint-ui';
export default {
    name: 'app',
    data() {
        return {
            items: [],
            slide: false,
            themes:''
        }
    },
    components: {
        articles
    },
    mounted: function() {
        this.$nextTick(() => {
            this.getTopStories();
            this.setScroll();
            this.getThemes();
        })
    },
    methods: {
        getThemes: function() {
            this.$http.get('api/4/themes').then((response) => {
                console.log(response.data);
                if (response.status == 200) {
                    this.themes = response.data;
                }
                
            }, (error) => {
                console.log(error);
            });
        },
        slideShow: function() {
            this.slide == true ? this.slide = false : this.slide = true;
            // console.log(123);
        },
        getTopStories: function() {
            this.$http.get('api/4/news/latest').then((response) => {
                console.log(response.data.top_stories);
                if (response.status == 200) {
                    this.items = response.data.top_stories;
                }
            }, (error) => {
                console.log(error);
            });
        },
        setScroll: function() {
            window.onscroll = function() {
                var op = document.documentElement.scrollTop || document.body.scrollTop / 220;
                if (document.getElementById('header') != null) {
                    document.getElementById('header').style.background = 'rgba(0,139,237,' + op + ')';
                }
            }
        }
    },
}
</script>
<style scoped>
.themes{
/*    overflow:scroll;
    height: 200px;*/
}
ul{
    padding: 0;
    margin:0;
    padding-left:20px;
    padding-top: 10px;
    font-size: 1.8rem;
}
ul li{
    list-style:none;
    padding: 0.5rem 0;
}
ul li a{
    text-decoration: none;
    color:#c2c9d0;
}
.set{
    border-bottom: 2px solid #000;
}
.set .contents{
    /*height: 60px;*/
    padding: 10px 0;
    width: 30%;
    text-align: center;
    display: inline-block;
    
}
.set .p{
    margin:0;
    margin-top: 5px;
}
.user{
    padding: 10px 20px;
}
.user img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
}
.user span{
    font-size: 1.6rem;
    margin-left: 1rem;
    
}
.homecontent {
/*    -webkit-transform: translateZ(0);
    transform: translateZ(0);*/
    -webkit-transition: all .3s ease;
}

.homecontent.show {
    -webkit-transform: translateX(17.733rem);
    transform: translateX(17.733rem);
}

.slide-box.show {
    -webkit-transform: translateX(17.733rem);
    transform: translateX(17.733rem);
}

.sidebar-mask {
    position: fixed;
/*    -webkit-transform: translateZ(0);
    transform: translateZ(0);*/
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    background: rgba(0, 0, 0, .2);
}

.slide-box {
    color:#c2c9d0;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
/*    -webkit-transform: translateZ(0);
    transform: translateZ(0);*/
    position: fixed;
    height: 100%;
    overflow: auto;
    width: 17.733rem;
    left: -17.733rem;
    z-index: 99;
    top: 0;
    bottom: 0;
    background: #232a30;
    /*background: red;*/
}

.header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: rgba(0, 139, 237, 0);
    font-size: 1.8rem;
    color: #fff;
    position: fixed;
    top: 0;
    z-index: 99;
    text-align: center;
}

.icon-gengduo {
    position: absolute;
    left: 1rem;
}

.mint-swipe {
    margin-bottom: 0 !important;
}

.mint-swipe {
    height: 220px;
    color: #fff;
    font-size: 30px;
    margin-bottom: 20px;
    background-size: cover !important;
}

.banner {
    width: 100%;
    height: 100%;
    background-size: cover;
    position: relative;
}

.banner-title {
    position: absolute;
    bottom: 1.8rem;
    padding: 0 1rem;
    line-height: 1.2;
    font-weight: 500;
    font-size: 1.9rem;
    color: #fff;
}
</style>
