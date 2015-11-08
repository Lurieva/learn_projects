var ajax = (function () {
    var xhr;

    function createURI (url, hash) {
        if (hash) {
            return url + JSON.stringify(hash);
        }
        return url;
    }

    function createRequest () {
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xhr;
    }

    function sendRequest (method, url, hash, data, callback) {
        xhr = createRequest();
        xhr.open(method, createURI(url, hash), true);
        if (data) {
            xhr.send(JSON.stringify(data));
        }
        xhr.send();
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        });
    }

    function load (url, hash, data, callback) {
        var method = 'GET';
        sendRequest(method, url, hash, data, function (response) {
            callback(response);
        });
    }

    /*function destroy (url, hash, data, callback) {
        var method = 'DELETE';
        sendRequest(method, url, hash, function (response) {
            callback(JSON.parse(response));
        });
    }

    function update (url, hash, data, callback) {
        var method = 'PUT';
        sendRequest(method, url, hash, function (response) {
            callback(JSON.parse(response));
        });
    }

    function create (url, hash, data, callback) {
        var method = 'POST';
        sendRequest(method, url, hash, data, function (response) {
            callback(JSON.parse(response));
        });
    }*/

    return {
        load: load/*,
        destroy: destroy,
        create: create,
        update: update*/
    }
})();
