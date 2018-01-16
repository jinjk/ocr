
// Fix menu does'nt collapse issue
$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a:not(".dropdown-toggle")')) {
        $(this).collapse('hide');
    }
});

$(document).keydown(function (e) {
    let keyCode = e.which;
    if (keyCode == 27) {
        $("#cell_input").hide();
    }
});
