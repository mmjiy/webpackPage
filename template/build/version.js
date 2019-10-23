const Vue = require('vue')

const renderer = require('vue-server-renderer').createRenderer()

let out = function (version,versionList) {
    return new Promise(((resolve, reject) => {
        const vm = new Vue({
            data: {
                list: versionList,
                version:version
            },
            template:
                '<!DOCTYPE html>' +
                '<html lang="en">' +
                '<head>' +
                '<meta charset="utf-8">' +
                `<style>
                body{
                    padding:20px;
                }
                a{
                    text-decoration:none;
                    padding-bottom:5px;
                    color:#09F;
                    font-size:18px;
                }
                .time{
                        display:block;
                        color:#999;
                        padding:5px 0px 10px 0px;
                        font-size:12px;
                    }
                .split{
                        padding-bottom:20px;
                        border-bottom:1px solid #ccc;
                        margin-bottom:10px;
                    }
                .des{
                        font-size:14px;
                        color:#666;
                        white-space:pre;
                    }
                </style>` +
                '</head>' +
                '<body>' +
                '<h1></h1>' +
                '<div v-for="(item,index) in list">' +
                '<a :href="index">版本：</a>' +
                '<span class="time"></span>' +
                '<div class="des"><span v-for="logItem in item.message"></span></div>' +
                '<div class="split"></div>' +
                '</div>' +
                '</body>' +
                '</html>'
        })

        renderer.renderToString(vm, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        })
    }))

}

module.exports = out;
