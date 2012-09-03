(function (global) {
    'use strict';

    /**
     * Przypisanie globalnego obiektu tatry do zmiennej lokalnej tatry
     * @type {*}
     */
    var tatry = global.tatry;

    /**
     * Wyciaga tekst z columnmy o podanym numerku col_number i dodaje go do tablicy unique_data;
     * @param {Number} col_number Numer kolumny
     * @return {Array} Zwraca tablice zawierajaca tekst ze wszytskich TD w podanej kolumnie
     * @function
     */
    function get_unique_data_from_column(col_number) {
        var unique_data = [];
        $('tbody tr:visible').each(function () {
            var td = $(this).find('td').eq(col_number).text();
            if (jQuery.inArray(td, unique_data) === -1) {
                unique_data.push(td);
            }
        });
        return unique_data;
    }

    /**
     * Pobieram id selekta do którego dodaje pola option wypełnione wartościami wyciągniętymi z td
     * @param {Array} unique_data Tablica zawierająca tekst z pól td
     * @param {String} select_id Przekazanie id selekta do którego dodaje nowe pola option z zawartoscia
     * @function
     */
    function set_data_to_select(unique_data, select_id) {
        var select = $(select_id);
        for (var i = 0; i < unique_data.length; i++) {
            var item = unique_data[i];
            var option = $('<option></option>').attr({value: item}).text(item);
            select.append(option);
        }
    }

    /**
     * Tworze obiekt loader
     * @type {Object}
     */
    tatry.loader = {
        /**
         * @memberOf tatry.loader
         * @function
         */
        date: function () {
            console.log("[+] tatry.loader.date()");

            var unique_data = get_unique_data_from_column(0);
            set_data_to_select(unique_data, '#filter-select-date');
        },
        /**
         * @memberOf tatry.loader
         * @function
         */
        where: function () {
            console.log("[+] tatry.loader.where()");

            var unique_data = get_unique_data_from_column(1);
            set_data_to_select(unique_data, '#filter-select-where');
        },
        /**
         * @memberOf tatry.loader
         * @function
         */
        who: function () {
            console.log("[+] tatry.loader.who()");

            var unique_data = get_unique_data_from_column(2);
            set_data_to_select(unique_data, '#filter-select-who');
        },
        /**
         * @memberOf tatry.loader
         * @function
         */
        age: function () {
            console.log("[+] tatry.loader.age()");

            var unique_data = get_unique_data_from_column(3);
            set_data_to_select(unique_data, '#filter-select-age');
        },
        /**
         * @memberOf tatry.loader
         * @function
         */
        przyczyna: function () {
            console.log("[+] tatry.loader.przyczyna()");

            var unique_data = get_unique_data_from_column(4);
            set_data_to_select(unique_data, '#filter-select-przyczyna');
        },
        /**
         * @memberOf tatry.loader
         * @function
         */
        skutek: function () {
            console.log("[+] tatry.loader.skutek()");

            var unique_data = get_unique_data_from_column(5);
            set_data_to_select(unique_data, '#filter-select-skutek');
        },
        /**
         * @memberOf tatry.loader
         * @function
         */
        desc: function () {
            console.log("[+] tatry.loader.desc()");

            var unique_data = get_unique_data_from_column(6);
            set_data_to_select(unique_data, '#filter-select-desc');
        }
    };

    console.log('[info] Tworzenie obiektu: tatry.loader: ', tatry.loader);

}(this));
