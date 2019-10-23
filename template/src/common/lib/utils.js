const _ = require("underscore");
import Vue from "vue";

/**
 * 通过时间戳获取时间格式
 * @param str
 * @constructor
 * @param format
 * @return {string}
 */
export function getTime(str, format) {
    str = parseInt(str);
    var D = false;
    if (isNaN(str)) {
        D = new Date();
    } else {
        D = new Date(str);
    }
    var ret = "";
    if (D && !isNaN(D.getTime())) {
        var fullyear = D.getFullYear();
        var month = D.getMonth() + 1;
        var date = D.getDate();
        var hours = D.getHours();
        var minute = D.getMinutes();
        var second = D.getSeconds();
        var doublemonth = month > 9 ? month : "0" + month;
        var doubledate = date > 9 ? date : "0" + date;
        var doubleyear = fullyear.toString().substr(2);
        var doublehours = hours > 9 ? hours : "0" + hours;
        var doubleminues = minute > 9 ? minute : "0" + minute;
        var doublesecond = second > 9 ? second : "0" + second;
        ret = format;
        ret = ret.replace(/YYYY/g, fullyear);
        ret = ret.replace(/YY/g, doubleyear);
        ret = ret.replace(/mm/g, doublemonth);
        ret = ret.replace(/m/g, month);
        ret = ret.replace(/dd/g, doubledate);
        ret = ret.replace(/d/g, date);
        ret = ret.replace(/hh/g, doublehours);
        ret = ret.replace(/h/g, hours);
        ret = ret.replace(/ii/g, doubleminues);
        ret = ret.replace(/i/g, minute);
        ret = ret.replace(/ss/g, doublesecond);
        ret = ret.replace(/s/g, second);
    }
    return ret;
}


export function dateStrFormat(str,format){
    str = str || "";
    let fullyear,month,date,hours,minute,second,ret;
    let a = str.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})/i);
    let b = str.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})/i);
    if(b && b.length>6){
        fullyear = b[1];
        month = b[2];
        date = b[3];
        hours = b[4];
        minute = b[5];
        second = b[6];
    }
    else if(a && a.length>5){
        fullyear = a[1];
        month = a[2];
        date = a[3];
        hours = a[4];
        minute = a[5];
        second = "00";
    }
    ret = format;
    ret = ret.replace(/YYYY/g, fullyear);
    ret = ret.replace(/mm/g, month);
    ret = ret.replace(/dd/g, date);
    ret = ret.replace(/hh/g, hours);
    ret = ret.replace(/ii/g, minute);
    ret = ret.replace(/ss/g, second);
    return ret;
}


/**
 * 将obj2 覆盖 obj1
 * @param obj1
 * @param obj2
 * @returns {*}返回一个新对象
 */
export function merageObj(obj1, obj2, options) {
    options = options || {};
    _.each(obj2, (iten, p) => {
        try {
            if (typeof (obj2[p]) == "object") {
                obj1[p] = merageObj(obj1[p], obj2[p], options);
            } else {
                //如果忽略""，则""或者null的时候不予替换
                if (options.ignoreNull) {
                    if (obj2[p] !== "" && obj2[p] !== null) {
                        Vue.set(obj1, p, obj2[p]);
                    }
                } else {
                    if (obj1[p] !== obj2[p]) {

                        Vue.set(obj1, p, obj2[p]);
                    }
                }
            }
        } catch (e) {

            Vue.set(obj1, p, obj2[p]);
        }
    });

    if (options.compareArray && _.isArray(obj1)) {
        _.each(obj1, (item, p) => {
            if (obj2[p] === undefined) {
                obj1.splice(p,1);
            }
        });
    }
    return obj1;
}


/**
 * 将obj2 覆盖 obj1
 * @param obj1
 * @param obj2
 * @returns {*}返回一个新对象
 */
export function cloneObject(obj2, options) {
    options = options || {};
    let obj1 = {};
    _.each(obj2, (item, p) => {
        if (typeof (item) == "object") {
            obj1[p] = cloneObject(item);
        } else {
            obj1[p] = item;
        }
    });
    return obj1;
}

export function clearObj(obj) {
    _.each(obj, (item, index) => {
        if (_.isObject(item)) {
            clearObj(item);
        } else {
            Vue.set(obj, index, "");
        }
    });
}

/**
 * 判断两个对象是否相等
 * @param obja
 * @param objb
 * @return {boolean}
 */
export function equals(obja, objb) {
    let ret = true;
    if (_.isObject(obja) && _.isObject(objb)) {
        //查询A对象拥有的值，b对象是否用
        _.each(obja, (item, i) => {
            if (objb[i] != item) {
                ret = false;
                return false;
            }
        });
        if (ret) {
            //查询B对象拥有的值，A对象是否用
            _.each(objb, (item, i) => {
                if (obja[i] != item) {
                    ret = false;
                    return false;
                }
            });
        }
    }

    return ret;
}


export function compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
        v1.push('0')
    }
    while (v2.length < len) {
        v2.push('0')
    }

    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i])
        const num2 = parseInt(v2[i])

        if (num1 > num2) {
            return 1
        } else if (num1 < num2) {
            return -1
        }
    }

    return 0
}
