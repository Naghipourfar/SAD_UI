$(function () {
    $.ajax({
        url: 'http://127.0.0.1:8000/admin/view/benefactors/',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                var benefactors = data.list;
                for (var i = 0; i < benefactors.length; i++) {
                    var benefactor = benefactors[i];
                    var row = '<tr>';
                    row += '<td>' + benefactor.username + '</td>';
                    row += '<td>' + benefactor.first_name + '</td>';
                    row += '<td>' + benefactor.last_name + '</td>';
                    row += '<td>' + benefactor.email + '</td>';
                    row += '<td>' + benefactor.phone_number + '</td>';
                    row += '<td>' + '<button class="ui violet button"' + 'id = "' + benefactor.username + '_view" ' + '>مشاهده پروفایل</button>' + '</td>';
                    row += '<td>' + '<button class="ui red button"' + 'id = "' + benefactor.username + '_remove" ' + '>حذف نیکوکار</button>' + '</td>';
                    row += '</tr>';
                    $('#benefactors').append(row);
                    $("#" + benefactor.username + '_remove').click(function () {
                        removeBenefactor(benefactor);
                    });
                    $("#" + benefactor.username + '_view').click(function () {
                        viewBenefactor(benefactor);
                    });

                }
            } else {
                alert(data.message);
            }
        },
        error: function (jqXHR, exception) {
            if (jqXHR.status === 0) {
                msg = 'Not connect. Verify Network. [0]';
            } else if (jqXHR.status === 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status === 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg)
        }

    });

});

function removeBenefactor(benefactor) {
    $.ajax({
        async: true,
        url: 'http://127.0.0.1:8000/admin/manage/users/remove/' + benefactor.username + "/",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                alert(data.message);
                window.location.replace("AdminDashboard.html");
            } else {
                alert(data.message);
            }
        },
        error: function (jqXHR, exception) {
            if (jqXHR.status === 0) {
                msg = 'Not connect. Verify Network. [0]';
            } else if (jqXHR.status === 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status === 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg)
        }

    });
}
