<template>
    <div class="comments">
        <comHeader :title="extra.comments + '条点评'"></comHeader>
        <div class="com-container">
            <div class="com-title">
                {{extra.long_comments}}条长评
            </div>
            <div class="com-content" v-for="e in comments">
                <div class="comimg-box">
                    <img :src="e.avatar.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')" alt="">
                </div>
                <div class="content-box">
                    <div class="title">
                        {{e.author}}
                        <div class="right">
                            <i class="iconfont icon-down"></i>
                            <span class="com-zan">{{e.likes}}</span>
                        </div>
                    </div>
                    <div class="text">
                        {{e.content}}
                        <div class="time">
                            {{e.time | timeStr }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="com-title">
                {{extra.short_comments}}条短评
            </div>
            <div class="com-content" v-for="e in scomments">
                <div class="comimg-box">
                    <img :src="e.avatar.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')" alt="">
                </div>
                <div class="content-box">
                    <div class="title">
                        {{e.author}}
                        <div class="right">
                            <i class="iconfont icon-down"></i>
                            <span class="com-zan">{{e.likes}}</span>
                        </div>
                    </div>
                    <div class="text">
                        {{e.content}}
                        <p class="reply" v-if="e.reply_to">
                            //{{e.reply_to.author}}:
                            <span> {{e.reply_to.content}}</span>
                        </p>
                        <div class="time">
                            {{e.time | timeStr }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="write-comment">
            <div class="return" onclick="window.history.go(-1)">
                <i class="iconfont icon-jiantou-copy"></i>
            </div>
            <!-- 写点评 -->
        </div>
    </div>
</template>
<script>
import comHeader from './header.vue'
export default {
    name: 'comments',
    data() {
        return {
            comments: '',
            scomments: '',
            extra: ''
        }
    },
    components: {
        comHeader
    },
    filters: {
        timeStr: function(obj) {
            var time = new Date(parseInt(obj) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ').slice(12, 17);
            var myDate = new Date(obj * 1000);
            var year = myDate.getFullYear();
            var month = ("0" + (myDate.getMonth() + 1)).slice(-2);
            var day = ("0" + myDate.getDate()).slice(-2);
            return month + "-" + day + ' ' + time;
        }
    },
    mounted: function() {
        this.$nextTick(() => {
            this.getStoryExtra();
            this.getLongComments();
            this.getShortComments();
        })
    },
    methods: {
        getShortComments: function() {
            this.$http.get('/api/4/story/' + this.$route.params.id + '/short-comments').then((response) => {
                console.log(response.data);
                this.scomments = response.data.comments;
            }, (error) => {
                console.log(error);
            });
        },
        getLongComments: function() {
            this.$http.get('/api/4/story/' + this.$route.params.id + '/long-comments').then((response) => {
                this.comments = response.data.comments;
            }, (error) => {
                console.log(error);
            });
        },
        getStoryExtra: function() {
            this.$http.get('/api/4/story-extra/' + this.$route.params.id).then((response) => {
                console.log(response.data);
                this.extra = response.data;
            }, (error) => {
                console.log(error);
            });
        }
    }
}
</script>
<style>
.reply {
    font-weight: bold;
}

.reply span {
    font-weight: normal;
}

.night .comment-head {
    background-color: #444;
}

.night .com-content,
.night .com-title {
    background-color: #343434;
    color: #b6b6b6;
    border-bottom-color: #303030;
}

.return {
    display: inline-block;
    float: left;
    border-right: 1px dotted #757070;
    width: 50px;
}

.write-comment {
    background-color: #3b3b3b;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #ccc7c7;
    font-weight: bold;
}

.time {
    color: #b6b6b5;
    height: 30px;
    line-height: 30px;
}

.right {
    color: #b6b6b5;
    font-weight: normal;
    float: right;
}

.text {
    padding-right: 10px;
    margin-top: 10px;
    /*width: 10%;*/
}

.content-box {
    width: 80%;
    position: relative;
    display: inline-block;
    margin-left: 60px;
    /*padding-bottom: 10px;*/
}

.content-box .title {
    padding-right: 20px;
    font-size: 1.2rem;
    font-weight: bold;
}

.comimg-box {
    position: absolute;
    left: 20px;
}

.comment-head {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #00a2ed;
    font-size: 1.8rem;
    color: #fff;
    position: fixed;
    top: 0;
    z-index: 99;
    text-align: center;
}

.com-title {
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 30px;
    padding-left: 20px;
}

.com-container {
    margin-bottom: 40px;
    /*height: 30px;*/
    border-bottom: 1px solid #eee;
    /*padding-left:20px;*/
    padding-top: 40px;
}

.com-content {
    padding-top: 10px;
    display: relative;
    border-bottom: 1px solid #eee;
}

.com-content img {
    display: absolute;
    left: 0;
    top: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
</style>
