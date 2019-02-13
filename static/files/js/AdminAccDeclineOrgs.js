$(function () {
    $.ajax({
        url: 'http://127.0.0.1:8000/admin/view/pending_organizations/',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                fillOrgTable(data.list);
            } else {
                alert("not success");
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
            alert(msg);
        }

    });
});

function fillOrgTable(orgs) {
    for (var i = 0; i < orgs.length; i++) {
        var org = orgs[i];
        addOrg(org);
    }
}

function addOrg(org) {
    var row = '<tr>';
    row += '<td>' + org.username + '</td>';
    row += '<td>' + org.name + '</td>';
    row += '<td>' + org.email + '</td>';
    row += '<td>' + org.phone_number + '</td>';
    row += '<td>' + org.tel_number + '</td>';
    row += '<td>' + org.address + '</td>';
    row += '<td>' + org.age + '</td>';
    row += '<td><button class="ui red button" id="deny">رد کاربر</button></td>';
    row += '<td><button class="ui green button" id="verify">تایید کاربر</button></td>';
    row += '</tr>';
    $('#orgs').append(row);
    $("#verify").click(function () {
        verifyUser(org);
    });
    $("#deny").click(function () {
        denyUser(org);
    });
}

function denyUser(org) {
    $.ajax({
        async: true,
        url: 'http://127.0.0.1:8000/admin/manage/users/remove/' + org.username + "/",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                alert(data.message);
                window.location.replace("AdminDashboard.html");
            } else {
                alert("not success");
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
            alert(msg);
        }

    });
}

function verifyUser(org) {
    $.ajax({
        async: true,
        url: 'http://127.0.0.1:8000/admin/manage/users/verify/' + org.username + "/",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                alert(data.message);
                window.location.replace("AdminDashboard.html");
            } else {
                alert("not success");
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
            alert(msg);
        }

    });
}