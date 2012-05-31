(function () {
    "use strict";

    var Ssak = function () {
            this.name = "ssak";
            this.get_name = function () {
                return this.name;
            };
        },
        Kot = function () {
            this.name = "kot";
        },

        msg = "a tutaj juz istnieje",
        err_msg = "tutaj jeszcze nie istnieje metoda get_name, , jest rzucany wyjatek ReferenceError, ktorego obsluguje \"try ... catch\"",

        s = new Ssak(),
        k = new Kot();

    try {
        console.info(k.get_name());
        console.warn("1)", msg);
    } catch (e) {
        console.warn("1)", err_msg);
    }

    // dodajemy do prototypu obiektu Kot
    // dlatego wszelkie nowe obiekty
    // przyklad:
    //     var k1 = new Kot(),
    //         k2 = new Kot();
    // również będą miały funkcję "get_name"
    Kot.prototype.get_name = s.get_name;

    try {
        console.info(k.get_name());
        console.warn("2)", msg);
    } catch (e) {
        console.warn("2)", err_msg);
    }

}());