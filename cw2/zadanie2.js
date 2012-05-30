/*jslint plusplus: true */
(function () {
    "use strict";
    // https://github.com/piecioshka/global
    var global = (function(){ return this || (1,eval)('this') })(),

        ipla = global.ipla,
        document = global.document;

    // http://code42.pl/2011/08/20/co-lepiej-wiedziec-o-javascriptcie-cz-2-hoisting-deklaracje-funkcji-i-wyrazenia-funkcyjne/

    /*
    for (var i in ipla) {
        if (Array.isArray(ipla[i])) {
            // list
            for (var x = 0; x < ipla[i].length; x++) {
                console.log(ipla[i][x]);
            }
        } else {
            // config
            for (var y in ipla[i]) {
                console.log(ipla[i][y])
            }
        }
    }
    */

    function getCanals() {
        var canals = [],
            i;
        for (i = 0; i < ipla.list.length; i++) {
            canals.push({name: ipla.list[i].name, url: ipla.list[i].params.feedUrl});
        }
        return canals;
    }

    function canalsToLinks(c) {
        var i,
            dynamicLink,
            canal;

        for (i = 0; i < c.length; i++) {
            dynamicLink = document.createElement('a');
            canal = c[i];
            dynamicLink.href = canal.url;
            dynamicLink.innerHTML = canal.name;
            document.body.appendChild(dynamicLink);
            document.body.innerHTML += " ";
        }

    }

    global.onload = function () {
        canalsToLinks(getCanals());
    };
    //console.info(canals);
}());