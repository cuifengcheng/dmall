import httpFn from '../../core/http.js'

const trans = (data) => {
    let arry = [];
    if (!!data) {
        for (let key in data) {
            const json_ = {
                link: data[key].link,
                pic: data[key].pic,
                key: key,
            };
            (!!data[key].item) && (json_.item = data[key].item);
            (!!data[key].count) && (json_.count = data[key].count);
            arry.push(json_)
        }
    }
    return arry;
}

const colIds = (data, ids) => {
    for (let i = 0; i < data.length; i++) {
        let item = data[i].item || data;
        for (let j = 0; j < item.length; j++) {
            if (ids.indexOf(item[j]) == -1) {
                ids.push(item[j])
            }
        }
        if (!data[i].item) {
            break;
        }
    }
    return ids
}
const getGoods = (list, listObj) => {
    for (let j = 0; j < list.length; j++) {
        if (!!list[j].item) {
            (!list[j]["goods"]) && (list[j]["goods"] = []);
            for (let k = 0; k < list[j].item.length; k++) {
                let id = list[j].item[k];
                (!!listObj[id]) && (list[j]["goods"].push(listObj[id]));
            }
        } else {
            for (let k = 0; k < list.length; k++) {
                let id = list[k];
                (!!listObj[id]) && (list[k] = listObj[id]);
            }
        }
    }
    for (let j = 0; j < list.length; j++) {
        if (typeof list[j] == 'string') {
            list.splice(j, 1);
        }
    }
    return list
}

export const getHomeData = () => {
    return function(dispatch, getState) {
        if (!getState().home.had) {
            let lunboArry, adposArry, navigationObj, headerpicArry, listitemArry, slideitemArry, bottompicArry, recomdbrandObj, recomditemArry;
            return httpFn({ _act: '/api/index/index' }).then(function(res) {
                const { lunbo, adpos, navigation, headerpic, listitem, slideitem, recomditem, bottompic, recomdbrand } = res.data;
                lunboArry = trans(lunbo);
                adposArry = trans(adpos);
                navigationObj = {
                    list: trans(navigation.info),
                    lineCount: navigation.count || 4
                };
                headerpicArry = trans(headerpic);
                listitemArry = trans(listitem);
                slideitemArry = trans(slideitem);
                bottompicArry = trans(bottompic);
                recomdbrandObj = {
                    list: trans(recomdbrand.info),
                    show: recomdbrand.show == "1" ? true : false
                }
                recomditemArry = recomditem;
                let group = [listitemArry, slideitemArry, recomdbrandObj.list, recomditem],
                    ids = [];
                for (let k = 0; k < group.length; k++) {
                    ids = colIds(group[k], ids);
                }
                return httpFn({
                    _act: "/api/item/search",
                    item_ids: ids
                })
            }).then(function(res) {
                let data = res.data;
                let listObj = {};
                for (let i = 0; i < data.length; i++) {
                    listObj[data[i].id] = data[i];
                }
                listitemArry = getGoods(listitemArry, listObj)
                slideitemArry = getGoods(slideitemArry, listObj)
                recomdbrandObj.list = getGoods(recomdbrandObj.list, listObj)
                recomditemArry = getGoods(recomditemArry, listObj)
                dispatch({
                    type: "HASGETHOMEINFO",
                    homeInfo: {
                        lunbo: lunboArry,
                        advpos: adposArry,
                        navigation: navigationObj,
                        headerpic: headerpicArry,
                        bottompic: bottompicArry,
                        listitem: listitemArry,
                        slideitem: slideitemArry,
                        recomditem: recomditemArry,
                        styleInfo: recomdbrandObj
                    },
                    had: true
                })
            }).catch(function(e) {
                console.log(e)
            })
        } else {
            return false
        }
    }
}

const initialData = {
    homeInfo: {
        lunbo: [],
        advpos: [],
        navigation: {
            list: [],
            lineCount: 4,
        },
        headerpic: [],
        bottompic: [],
        listitem: [],
        slideitem: [],
        recomditem: [],
        styleInfo: {
            list: [],
            show: false
        },
    },
    had: false
}

export default (state = initialData, action) => {
    if (action.type == "HASGETHOMEINFO") {
        return {...state, had: action.had, homeInfo: action.homeInfo }
    } else {
        return state;
    }
};
