function addzero(input) {
    (input < 10) && (input = "0" + input);
    return input;
}

export default (date) => {
    if (!date) {
        return '';
    }
    if (typeof(date) != "object") {
        return date
    }
    var year = date.getFullYear();
    var month = addzero(date.getMonth() + 1);
    var day = addzero(date.getDate());
    var hour = addzero(date.getHours());
    var minu = addzero(date.getMinutes());
    return year + "-" + month + "-" + day + " " + hour + ":" + minu + ":" + "00";
}
