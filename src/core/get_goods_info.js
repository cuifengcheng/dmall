import HttpFn from './http.js'

export const getGoods = (ids, list) => {
    return new Promise((resolve, reject) => {
        HttpFn({
            _act: "/api/item/search",
            item_ids: ids
        }).then(function(res) {
            let data = res.data;
            let listObj = {};
            for (let i = 0; i < data.length; i++) {
                listObj[data[i].id] = data[i];
            }
            for (let j = 0; j < list.length; j++) {
                for (let k = 0; k < list[j].item.length; k++) {
                    let id = list[j].item[k];
                    (!list[j]["goods"]) && (list[j]["goods"] = []);
                    (!!listObj[id]) && (list[j]["goods"].push(listObj[id]));
                }
            }
           resolve(list);
        }).catch(function(e) {
            console.log(e)
        })
    });
}

export default (list) => {
    let ids = [];
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].item.length; j++) {
            let id = list[i].item[j];
            if (ids.indexOf(id) == -1) {
                ids.push(id)
            }
        }
    }
    return getGoods(ids,list)
}

