// GET request
function httpGet(url) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

// POST request
function httpPost(url, body, callback) {
    let data = new FormData();
    for (let key of Object.keys(body)) {
        data.append(key, body[key])
    }

    console.log(body)
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, false);

    xmlHttp.setRequestHeader('Content-type', 'application/json');

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            updateTypeList()
            callback()
            return xmlHttp.responseText
        }
    }

    xmlHttp.send(JSON.stringify(body));
}