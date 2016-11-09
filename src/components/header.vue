<template>
<div class="header">
    <div v-show = "back" class="th-re" onclick="window.history.go(-1)">
        <i class="iconfont icon-jiantou-copy"></i>
    </div>
    {{title}}
</div>
</template>

<script>

export default {
    name: 'header',
    props: ['title', 'back'],
    data() {
        return {
            items: [],
            day: 1,
            date:''
        }
    },

    mounted: function() {

    },
    methods: {

    }
}
</script>
<style>
.night .header{
    background-color: #444;
}
.header{
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 1.8rem;
    background-color: #00a2ed;
    position: fixed;
    top:0;
    z-index:99;
}
.header .th-re{
    width: 40px;
    text-align: center;
    color: #fff;
    position: absolute;
    left:0;
}
</style>
