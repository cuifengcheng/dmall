import base64 from "js-base64";
import { VERSION, DOMAIN, UPLOADDOMAIN } from './constants.js'
import $ from 'jquery'

const getRandom = (num) => {
    let random = '';
    for (let i = 0; i < num; i++) {
        random += Math.floor(Math.random() * 100);
    }
    return random;
}

const encodeUTF8 = (s) => {
    var i, r = [],
        c, x;
    for (i = 0; i < s.length; i++)
        if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
        else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
    else {
        if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
            c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
            r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
        else r.push(0xE0 + (c >> 12 & 0xF));
        r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
    };
    return r;
}

const sha1 = (data) => {
    var i, j, t;
    var l = ((data.length + 8) >>> 6 << 4) + 16,
        s = new Uint8Array(l << 2);
    s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
    for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2);
    s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
    s[l - 1] = data.length << 3;
    var w = [],
        f = [
            function() {
                return m[1] & m[2] | ~m[1] & m[3];
            },
            function() {
                return m[1] ^ m[2] ^ m[3];
            },
            function() {
                return m[1] & m[2] | m[1] & m[3] | m[2] & m[3];
            },
            function() {
                return m[1] ^ m[2] ^ m[3];
            }
        ],
        rol = function(n, c) {
            return n << c | n >>> (32 - c);
        },
        k = [1518500249, 1859775393, -1894007588, -899497514],
        m = [1732584193, -271733879, null, null, -1009589776];
    m[2] = ~m[0], m[3] = ~m[1];
    for (i = 0; i < s.length; i += 16) {
        var o = m.slice(0);
        for (j = 0; j < 80; j++)
            w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
            t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
            m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
        for (j = 0; j < 5; j++) m[j] = m[j] + o[j] | 0;
    };
    t = new DataView(new Uint32Array(m).buffer);
    for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2);
    return new Uint8Array(new Uint32Array(m).buffer);
}

export const getSign = (data, version) => {
    let reqtime = new Date().getTime();
    let option = {
        _ver: version,
        _act: '',
        _method: 'GET', //default;
        _signonce: getRandom(6),
        _time: reqtime
    };
    let reqData = Object.assign({}, option, data);
    for (let key in reqData){
        if (typeof reqData[key] != "string" && typeof reqData[key] == "object") {
            reqData[key]= JSON.stringify(reqData[key])
        }
    }
    
    let sortkeys = Object.keys(reqData).sort();
    let sortDataString = '';
    for (let i = 0; i < sortkeys.length; i++) {
        sortDataString += encodeURIComponent(sortkeys[i]) + '=' + encodeURIComponent(reqData[sortkeys[i]]) + "&";
    }
    let dataArray = new Uint8Array(encodeUTF8(sortDataString + 'key=1qasw23e'));
    let result = sha1(dataArray);
    let hex = Array.prototype.map.call(result, function(e) {
        return (e < 16 ? "0" : "") + e.toString(16);
    }).join("");
    reqData._sign = base64.Base64.encode(hex);
    return reqData;
}

export const setDate = () => {
    var date = new Date();
    var expireDate = date.setTime(date.getTime() + 1000 * 60 * 60 * 0.5);
    $cookies.putObject("dasic_admin", {
        "userName": cook.userName,
        "uid": cook.uid,
        "gid": cook.gid,
    }, {
        expires: date
    })
}

export const httpFn = (data, option) => {
    (!option) && (option = {});
    var dataJson = getSign(data, VERSION);
    if (dataJson._method == "GET") {
        var json = "";
        for(let key in dataJson){
             json += key + "=" + dataJson[key] + "&"
        }
        dataJson = json.substring(0, json.length - 1);
    }
    var promise = new Promise((resolve, reject) => {
        $.ajax({
            url: DOMAIN + data._act,
            type: data._method,
            async: option.async || true,
            timeout: 10000,
            cache: option.cache || true,
            data: dataJson,
            success: function(res) {
                resolve(res);
            },
            error: function(e) {
                reject(e)
            }
        })
    });

    return promise;
}

export default httpFn;
