function checkUrl(conf, url) {
    let finalTemp = '';
    for (let temp in conf) {
        let regTemp = temp.split('/').map((item) => {
            if (item[0] === ':' ) {
                return '[a-zA-Z0-9_][a-zA-Z0-9_-]{0,50}';
            } else return item;
        }).join('\\/');
        regTemp = '^' + regTemp + '$';
        const reg = new RegExp(regTemp);
        if (reg.test(url)) {
            finalTemp = temp;
            break;
        }
    }
    return finalTemp;
}

function getParamsFromUrl(temp, url) {
    const output = {};
    const urlArr = url.split('/');
    temp.split('/').forEach((item, index) => {
    if (item[0] === ':') {
        const key = item.slice(1);
        output[key] = urlArr[index];
    }    
    });
    return output;
}

module.exports = {
    checkUrl,
    getParamsFromUrl
};