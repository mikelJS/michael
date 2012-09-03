(function (global) {
    "use strict";

    var TABLE = '#tatryTable';

    /**
     * Przestrzeń nazw która zawiera obiekty i funkcje
     * @type {Object}
     */
    global.tatry = {
        /**
         * Wywołanie funkcji
         * @memberOf global.tatry
         */
        init: function () {
            console.log('[+] tatry.init()');

            tatry.bind();

            console.log("[info] Ładujemy dane do elementów: <select>");
            tatry.loader.date();
            tatry.loader.where();
            tatry.loader.who();
            tatry.loader.age();
            tatry.loader.przyczyna();
            tatry.loader.skutek();
            tatry.loader.desc();
        },
        /**
         * Podpięcie eventu click
         * @memberOf global.tatry
         * @function
         */
        bind: function () {
            console.log('[+] tatry.bind()');

            $(TABLE).find('th').toggle(function () {
                var attrElement = $(this).attr('sort'),
                    col = $(this).index(),
                    data = tatry.get_data();

                data = tatry.sorter[attrElement](data, col, 'asc');
                $('tbody', TABLE).html(data); // umieszczam posortowane elementy
            }, function () {
                var attrElement = $(this).attr('sort'),
                    col = $(this).index(),
                    data = tatry.get_data();

                data = tatry.sorter[attrElement](data, col, 'desc');
                $('tbody', TABLE).html(data);
            });
        },

        /**
         * Pobiera wszytskie wiersze TR
         * @return {jQuery}
         * @memberOf global.tatry
         * @function
         */
        get_data: function () {
            return $('tbody', TABLE).find('tr');
        }
    };

    console.log('[info] Tworze globalny obiekt: tatry: ', tatry);

}(this));
