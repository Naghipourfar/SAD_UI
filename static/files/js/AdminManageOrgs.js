$(function () {
    $.ajax({
        url: 'http://127.0.0.1:8000/admin/view/organizations/',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                var organizations = data.list;
                for (var i = 0; i < organizations.length; i++) {
                    var organization = organizations[i];
                    var row = '<tr>';
                    row += '<td>' + organization.username + '</td>';
                    row += '<td>' + organization.name + '</td>';
                    row += '<td>' + organization.email + '</td>';
                    row += '<td>' + organization.phone_number + '</td>';
                    row += '<td>' + organization.tel_number + '</td>';
                    row += '<td>' + '<button class="ui violet button"' + 'id = "' + organization.username + '_view" ' + '>مشاهده پروفایل</button>' + '</td>';
                    row += '<td>' + '<button class="ui red button"' + 'id = "' + organization.username + '_remove" ' + '>حذف موسسه</button>' + '</td>';
                    row += '</tr>';
                    $('#organizations').append(row);
                    $("#" + organization.username + '_remove').click(function () {
                        removeOrg(organization);
                    });
                    $("#" + organization.username + '_view').click(function () {
                        viewBenefactor(organization);
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

function removeOrg(organization) {
    $.ajax({
        async: true,
        url: 'http://127.0.0.1:8000/admin/manage/users/remove/' + organization.username + "/",
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
