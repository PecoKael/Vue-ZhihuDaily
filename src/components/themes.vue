<template>
    <div class="themes">
        <div class="header" :style="{'background-image': 'url('+ String(data.background).replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')  +')'}">
            <div class="th-re" onclick="window.history.go(-1)">
                <i class="iconfont icon-jiantou-copy"></i>
            </div>
            {{data.name}}
        </div>
        <!-- <router-link to="/">Go to home</router-link> -->
        <!-- <div class="img-box2" :style="{'background-image': 'url('+ String(data.background).replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p') +')'}">
            <div class="top-title">
                {{data.description}}
            </div>
        </div> -->
        <div class="editor" >
            主编
            <img v-for="e in data.editors" :src="e.avatar.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')" alt="">
        </div>
        <div class="art" v-for="e in data.stories">
        <router-link :to="{ name: 'detail',  params: { id: e.id }}">
            <div class="list-content-box">

                {{e.title}}
            </div>
            </router-link>
        </div>
        

    </div>
</template>
<script>
export default {
    name: 'themes',
    data() {
        return {
            data: ''
        }
    },
    components: {

    },
    mounted: function() {
        this.$nextTick(() => {
            this.getThemeContent();
        })
    },
    methods: {
        getThemeContent: function() {
            this.$http.get('api/4/theme/'+this.$route.params.id).then((response) => {
                console.log(response.data);
                if(response.status == 200){
                    this.data = response.data;
                }
                // this.data = response.data;
            }, (error) => {
                console.log(error);
            });
        }

    }
}
</script>
<style>
.th-re{
    position: absolute;
    width: 50px;
}
.themes{
    padding-top: 40px;
}
.themes .header{
    background-size: cover;
    background-position: 0 -184px;
    background-color: rgba(0, 139, 237, 0);
    position: relative;
    z-index: 2;
    font-weight: bold;
    width: 100%;
    color:#fff;
    position: fixed;
    top:0;
    height: 40px;
    line-height: 40px;
    text-align: center
}
.art a{
    color:#000;
}
.editor img{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-left: 10px;
    vertical-align:middle;
}
.editor{
    height: 30px;
    line-height: 30px;
    padding-left: 1rem;
    border-bottom: 1px solid #eee;
    font-size: 1.4rem;
}
.list-content-box{
    /*margin-right: .267rem;*/
    display: inline-block;
   /* -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;*/
    /*width: 70% !important;*/
}
.art{
    border-bottom: 1px solid #eee;
    font-size: 1.6rem;
    padding: 1rem 1rem;
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

</style>
