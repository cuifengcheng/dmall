export const setCookie = (name, value, expiredays) => {
    let expire = new Date();
    let time = expire.getTime();
    expire.setTime(time + 1000 * 60 * 60 * 24 * expiredays);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expire.toGMTString()
}

export const getCookie = (name) => {
    if (document.cookie.length > 0) {
        let cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].charAt(0) == " ") {
                cookies[i] = cookies[i].substring(1)
            }
            if (cookies[i].indexOf(name) != -1) {
                let cook = decodeURIComponent(cookies[i]);
                return (cook.substring(cook.indexOf(name) + name.length + 1))
            }
        }
    }
}
