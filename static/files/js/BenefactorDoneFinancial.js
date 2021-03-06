$(function () {
    var localData = JSON.parse(localStorage.getItem("account"));
    var username = localData.username;

    $.ajax({
        url: 'http://127.0.0.1:8000/projects/benefactor/' + username + '/?type=financial&status=done',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                fillFinancialProjectTable(data.projects);
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

function fillFinancialProjectTable(projects) {
    for (var i = 0; i < projects.length;i++) {
        var project = projects[i];
        addFinancialProject(project);
    }
}

function addFinancialProject(project) {
    var row = '<tr>';
    row += '<td>' + project.name + '</td>';
    row += '<td>' + project.username + '</td>';
    row += '<td>' + project.money_needed + '</td>';
    row += '<td>' + project.money_donated + '</td>';
    row += '<td>' + project.deadline + '</td>';
    row += '</tr>';
    $('#financial_projects_table').append(row)
}

/*<td><a href="BenefactorFeedbackToOrg.html">
                                <button class="ui violet button">ارسال نظر</button>
                            </a>
                        </td>
*
*
*
* */