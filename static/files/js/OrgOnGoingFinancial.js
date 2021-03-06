$(function () {
    var user_name = JSON.parse(localStorage.getItem("account")).username;

    $.ajax({
        url: 'http://127.0.0.1:8000/projects/organization/' + user_name + '/?type=financial&status=in_progress',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                var projects = data.projects;
                for (var i = 0; i < projects.length;i++) {
                    var project = projects[i];
                    var row = '<tr>';
                    row += '<td>' + project.name + '</td>';

                    row += '<td>' + project.deadline + '</td>';

                    row += '<td>' + project.money_needed + '</td>';
                    if (project.money_donated == null) {
                        project.money_donated = "0";
                    }
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
        }

    });

});