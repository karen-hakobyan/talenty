(function ($) {
    "use strict";
    let mainApp = {
        main_fun: function () {
            $(window).bind("load resize", function () {
                if ($(this).width() < 768) {
                    $('div.sidebar-collapse').addClass('collapse')
                } else {
                    $('div.sidebar-collapse').removeClass('collapse')
                }
            });
        },
        initialization: function () {
            mainApp.main_fun();
        }
    }
    $(document).ready(function () {
        mainApp.main_fun();
    });
}(jQuery));

// List
let types_list = []
updateTypeList()

function updateTypeList() {
    types_list = JSON.parse(httpGet("http://localhost:7800/type_values/get_all"))
    if (!types_list) {
        types_list = []
    }
    return types_list
}