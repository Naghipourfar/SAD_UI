$(function () {
    var user_name = JSON.parse(localStorage.getItem('account')).username;
    $.ajax({
        url: 'http://localhost:8000/projects/benefactor/' + user_name + '/?type=non_financial&status=in_progress',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            alert("success");
            if (data.status === 0) {
                alert("status is 0");
                projects = data.projects;
                for (var project in projects) {
                    project = JSON.parse(project);
                    var row = '<tr>';
                    row += '<td>' + project.location + '</td>';
                    row += '</tr>';

                    row += '<td>' + project.category + '</td>';
                    row += '</tr>';

                    row += '<td>' + project.name + '</td>';
                    row += '</tr>';

                    row += '<td>' + project.username + '</td>';
                    row += '</tr>';

                    row += '</tr>';
                    $('#ben_ongoing_non_financial_table').append(row);
                }
            }
        },
    });

});