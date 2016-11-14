<template>
    <div class="editors">
        <editorHeader title="主编" :back="true"></editorHeader>
        <div class="ed-container">
            <a class="ed-box" v-for="e in data.editors" :href="'http://news-at.zhihu.com/api/4/editor/'+e.id+'/profile-page/android'">
                <i class="iconfont icon-jiantou edfr"></i>
                <div class="avator">
                    <img :src="e.avatar.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')" alt="">
                </div>
                <div class="ed-content">
                    <span>{{e.name}}</span>
                    <div class="pp">{{e.bio}}</div>
                </div>
            </a>
        </div>
    </div>
</template>
<script>
import editorHeader from '../components/header.vue';
export default {
    name: 'themes',
    data() {
        return {
            data: ''
        }
    },
    components: {
        editorHeader
    },
    mounted: function() {
        this.$nextTick(() => {
            this.getThemeContent(); 
        })
    },
    methods: {
        getThemeContent: function() {
            this.$http.get('/api/4/theme/' + this.$route.params.id).then((response) => {
                console.log(response.data);
                if (response.status == 200) {
                    this.data = response.data;
                }
            }, (error) => {
                console.log(error);
            });
        },
    }
}
</script>
<style scoped>
.ed-container {
    padding-top: 40px;
}

.night .ed-box {
    background-color: #343434;
    color: #b6b6b6;
    border-bottom-color: #303030;
}

.edfr {
    position: absolute;
    right: 10px;
    top: 20px;
    color: #b1b1b1;
}

.ed-content {
    display: inline-block;
    float: left;
    margin-left: 10px;
}

.ed-content span {
    line-height: 30px;
    font-size: 1.4rem;
}

.ed-content .pp {
    margin: 0;
    color: #b1b1b1;
}

.avator {
    width: 35px;
    height: 35px;
    float: left;
    vertical-align: center;
    display: inline-block;
    margin-top: 7.5px;
}

.avator img {
    width: 100%;
    height: 100%;
    border-radius: 40px;
    vertical-align: center;
}

.ed-box {
    display: block;
    padding-left: 20px;
    height: 50px;
    position: relative;
    border-bottom: 1px solid #eee;
}
</style>
