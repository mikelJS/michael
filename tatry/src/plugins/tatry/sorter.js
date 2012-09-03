(function (global) {
    'use strict';

    var tatry = global.tatry;

    // Dodajemy metoda do jQuery
    // metoda reverse() - identyczne zachowanie jak Array.reverse();
    $.fn.reverse = [].reverse;

    /**
     * Po kliknieciu  ustawia typ sortowania ASC lub DESC
     * @param data
     * @param col
     * @param type
     * @return {jQuery}
     */
    function sort_helper(data, col, type) {
        if (type === 'asc') {
            return ascending(data, col);
        } else {
            return descending(data, col);
        }
    }

    /**
     * Sortowanie malejące
     * @param {jQuery} data
     * @param {Number} col
     * @return {jQuery}
     */
    function ascending(data, col) {
        return data.sort(function (a, b) {
            a = $(a).find('td:visible').eq(col).text();
            b = $(b).find('td:visible').eq(col).text();
            if (b > a) {
                return 1;
            }
            if (a > b) {
                return -1;
            }
            if (a === b) {
                return 0;
            }
        });
    }

    /**
     * Sortowanie rosnące
     * @param {jQuery} data
     * @param {Number} col
     * @return {jQuery}
     * @function
     */
    function descending(data, col) { //malejaco
        data = ascending(data, col);
        return data.reverse();
    }

    /**
     * Ustawia typ sortowania tylko dla kolumny z datą
     * @param {jQuery} data
     * @param {Number} col
     * @param {String} type
     * @return {Array}
     * @function
     */
    function sort_date_helper(data, col, type) {
        if (type === 'asc') {
            return sort_date_ascending(data, col);
        } else {
            return sort_date_descending(data, col);
        }
    }

    /**
     * Prymitywne sortowanie daty
     * @param {Object} a
     * @param {Object} b
     * @return {Number}
     * @function
     */
    function sort_date_primitive(a, b) {
        if (a.year === b.year) {
            if (a.month === b.month) {
                if (a.day > b.day) {
                    return -1;
                } else if (a.day < b.day) {
                    return 1;
                } else {
                    return 0;
                }
            } else if (a.month > b.month) {
                return -1;
            } else {
                return 1;
            }
        } else if (a.year > b.year) {
            return -1;
        } else {
            return 1;
        }
    }

    /**
     * Sortowanie daty rosnąco
     * @param {jQuery} data
     * @param {Number} col
     * @return {Array}
     * @function
     */
    function sort_date_ascending(data, col) {
        var array = convert_date_to_number(data, col);
        array.sort(sort_date_primitive);

        var array_tr = [];
        for (var i = 0; i < array.length; i++) {
            array_tr.push(array[i].tr);
        }
        return array_tr;
    }

    /**
     * Sortowanie daty malejąco
     * @param {jQuery} data
     * @param {Number} col
     * @return {Array}
     * @function
     */
    function sort_date_descending(data, col) {
        var array = convert_date_to_number(data, col);
        array.sort(sort_date_primitive);
        array.reverse();

        var array_tr = [];
        for (var i = 0; i < array.length; i++) {
            array_tr.push(array[i].tr);
        }
        return array_tr;
    }

    /**
     * Tworzenie obiektu sorter
     * @type {Object}
     */
    tatry.sorter = {
        /**
         * Typ sortowania alfabetyczny
         * @param {jQuery} data
         * @param {Number} col
         * @param {String} type
         * @return {jQuery}
         * @memberOf tatry.sorter
         * @function
         */
        alphabetic: function (data, col, type) {
            console.log("[+] tatry.sorter.alphabetic(/data/, " + col + ", \"" + type + "\")");
            return sort_helper(data, col, type);
        },

        /**
         * Typ sortowania numeryczny
         * @param {jQuery} data
         * @param {Number} col
         * @param {String} type
         * @return {jQuery}
         * @memberOf tatry.sorter
         * @function
         */
        numeric: function (data, col, type) {
            console.log("[+] tatry.sorter.numeric(/data/, " + col + ", \"" + type + "\")");
            return sort_helper(data, col, type);
        },

        /**
         * Typ sortowania data
         * @param {jQuery} data
         * @param {Number} col
         * @param {String} type
         * @return {jQuery}
         * @memberOf tatry.sorter
         * @function
         */
        date: function (data, col, type) {
            console.log("[+] tatry.sorter.date(/data/, " + col + ", \"" + type + "\")");
            return sort_date_helper(data, col, type);
        },

        /**
         * Typ sortowania opis
         * @param {jQuery} data
         * @param {Number} col
         * @param {String} type
         * @return {jQuery}
         * @memberOf tatry.sorter
         * @function
         */
        description: function (data, col, type) {
            console.log("[+] tatry.sorter.description(/data/, " + col + ", \"" + type + "\")");
            return sort_helper(data, col, type);
        }
    };

    console.log('[info] Tworzenie obiektu: tatry.sorter: ', tatry.sorter);

}(this));
