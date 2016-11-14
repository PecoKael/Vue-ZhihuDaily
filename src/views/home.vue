<template>
    <div class="home">
        <!-- 遮罩 -->
        <div v-show="slide" class="sidebar-mask" v-on:click="slideShow()">
        </div>
        <!-- 左侧滑动栏 -->
        <slideBox :slide="slide"></slideBox>
        <div class="homecontent" v-bind:class="{ show: slide }">
            <div class="header" id="header">
                <i class="iconfont icon-gengduo" v-on:click="slideShow()"></i> {{title}}
                <i v-if="!nightStyle" class="iconfont icon-yejian01 icon-flr" @click="changeMode"></i>
                <i v-else class="iconfont icon-mianbanbaitian icon-flr" @click="changeMode"></i>
            </div>
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in items">
                    <router-link :to="{ name: 'detail',  params: { id: item.id }}">
                        <div class="banner" :style="{'background-image': 'url('+ item.image.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p') +'&w=300)'}">
                            <div class="img-mask">
                            </div>
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
import articles from '../components/articles';
import slideBox from '../components/slideBox';
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
            nightStyle: false,
            stories: [],
            title: '今日热文',
        }
    },
    components: {
        articles,
        slideBox
    },
    mounted: function() {
        this.$nextTick(() => {
            this.getTopStories();
            window.document.getElementById('main').classList.contains('night') ? this.nightStyle = true : window.addEventListener('scroll', () => {
                this.scroll('rgba(0,139,237,')
            }, false);
        })
    },
    methods: {
        /* 切换夜间白天模式 */
        changeMode: function() {
            if (!this.nightStyle) {
                window.document.getElementById('main').className = 'night';
                document.getElementById('header').style.background = 'rgb(68,68,68)';
                window.addEventListener('scroll', () => {
                    this.scroll('rgba(68,68,68,')
                }, false);
            } else {
                window.document.getElementById('main').className = ''
                document.getElementById('header').style.background = 'rgb(0,139,237)'
                window.addEventListener('scroll', () => {
                    this.scroll('rgba(0,139,237,')
                }, false);
            }
            this.nightStyle = !this.nightStyle
        },
        /* 侧边栏隐藏显示 */
        slideShow: function() {
            this.slide == true ? this.slide = false : this.slide = true;
            if (document.documentElement.style.overflow == '') {
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
            } else {
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
            }
        },
        /* 获取首页文章数据 */
        getTopStories: function() {
            this.$http.get('/api/4/news/latest').then((response) => {
                console.log(response.data);
                if (response.status == 200) {
                    this.stories = response.data.stories;
                    this.items = response.data.top_stories;
                }
            }, (error) => {
                console.log(error);
            });
        },
        /* 绑定滚动事件 */
        scroll: function(color) {
            let op = document.documentElement.scrollTop || document.body.scrollTop / 220;
            if (document.getElementById('header') != null) {
                document.getElementById('header').style.background = color + op + ')';
            }
        }
    },
}
</script>
<style scoped>
.img-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(bottom, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.1) 100%);
    background-image: -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.1) 100%);
}

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
    left: 0;
}

.icon-flr {
    width: 50px;
    position: absolute;
    right: 0;
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
