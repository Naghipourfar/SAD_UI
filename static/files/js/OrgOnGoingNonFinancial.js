$(function () {
    var user_name = JSON.parse(localStorage.getItem('account')).username;
    $.ajax({
        url: 'http://127.0.0.1:8000/projects/organization/' + user_name + '/?type=non_financial&status=in_progress',
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
                    row += '<td>' + project.location + '</td>';
                    row += '<td>' + project.category + '</td>';
                    row += '<td>' + project.skill_name + '</td>';
                    row += '<td>' + project.username + '</td>';

                    row += '</tr>';
                    $('#org_ongoing_non_financial_table').append(row)
                }

            }
        },
    });

});