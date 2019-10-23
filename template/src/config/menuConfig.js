let routers = [

]
let menuList = [];
let router = {};

if(process.env.NODE_ENV === "development") {
    routers.forEach(item=>{
        if(item.isMenu) {
            menuList.push({
                name: item.name,
                link: item.link,
                key: item.key,
            })
        }
        router[item.key]={
            name: item.name,
            link: item.link,
            key: item.key,
        };
    })
}
else{
    routers.forEach(item=>{
        if(item.isMenu) {
            menuList.push({
                name: item.name,
                link: item.linkPro,
                key: item.key,
            })
        }
        router[item.key]={
            name: item.name,
            link: item.linkPro,
            key: item.key,
        };
    })
}

export default {
    menuList,
    router
}
