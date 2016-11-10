<template>
    <div class="themes">
        <div v-show="slide" class="sidebar-mask" v-on:click="slideShow()">
        </div>
        <slideBox :slide="slide"></slideBox>
        <div class="themes-content" v-bind:class="{ show: slide }" v-infinite-scroll="getThemeContentBefore" infinite-scroll-immediate-check="false">
            <div class="header" :style="{'background-image': 'url('+ String(data.background).replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')  +'&w=100)'}">
                <div class="th-re">
                    <i class="iconfont icon-jiantou-copy" v-on:click="slideShow()"></i>
                </div>
                {{data.name}}
            </div>
            <router-link :to="{ name: 'editor',  params: { id: $route.params.id }}">
                <div class="editor">
                    主编
                    <i class="iconfont icon-jiantou fr"></i>
                    <img v-for="e in data.editors" :src="e.avatar.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')" alt="">
                </div>
            </router-link>
            <div class="art" v-for="e in data.stories">
                <router-link :to="{ name: 'detail',  params: { id: e.id }}">
                    <div class="list-content-box" v-bind:class="{bindwidth:e.images}">
                        {{e.title}}
                    </div>
                    <div v-if="e.images" class="imgshow">
                        <img :src="e.images[0].replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')" alt="">
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import slideBox from './slideBox';
import {
    InfiniteScroll
} from 'mint-ui';
export default {
    name: 'themes',
    watch: {
        '$route' (to, from) {
            console.log(to);
            console.log(from);
            this.getThemeContent();
            this.slide = false;
        }
    },
    beforeRouteLeave: function(to, from, next) {
        sessionStorage.setItem('scrollTop', document.body.scrollTop);
        next();
    },
    data() {
        return {
            data: '',
            slide: false,
            id:'',
        }
    },
    components: {
        slideBox,
        InfiniteScroll
    },
    mounted: function() {
        this.$nextTick(() => {
            this.getThemeContent();
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        })
    },
    updated: function() {
        this.$nextTick(() => {
            // this.sc();
        })
    },
    methods: {
        sc: function() {
            window.document.body.scrollTop = window.sessionStorage.scrollTop;
        },
        slideShow: function() {
            this.slide == true ? this.slide = false : this.slide = true;
        },
        getThemeContent:function () {
            this.$http.get('/api/4/theme/' + this.$route.params.id ).then((response) => {
                console.log(response)
                if (response.status == 200) {
                    this.data = response.data;
                    this.id = response.data.stories[response.data.stories.length - 1].id;
                }
            }, (error) => {
                console.log(error);
            });
        },
        getThemeContentBefore: function(){
            console.log(123);
            this.$http.get('/api/4/theme/' + this.$route.params.id + '/before/' + this.id ).then((response) => {
                console.log(response.data);
                if (response.status == 200) {
                    response.data.stories.forEach((e)=>{
                        this.data.stories.push(e);
                    })
                    if(response.data.stories.length != 0){
                       this.id = response.data.stories[response.data.stories.length - 1].id;  
                    }
                }
            }, (error) => {
                console.log(error);
            });
        }
    }
}
</script>
<style>
.sidebar-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    background: rgba(0, 0, 0, .2);
}

.themes-content {
    padding-top: 40px;
    -webkit-transition: all .3s ease;
}

.themes-content.show {
    -webkit-transform: translateX(17.733rem);
    transform: translateX(17.733rem);
}

.bindwidth {
    width: 80%;
}

.art {
    padding: 10px 10px;
    height: 50px;
}

.imgshow {
    vertical-align: center;
    width: 20%;
    height: 50px;
    display: inline-block;
    float: right;
}

.imgshow img {
    width: 100%;
    height: 100%;
}

.fr {
    float: right;
    margin-right: 20px;
}

.th-re {
    position: absolute;
    width: 50px;
}

.themes {
    /*padding-top: 40px;*/
}

.themes .header {
    max-width: 800px;
    background-size: cover;
    background-position: 0 -184px;
    background-color: rgba(0, 139, 237, 0);
    position: relative;
    z-index: 2;
    font-weight: bold;
    width: 100%;
    color: #fff;
    position: fixed;
    top: 0;
    height: 40px;
    line-height: 40px;
    text-align: center
}

.art a {
    color: #000;
}

.editor img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-left: 10px;
    vertical-align: middle;
}

.editor {
    height: 40px;
    line-height: 40px;
    padding-left: 1rem;
    border-bottom: 1px solid #eee;
    font-size: 1.4rem;
}

.list-content-box {
    display: inline-block;
}

.art {
    border-bottom: 1px solid #eee;
    font-size: 1.6rem;
}

.img-box2 {
    height: 220px;
    width: 100%;
    border-bottom: 4px solid #f6f6f6;
    background-size: cover;
    position: relative;
}

.img-box2 .top-title {
    position: absolute;
    bottom: 1.8rem;
    padding: 0 1rem;
    line-height: 1.2;
    font-weight: 500;
    font-size: 1.9rem;
    color: #fff;
}

.headline,
.img-place-holder {
    display: none;
}

.night .editor,
.night .art {
    background-color: #343434;
    color: #b6b6b6;
    border-bottom-color: #303030;
}

.night .art .list-content-box {
    color: #b6b6b6;
}

.night .article .a-title {
    color: #b6b6b6;
}
</style>
