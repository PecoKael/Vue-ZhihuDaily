<template>
    <div class="editors">
        <!-- editor -->
        <div class="editors-header">
            <div class="th-re" onclick="window.history.go(-1)">
                <i class="iconfont icon-jiantou-copy"></i>
            </div>
            主编
        </div>
        <div class="ed-box" v-for="e in data.editors">
            <i class="iconfont icon-jiantou edfr"></i>
            <div class="avator">
                <img :src="e.avatar.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')" alt="">
            </div>
            <div class="ed-content">
                <span>{{e.name}}</span>
                <p>{{e.bio}}</p>
            </div>
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
        },
    }
}
</script>
<style>
.edfr{
   position: absolute;
   right: 10px;
   top:20px;
   color:#b1b1b1;
}
.ed-content{
    display: inline-block;   
    float:left;
    margin-left: 10px; 
}
.ed-content span{
    line-height: 30px;
    font-size: 1.4rem;
}
.ed-content p{
    margin:0;
    color: #b1b1b1;
}
.avator{
    width: 35px;
    height: 35px;
    /*height: 100%;*/
    float: left;
    vertical-align: center;
    display: inline-block;
    margin-top: 7.5px;
}
.avator img{
    width: 100%;
    height: 100%;
    border-radius: 40px;
    vertical-align: center;
}
.ed-box{
    padding-left: 20px;
    /*width: 100%;*/
    height: 50px;
    position: relative;
    border-bottom: 1px solid #eee;
}
.editors-header{
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 1.8rem;
    background-color: #00a2ed;
}
.editors-header .th-re{
    width: 40px;
    text-align: center;
    /*height: 100%;*/
    color: #fff;
    position: absolute;
    left:0;
}
</style>
