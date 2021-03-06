$(function () {
    var user_name = JSON.parse(localStorage.getItem('account')).username;
    $.ajax({
        url: 'http://127.0.0.1:8000/projects/requests/benefactor/' + user_name + '/?type=send',
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

                    if (request.status == "in_progress") {
                        row += '<td>' + '<button class="ui gray disabled button">در حال بررسی</button>'
                            + '</td>';

                    } else if (request.status == "accepted") {
                        row += '<td>' + '<button class="ui green disabled button">پذیرفته شد</button>'
                            + '</td>';

                    } else if (request.status == "rejected") {
                        row += '<td>' + '<button class="ui red button disabled">رد شد</button>'
                            + '</td>';
                    }

                    row += '</tr>';
                    $('#sent_requests').append(row);
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
        }

    });

});