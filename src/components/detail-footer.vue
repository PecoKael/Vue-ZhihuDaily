<template>
    <div class="detail-tab">
        <div class="tab-item" onclick="window.history.go(-1)">
            <i class="iconfont icon-jiantou-copy"></i>
        </div>
        <div class="tab-item">
            <i class="iconfont icon-jiantou-copy1"></i>
        </div>
        <div class="tab-item">
            <i class="iconfont icon-down"></i>
            <span class="zan">{{extra.popularity}}</span>
        </div>
        <router-link :to="{ name: 'comments',  params: { id: $route.params.id }}">
            <div class="tab-item">
                <span class="comment">{{extra.comments}}</span>
                <i class="iconfont icon-pinglun"></i>
            </div>
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'detailFooter',
    props: ['extra'],
}
</script>
<style>
.detail-tab {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 40px;
    background: #fff;
    z-index: 2;
    border-top: 1px solid #eee;
    max-width: 800px;
}

.detail-tab .tab-item {
    position: relative;
    display: inline-block;
    width: 24%;
    text-align: center;
    line-height: 40px;
}

span.zan {
    position: relative;
    top: -10px;
}

span.comment {
    display: block;
    position: absolute;
    top: 7px;
    color: #fff;
    left: 40px;
    left: 52%;
    width: 25px;
    height: 14px;
    line-height: 14px;
    background: #1fb3f0;
}

.night .detail-tab {
    background-color: #333333;
    border-top-color: #2f2f2f;
    color: #868686;
}

.night .detail-tab .icon-pinglun {
    color: #868686;
}
</style>
