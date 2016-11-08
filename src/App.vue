<template>
    <div id="main">
        <router-view></router-view>
    </div>
</template>
<script>
</script>
<style>
html {
    font-size: 62.5%;
    font-family: sans-serif;
    -webkit-text-size-adjust: 100%;
    height: 100%;
}

body {
    font-family: 'Helvetica Neue', Helvetica, Arial, Sans-serif;
    background: #fff;
    padding-top: 0;
    margin: 0;
    height: 100%;
}


#main {
    max-width: 800px;
    margin: 0 auto;
    height: 100%;
}
#main.night{
    background-color: #343434;
}
a{
    color: #000;
    text-decoration: none;
}

</style>
