import config from "@/config";

function resolveUrl(path) {
    let host = config.api.host;
    let port = config.api.port || "";
    let protocol = config.api.protocol;
    let subpath = config.api.path || "";
    if(/^\/shuttle/.test(path) || path.indexOf("test.php")>-1){
        subpath = "";
    }
    return protocol + host + port + subpath + path;
}


export default {
    url:{

    },
    resolveUrl
}
