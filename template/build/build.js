'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'
process.env.SERVICE_CONFIG = "";

const ora = require('ora')
const rm = require('rimraf')
const fs = require("fs")
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const configFile = (process.argv && process.argv.length > 2) ? process.argv[process.argv.length - 1] : false;
const config = require('../config')
const fs_helper = require("./fs_helper");
const versionParse  = require("./version");

let env = require('../config/prod.env')


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

let versionLog = false;
try {
    versionLog = fs.readFileSync("./version.json", "utf8");
    versionLog = JSON.parse(versionLog);
} catch (e) {
    versionLog = false;
}


if (configFile) {
    let data = false;
    try {
        data = fs.readFileSync(configFile, "utf8");
        data = JSON.parse(data);
        if (data) {
            if (data.publish) {
                config.build.assetsRoot = data.publish
            }
            if (data.publish_html_dir) {
                config.build.htmlDir = data.publish_html_dir;
            } else {
                config.build.htmlDir = data.publish;
            }


            let dir = resolve("config/server/" + data.env + ".env.js");
            if (data.env && fs.existsSync(dir)) {
                let envHandle = require(dir);
                if (envHandle) {
                    env = envHandle;
                    config.build.serverEnv = data.env;
                }
            }
            if (data.api) {
                if (data.api.host) env.API.HOST = "'" + data.api.host + "'";
                if (data.api.protocol) env.API.PROTOCOL = "'" + data.api.protocol + "'";
                if (data.api.path) env.API.PATH = "'" + data.api.path + "'";
            }
            if (data["assets_public_path"]) {
                config.build.assetsPublicPath = data["assets_public_path"];
            }
        }
    } catch (e) {
        console.log(e);
    }
}
//根据版本号，给生成路径增加版本
if (versionLog) {
    if (versionLog.version && versionLog.log[versionLog.version]) {
        config.build.assetsRootOrigin = config.build.assetsRoot;
        config.build.assetsRoot += "/" + versionLog.version;
        config.build.htmlDirOrigin = config.build.htmlDir;
        config.build.htmlDir += "/" + versionLog.version;
        config.build.versionLog = versionLog;
    }
}


const webpackConfig = require('./webpack.prod.conf')


const spinner = ora('building for production...')
spinner.start()


rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err
        //console.log(stats);
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }
        //有版本的时候需要做版本控制
        if (versionLog.version && versionLog.log[versionLog.version]) {
            //清除外面一层的static
            rm(path.join(config.build.assetsRootOrigin, config.build.assetsSubDirectory), errorObject => {
                if (errorObject) throw errorObject;

                //不同目录需要看看是否包含
                if (config.build.assetsRoot != config.build.htmlDir) {
                    //html包含root<则赋值html
                    if (config.build.htmlDir.indexOf(config.build.assetsRoot) > -1) {
                        fs_helper.exists(config.build.htmlDir, config.build.htmlDirOrigin, fs_helper.copy);
                    }
                    //root包含html，则复制root
                    else if (config.build.assetsRoot.indexOf(config.build.htmlDir) > -1) {
                        fs_helper.exists(config.build.assetsRoot, config.build.assetsRootOrigin, fs_helper.copy);
                    }
                    //否则分别复制
                    else {
                        fs_helper.exists(config.build.htmlDir, config.build.htmlDirOrigin, fs_helper.copy);
                        fs_helper.exists(config.build.assetsRoot, config.build.assetsRootOrigin, fs_helper.copy);
                    }


                }
                //都相同，则复制其中一个就OK了
                else if (config.build.assetsRoot == config.build.htmlDir) {
                    fs_helper.exists(config.build.assetsRoot, config.build.assetsRootOrigin, fs_helper.copy);
                }

                //写入版本切换Html
                versionParse(versionLog.version,versionLog.log).then(html=>{
                    fs.writeFile(config.build.htmlDirOrigin+"/version.html",html,data=>{

                    });
                },error=>{
                    console.log(error);
                })

            })


        }

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
})

