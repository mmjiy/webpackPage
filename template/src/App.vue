<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

    export default {
        name: 'App',
        components:{

        },
        computed:{
        },
        methods:{

        }
    }
</script>

<style lang="scss">
    @import "~@/css/base.scss";
    html, body {
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft YaHei, 微软雅黑, Arial, sans-serif;
        line-height: 1.5;
        min-height: 100%;
        background: $color_bg_default;
        padding: 0;
        margin: 0;
    }

    a{
        text-decoration: none;

        &:link,&:visited,&:hover,&:active{
            color:#666;
        }

        &:active,&.active{
            color:#3c99e5;
        }
    }

    a:focus, input:focus {
        outline: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

        -webkit-user-modify: read-write-plaintext-only;
    }

    div, span, applet, object, iframe,
    dl, dt, dd, ul, ol, li,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    fieldset, form, label, legend,
    input, textarea, button, hr,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        font-size: 100%;
        vertical-align: baseline;
        list-style: none;
        list-style-position: outside;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    button, input, textarea {
        outline: none;
        border: 0px;
        background: none;
    }

    article, aside, details,
    figure, figcaption, footer, header,
    menu, nav, section, summary {
        display: block;
    }

    div, ul, li {
        display: block;
    }

    .tools{
        position: fixed;
        height: 200px;
        left:0;
        bottom:0;
        width: 80px;
        z-index: 99;

        &>span{
            display: block;
            text-align: center;
            margin-bottom: 5px;
            height: 30px;
            line-height: 30px;
            background: $color_topic_main;
            color:#fff;
            &:active{
                background: #f60;
            }
        }
    }
</style>
