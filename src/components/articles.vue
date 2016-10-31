<template>
    <div class="s" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="false">
        <div class="articles" v-for="list in items">
            <div class="date" id="sss">
                {{list.date}}
            </div>
            <router-link :to="{ name: 'detail',  params: { id: article.id }}" v-for="article in list.stories">
            <div class="article" >
                <div class="a-title">{{article.title}}</div>
                <div class="img-box">
                    <img :src="article.images[0].replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')" alt="">
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
            console.log(123);
            this.getBefore();
        },
        getDateStr: function() {
            var dd = new Date();
            dd.setDate(dd.getDate() + this.day);
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
            let day = this.getDateStr();
            let url = 'api/4/news/before/' + day;
            console.log(day);
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
            this.$http.get('api/4/news/latest').then((response) => {
                console.log(response.data);
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
.articles a{
    color:#494b4d;
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
    width: 18rem;
}

.img-box {
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
    height: 3rem;
    line-height: 3rem;
    background: #008bed;
    color: #fff;
    font-weight: bold;
    padding: 0;
}
</style>
