var helper = (function () {
    
    function templater (tpl, obj) {
        for (var key in obj) {
            tpl = tpl.replace('<%=' + key + '%>', obj[key]);
        }
        return tpl;
    };

    function on (event, element, func) {
        element.addEventListener(event, func, false);
    };

    function each (collection, func) {
        [].forEach.call(collection, func); 
    };

    return {
        templater: templater,
        on: on,
        each: each
    }
})()
