$(function () {
    var user_name = JSON.parse(localStorage.getItem('account')).username;
    $.ajax({
        url: 'http://localhost:8000/projects/benefactor/' + user_name + '/?type=non_financial&status=in_progress',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                var projects = data.projects;
                for (var i = 0; i < projects.length; i++) {
                    var project = projects[i];
                    var row = '<tr>';
                    row += '<td>' + project.project_name + '</td>';

                    row += '<td>' + project.username + '</td>';

                    row += '<td>' + project.category + "-" + project.skill_name + '</td>';

                    row += '<td>' + project.location + '</td>';
                    row += '</tr>';
                    $('#ben_ongoing_non_financial_table').append(row);
                }
            } else{
                alert(data.error);
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