<template>
    <div class="slide-box" v-bind:class="{ show: slide }">
        <div class="user">
            <img src="http://7xqch8.com1.z0.glb.clouddn.com/4.pic_hd.jpg" alt="">
            <span></span>
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
        <div class="slide-themes">
            <ul>
                <li>
                    <router-link to="/">
                        首页
                    </router-link>
                </li>
                <li v-for="theme in themes.others" >
                    <router-link :to="{ name: 'themes', params: { id: theme.id }}">
                        {{theme.name}}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'slideBox',
    props: ['slide'],
    data() {
        return {
            themes: '',
        }
    },
    mounted: function() {
        this.$nextTick(() => {
            this.getThemes();
        })
    },
    methods: {
        getThemes: function() {
            this.$http.get('api/4/themes').then((response) => {
                // console.log(response.data);
                if (response.status == 200) {
                    this.themes = response.data;
                }
            }, (error) => {
                console.log(error);
            });
        },
    },
}
</script>
<style>
.slide-themes {
    height: 300px;
    overflow: scroll;
}

.slide-themes ul {
    padding: 0;
    margin: 0;
    padding-left: 20px;
    font-size: 1.8rem;
}

.slide-themes ul li {
    list-style: none;
    padding: 0.5rem 0;
}

.slide-themes ul li a {
    text-decoration: none;
    color: #c2c9d0;
}

.set {
    border-bottom: 2px solid #000;
}

.set .contents {
    padding: 10px 0;
    width: 30%;
    text-align: center;
    display: inline-block;
}

.set .p {
    margin: 0;
    margin-top: 5px;
}

.user {
    padding: 10px 20px;
}

.user img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
}

.user span {
    font-size: 1.6rem;
    margin-left: 1rem;
}

.slide-box.show {
    -webkit-transform: translateX(17.733rem);
    transform: translateX(17.733rem);
}

.slide-box {
    color: #c2c9d0;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    position: fixed;
    height: 100%;
    overflow: auto;
    width: 17.733rem;
    left: -17.733rem;
    z-index: 99;
    top: 0;
    bottom: 0;
    background: #232a30;
}

.night .slide-box{
    background-color: #1f1f1f;
}
</style>
