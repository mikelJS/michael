(function() {
    var ROWS = 5,
        uuu = 3;

    // DEFAULT: wygenerowac tabelke ktora bedzie miala x TD i x TR

    /*
        - pobranie informacji od usera: rows, cols
        - generowanie tabelki
            - stworzyc elementy table, thead, tbody, tfoot
                - dodac do tbody znacznik tr
                    - dodac do tr znaczniki td
        - wyswietlanie dla usera
            - zaprezentowanie wyniku w przegladarce www

     */
    function majkeltejbel(e, uuu) {

        function createRow(c) {
            var row = document.createElement('tr');
            for (var i = 0; i < c; i++) {
                row.appendChild(document.createElement('td'));
            }
            return row;
        }
        function createRows(r, c) {
            var array = [];
            for (var i = 0; i< r; i++) {
                array.push(createRow(c));
                //array.push(createRow(c+4));
            }
            return array;
        }
        function createHeader() {
            return document.createElement('thead');
        }
        function createBody(r, c) {
            /** @type {Array} **/
            var rows = createRows(r, c);
            var tbody = document.createElement('tbody');
            for (var i = 0; i < rows.length; i++){
                tbody.appendChild(rows[i]);
            }
            return tbody;
        }
        function createFooter() {
            return document.createElement('tfoot');
        }

        /**
         * @param {Number} rows
         * @param {Number} cols
         * @return {Element}
         */
        function createTable(rows, cols) {
            var header = createHeader();
            var body = createBody(rows, cols);
            var footer = createFooter();
            var table = document.createElement('table');
            table.appendChild(header);
            table.appendChild(body);
            table.appendChild(footer);

            return table;
        }
        function showTable() {
            var table = createTable(e, uuu);
            document.body.appendChild(table);
        }

        showTable();

    }

    window.onload = function() {
        new majkeltejbel(8, 456);
        new majkeltejbel(3, 3);
    }


}());