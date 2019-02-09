$(function () {
    var user_name = "org"; //TODO
    $.ajax({
        url: 'http://127.0.0.1:8000/projects/organization/' + user_name + '/?type=financial&status=not_started',
        // data: "type=financial" +
        //     "&status=in_progress/",
        type: 'GET',
        dataType: 'json',
        // jsonp: "callback",
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                alert("success");
                projects = data.projects;
                for (var i = 0; i < projects.length;i++) {
                    project = projects[i];
                    var row = '<tr>';
                    row += '<td>' + project.location + '</td>';

                    row += '<td>' + project.name + '</td>';

                    row += '<td>' + project.deadline + '</td>';

                    row += '<td>' + project.money_needed + '</td>';

                    row += '<td>' + project.money_donated + '</td>';
                    row += '</tr>';
                    $('#org_ongoing_financial_table').append(row)
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