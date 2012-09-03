(function (global) {
    'use strict';

    var tatry = global.tatry;

    /**
     * Tworzenie obiektu filter
     * @type {Object}
     */
    tatry.filter = {
        /**
         * Filtruje kolumny według frazy
         * @param {Number} column
         * @param {String} query
         * @memberOf tatry.filter
         * @function
         */
        column: function (column, query) {
            console.log("[+] tatry.filter.column(" + column + ", \"" + query + "\")");

            $('tbody tr').each(function () {
                var val = $(this).find('td').eq(column).text();
                if (val.toLowerCase() != query.toLowerCase()) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
        },
        /**
         * Pokazywanie wszytskich wierszy (reset)
         * @memberOf tatry.filter
         * @function
         */
        reset: function () {
            console.log("[+] tatry.filter.reset()");
            $('tbody tr').show();
        }
    };

    console.log('[info] Tworzenie obiektu: tatry.filter: ', tatry.filter);

}(this));
