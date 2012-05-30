(function () {
    'use strict';
    var tablica,
        a = {
            ciatko: {
                inner: {
                    jeden: 'jedenjeden'
                }
            },
            gazeta: 'fakt',
            ksiazka: 'jakas'
        };


    function be(objectInside) {
        var tab = [],
            i;
        for (i in objectInside) {
            if (objectInside.hasOwnProperty(i)) {
                console.log(i, objectInside[i]);   // klucz -  wartość
                tab.push(objectInside[i]);
            }
        }

        return tab;
    }
    tablica = be(a);
    console.log(tablica);
}());