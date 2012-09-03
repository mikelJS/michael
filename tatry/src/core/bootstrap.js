$(function () {

    console.log('[info] Start aplikacji: tatry: ', tatry);
    tatry.init();

    $('#filter-submit').on('click', function () {
        var val = $('#filter-where-input').val();
        tatry.filter.column(1, val);
    });

    $('#filter-reset-submit').on('click', function () {
        tatry.filter.reset();
        $('#filter-where-input').val('');
        $('select').val('wybierz...');
    });

    $('select').on('change', function () {
        var val = $(this).val();
        tatry.filter.column($(this).index(), val);
    });

});
