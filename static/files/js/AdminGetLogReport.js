$(function () {
    $.ajax({
        url: 'http://127.0.0.1:8000/admin/view/logs/',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                var logs = data.logs;
                for (var i = 0; i < logs.length; i++) {
                    var log = logs[i];
                    var row = '<tr>';
                    row += '<td>' + log.time + '</td>';
                    row += '<td>' + log.message + '</td>';
                    row += '</tr>';
                    $('#logs').append(row);
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