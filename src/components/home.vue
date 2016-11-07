<template>
    <div class="home">
        <div v-show="slide" class="sidebar-mask" v-on:click="slideShow()">
        </div>
        <slideBox :slide="slide"></slideBox>
        <div class="homecontent"  v-bind:class="{ show: slide }">
            <div class="header" id="header">
                <i class="iconfont icon-gengduo" v-on:click="slideShow()"></i> 今日热文
            </div>
            <mt-swipe :auto="4000">
                <mt-swipe-item class="slide1" v-for="item in items">
                    <router-link :to="{ name: 'detail',  params: { id: item.id }}">
                        <div class="banner" :style="{'background-image': 'url('+ item.image.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p') +'&w=300)'}">
                            <div class="banner-title">{{item.title}}</div>
                        </div>
                    </router-link>
                </mt-swipe-item>
            </mt-swipe>
            <articles :article="article" ></articles>
        </div>

    </div>
</template>
<script>
import articles from './articles';
import slideBox from './slideBox';
import {
    Swipe,
    SwipeItem
} from 'mint-ui';
export default {
    name: 'app',
    data() {
        return {
            items: [],
            article:[],
            slide: false,
            themes:''
        }
    },
    components: {
        articles,
        slideBox
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
            console.log(document.documentElement.style.overflow);
            if(document.documentElement.style.overflow == ''){
                document.documentElement.style.overflow='hidden';
                document.body.style.overflow='hidden';
             }else{
                document.documentElement.style.overflow='';
                document.body.style.overflow='';
            }
        },
        getTopStories: function() {
            this.$http.get('api/4/news/latest').then((response) => {
                console.log(response.data);
                if (response.status == 200) {
                    this.items = response.data.top_stories;
                    this.article = response.data.stories;
                    console.log(this.article);
                }
            }, (error) => {
                console.log(error);
            });
        },
        setScroll: function() {
            window.onscroll = function() {
                let op = document.documentElement.scrollTop || document.body.scrollTop / 220;
                if (document.getElementById('header') != null) {
                    document.getElementById('header').style.background = 'rgba(0,139,237,' + op + ')';
                }
            }
        }
    },
}
</script>
<style scoped>
.homecontent {
    -webkit-transition: all .3s ease;
}

.homecontent.show {
    -webkit-transform: translateX(17.733rem);
    transform: translateX(17.733rem);
}

.sidebar-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    background: rgba(0, 0, 0, .2);
}

.header {
    max-width: 800px;
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
    width: 50px;
    position: absolute;
    left:0;
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
