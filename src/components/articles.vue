<template>
    <div class="s" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="false">
        <div class="articles" v-for="list in items">
            <div v-show="list.date != date" class="date">
                {{list.date | getDays}}
            </div>
            <router-link :to="{ name: 'detail',  params: { id: article.id }}" v-for="article in list.stories">
                <div class="article">
                    <div class="a-title">{{article.title}}</div>
                    <div class="img-box">
                        <span class="multipic" v-if="article.multipic"><i class="iconfont icon-duotu"></i>多图</span>
                        <img :src="article.images[0].replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')+'&w=200'" alt="">
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
import {
    InfiniteScroll
} from 'mint-ui';
export default {
    name: 'articles',
    data() {
        return {
            items: [],
            day: 1,
            date: '',
        }
    },
    filters: {
        getDays: function(value) {
            let week = new Date(value.slice(0, 4) + '/' + value.slice(4, 6) + '/' + value.slice(6, 8)).getDay();
            let dayMap = {
                '0': '星期日',
                '1': '星期一',
                '2': '星期二',
                '3': '星期三',
                '4': '星期四',
                '5': '星期五',
                '6': '星期六',
            }
            return value.slice(4, 6) + '月' + value.slice(6, 8) + '日 ' + dayMap[week];
        }
    },
    components: {
        InfiniteScroll
    },
    mounted: function() {
        this.$nextTick(() => {
            this.getTopStories();
        })
    },
    methods: {
        loadMore: function() {
            this.getBefore();
        },
        getDateStr: function(day) {
            var dd = new Date();
            dd.setDate(dd.getDate() + day);
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1;
            if (m < 10) {
                m = '0' + m;
            }
            var d = dd.getDate();
            if (d < 10) {
                d = '0' + d;
            }
            return y + '' + m + '' + d;
        },
        getBefore: function() {
            this.day -= 1;
            let day = this.getDateStr(this.day);
            let url = '/api/4/news/before/' + day;
            this.$http.get(url).then((response) => {
                console.log(response.data)
                if (response.status == 200) {
                    this.items.push(response.data);
                }
            }, (error) => {
                console.log(error);
            });
        },
        getTopStories: function() {
            this.$http.get('/api/4/news/latest').then((response) => {
                // console.log(response.data);
                this.date = response.data.date;
                if (response.status == 200) {
                    this.items.push(response.data);
                }
            }, (error) => {
                console.log(error);
            });
        }
    }
}
</script>
<style>
.multipic {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 4px;
    font-size: 12px;
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(0.60);
    position: absolute;
    right: -18px;
    bottom: -5px;
}

.articles a {
    color: #494b4d;
    text-decoration: none;
}

.article {
    position: relative;
    height: 6.4rem;
    border-bottom: 1px solid #eee;
    padding: 1.5rem 1rem 0;
}

.article .a-title {
    margin: 0;
    font-size: 1.4rem;
    width: 75%;
}

.img-box {
    position: relative;
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    width: 6rem;
    height: 5rem;
}

.img-box img {
    width: 100%;
    height: 100%;
}

.date {
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: #008bed;
    color: #fff;
    font-weight: bold;
    padding: 0;
}

.night .date {
    background-color: rgb(68, 68, 68);
    color: #b6b6b6;
}

.night .article {
    background-color: #343434;
    border-bottom-color: #303030;
}

.night .article .a-title {
    color: #b6b6b6;
}
</style>
