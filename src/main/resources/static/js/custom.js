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
console.log("TYPES AND LISTS: " + types_list)

let job_announcements = []
updateJobAnnouncements()
console.log("JOB ANNOUNCEMENTS: " + job_announcements)

function updateTypeList() {
    types_list = JSON.parse(httpGet(BACKEND_URL + "/type_values/get_all"))
    if (!types_list) {
        types_list = []
    }
    return types_list
}

function updateJobAnnouncements() {
    job_announcements = JSON.parse(httpGet(BACKEND_URL + "/job_announcements/all_pendings"))
    if (!job_announcements) {
        job_announcements = []
    }
    return job_announcements
}