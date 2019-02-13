$(function () {
    var user_name = JSON.parse(localStorage.getItem("account")).username;
    $.ajax({
        url: 'http://127.0.0.1:8000/projects/requests/organization/' + user_name + '/?type=receive',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                var requests = data.requests;
                for (var i = 0; i < requests.length; i++) {
                    var request = requests[i];
                    var row = '<tr>';
                    row += '<td>' + request.request_desc + '</td>';

                    row += '<td>' + request.answer_desc + '</td>';

                    row += '<td>' + request.category + '</td>';

                    row += '<td>' + request.name + '</td>';

                    row += '<td>' + request.location + '</td>';

                    row += '<td>' + request.username + '</td>';

                    row += '<td>' + '<button class="ui green button" id="' + request.username + '_accept' + '">قبول درخواست</button>'
                        + '</td>';

                    row += '<td>' + '<button class="ui red button" id="' + request.username + '_reject' + '">رد درخواست</button>'
                        + '</td>';

                    row += '</tr>';
                    $('#org_incoming_requests').append(row)
                    $('#' + request.username + '_accept').click(function () {
                        acceptRequest(request.username, request.project_id);
                    });
                    $('#' + request.username + '_reject').click(function () {
                        rejectRequest(request.username, request.project_id);
                    });
                }
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
            // message_div.innerText = msg;
        }

    });

});

function acceptRequest(username, project_id) {
    $.ajax({
        url: 'http://127.0.0.1:8000/projects/requests/accept/' + username + '/' + project_id + '/',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                alert(data.message);
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

function rejectRequest(username, project_id) {
    $.ajax({
        url: 'http://127.0.0.1:8000/projects/requests/reject/' + username + '/' + project_id + '/',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                alert(data.message);
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