'use strict'  

var database = (function() {

    function isLocalStorageAvailable() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

    function setItem(item, data) {
        try {
            localStorage.setItem(item, JSON.stringify(data));
        } catch (e) {
            return;
        }
    }

    function getItem(item) {
        var item = localStorage.getItem(item);
        if (item) {
            return JSON.parse(item);
        }
        return undefined;
    }

    function clearStorage() {
        localStorage.clear(); 
    }

    function removeItem(item) {
        localStorage.removeItem(item);  
    }

    function getAllItem() {
        var i,
            item,
            array = [];
        for (i in localStorage){
            if (localStorage.hasOwnProperty(i)) {
                item = getItem(i);
                if (item) {
                    array.push(item);
                }
            }
        }
        return array;
    }

    return {
        isLocalStorageAvailable: isLocalStorageAvailable,
        setItem: setItem,
        getItem: getItem,
        removeItem: removeItem,
        clearStorage: clearStorage,
        getAllItem: getAllItem
    }
})();
