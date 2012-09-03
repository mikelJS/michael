(function (global) {
    "use strict";

    // Dodajemy metoda do jQuery
    // metoda reverse() - identyczne zachowanie jak Array.reverse();
    $.fn.reverse = [].reverse;

    var TABLE = '#tatryTable';

    function sort_helper(data, col, type) {
        console.log("sort_helper(/data, col, type/)");
        if (type == 'asc') {
            return tatry.ascending(data, col);
        } else {
            return tatry.descending(data, col);
        }
    }

    function sort_date_helper(data, col, type) {
        console.log("sort_date_helper(/data, col, type/)");
        if (type == 'asc') {
            return sort_date_ascending(data, col);
        } else {
            return sort_date_descending(data, col);
        }
    }

    function sort_date_primitive(a, b) {
        console.log("sort_date_primitive");
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

    function convert_date_to_number(data, col) {
        console.log("convert_date_to_number(/data, col/)");
        var array = [];
        for (var i = 0; i < data.length; i++) {
            var tr = $(data[i]);
            var item = tr.find('td:visible').eq(col).text();
            var itemArray = item.split('.');
            array.push({
                year: parseInt(itemArray[2], 10),
                month: parseInt(itemArray[1], 10),
                day: parseInt(itemArray[0], 10),
                tr: tr.get(0) // tr[0]
            });
        }
        return array;
    }

    function sort_date_ascending(data, col) {
        console.log("sort_date_ascending(/data, col/)");
        var array = convert_date_to_number(data, col);
        array.sort(sort_date_primitive);

        var array_tr = [];
        for (var i = 0; i<array.length; i++) {
            array_tr.push(array[i].tr);
        }
        console.log(array_tr);
        return array_tr;
    }

    function sort_date_descending(data, col) {
        console.log("sort_date_descending(/data, col/)");
        var array = convert_date_to_number(data, col);
        array.sort(sort_date_primitive);
        array.reverse();

        var array_tr = [];
        for (var i = 0; i<array.length; i++) {
            array_tr.push(array[i].tr);
        }
        console.log(array_tr);
        return array_tr;
    }
    function get_unique_data_from_column(col_number) {
        console.log('get_unique_data_from_column');
        var unique_data = [];
        $('tbody tr:visible').each(function() {
            var td = $(this).find('td').eq(col_number).text();
            if(jQuery.inArray(td, unique_data) == -1 ) {
                unique_data.push(td);
            }
        });
        return unique_data;
    }
    function set_data_to_select(unique_data, select_id) {
        console.log('set_data_to_select');
        var select = $(select_id);
        for (var i = 0; i < unique_data.length; i++) {
            var item = unique_data[i];
            var option = $('<option></option>').attr({value: item}).text(item);
            select.append(option);
        }
    }



    global.tatry = {
        init: function () {
            console.log('tatry.init()');
            tatry.bind();
            tatry.fill.date();
            tatry.fill.where();
            tatry.fill.who();
            tatry.fill.age();
            tatry.fill.przyczyna();
            tatry.fill.skutek();
            tatry.fill.desc();
        },

        bind: function () {
            console.log('tatry.bind()');
            $(TABLE).find('th').toggle(function () {
                var attrElement = $(this).attr('sort'),
                    col = $(this).index(),
                    data = tatry.get_data();

                data = tatry.sort[attrElement](data, col, 'asc');
                $('tbody', TABLE).html(data); // umieszczam posortowane elementy
            }, function () {
                var attrElement = $(this).attr('sort'),
                    col = $(this).index(),
                    data = tatry.get_data();

                data = tatry.sort[attrElement](data, col, 'desc');
                $('tbody', TABLE).html(data);
            });
        },

        /**
         * @return {jQuery}
         */
        get_data: function () {
            return $('tbody', TABLE).find('tr');
        },

        /**
         * @param {jQuery} data
         * @param {Number} col
         * @return {jQuery}
         */
        ascending: function (data, col) { //rosnac
            console.log('tatry.ascending(/data, col/)');
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
        },

        /**
         * @param {jQuery} data
         * @param {Number} col
         * @return {jQuery}
         */
        descending: function (data, col) { //malejaco
            console.log('tatry.descending(/data, col/)');
            data = tatry.ascending(data, col);
            return data.reverse();
        },

        sort: {
            alphabetic: function (data, col, type) {
                console.log('tatry.sort.alphabetic(/data, col, type/)');
                return sort_helper(data, col, type);
            },

            numeric: function (data, col, type) {
                console.log('tatry.sort.numeric(/data, col, type/)');
                return sort_helper(data, col, type);
            },

            date: function (data, col, type) {
                console.log('tatry.sort.date(/data, col, type/)');
                return sort_date_helper(data, col, type);
            },

            description: function (data, col, type) {
                console.log('tatry.sort.description(/data, col, type/)');
                return sort_helper(data, col, type);
            }
        },
        filter_column: function(column, query) {
            console.log('tatry.filter_column');
            $('tbody tr').each(function(){
                var val = $(this).find('td').eq(column).text();
                if(val.toLowerCase() != query.toLowerCase()) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            })
        },
        filter_reset: function() {
            $('tbody tr').show();
        },
        fill: {
            date: function(){
                var unique_data = get_unique_data_from_column(0);
                set_data_to_select(unique_data, '#filter-select-date');
            },
            where: function(){
                var unique_data = get_unique_data_from_column(1);
                set_data_to_select(unique_data, '#filter-select-where');
            },
            who: function(){
                var unique_data = get_unique_data_from_column(2);
                set_data_to_select(unique_data, '#filter-select-who');
            },
            age: function(){
                var unique_data = get_unique_data_from_column(3);
                set_data_to_select(unique_data, '#filter-select-age');
            },
            przyczyna: function(){
                var unique_data = get_unique_data_from_column(4);
                set_data_to_select(unique_data, '#filter-select-przyczyna');
            },
            skutek: function(){
                var unique_data = get_unique_data_from_column(5);
                set_data_to_select(unique_data, '#filter-select-skutek');
            },
            desc: function(){
                var unique_data = get_unique_data_from_column(6);
                set_data_to_select(unique_data, '#filter-select-desc');
            }
        }
    };

    $(function(){
        $('#filter-submit').on('click', function(){
            var val = $('#filter-where-input').val();
            tatry.filter_column(1,val);
        });
        $('#filter-reset-submit').on('click', function(){
            tatry.filter_reset();
            $('#filter-where-input').val('');
            $('select').val('wybierz...');
        });
        $('select').on('change', function(){
            var val = $(this).val();
            tatry.filter_column($(this).index(),val);
        });
    })


}(this));
