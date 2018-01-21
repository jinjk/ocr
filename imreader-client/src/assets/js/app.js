
// Fix menu does'nt collapse issue
$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a:not(".dropdown-toggle")')) {
        $(this).collapse('hide');
    }
});

$(document).click(function (e) {
    if ($("#contextMenu").is(":visible")) {
        $("#contextMenu").hide();
    }
});

$(document).keydown(function (e) {
    let keyCode = e.which;
    if (keyCode == 27) {
        $("#cell_input").hide();
    }
    return true;
});
let $window = $(window);
let posStat = { greater: false};
$window.scroll(function (e) {
    let top = $window.scrollTop();
    let imageContainer = $("#imageContainer");
    let fieldsTable = $("#fieldsTable");


    if (imageContainer.length > 0) {
        let pos = imageContainer.offset();
        let height = imageContainer.height();
        console.log(pos);
        let threshold = pos.top + height - 100;
        if (top > threshold && !posStat.greater) {
            fieldsTable.css({
                position: 'fixed',
                top: 100
            });
        }
        if (top <= threshold && posStat.greater) {
            fieldsTable.css({
                position: 'relative',
                top: 0
            });
        }

        if (top > threshold) {
            posStat.greater = true;
        }
        else {
            posStat.greater = false;
        }
    }
});
