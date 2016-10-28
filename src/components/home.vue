<template>
<div class="home">
<mt-swipe :auto="4000">
    <mt-swipe-item class="slide1" v-for="item in items" >
        <div class="banner" :style="{'background-image': 'url('+ item.src +')'}">
            <div class="banner-title">{{item.title}}</div>
        </div>
    </mt-swipe-item>
</mt-swipe>
<articles></articles>
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
    data () {
        return {
            items: []
        }
    },
    components: {
        articles
    },
    mounted: function() {
        this.$nextTick(() => {
            this.getTopStories();
        })
    },
    methods: {
        getTopStories: function() {
            this.$http.get('api/4/news/latest').then((response) => {
                console.log(response.data);
                if(response.status == 200) {
                    let topStories = response.data.top_stories;
                    topStories.forEach(e => {
                        this.items.push({
                            src : e.image.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p'),
                            title : e.title
                        })

                    })
                }

            }, (error) => {
                console.log(error);
            });
        }
    }
}
</script>

<style>
.mint-swipe{
    margin-bottom: 0 !important;
}
.mint-swipe {
    height: 220px;
    color: #fff;
    font-size: 30px;
    margin-bottom: 20px;
    background-size: cover !important;
}
.banner{
    width: 100%;
    height: 100%;
    background-size: cover;
    position: relative;
}
.banner-title{
    position: absolute;
    bottom:1.8rem;
    padding: 0 1rem;
    line-height: 1.2;
    font-weight: 500;
    font-size: 1.9rem;
    color: #fff;
}
</style>
