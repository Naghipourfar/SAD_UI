$(function () {
    var localData = JSON.parse(localStorage.getItem("account"));
    var username = localData.username;

    $.ajax({
        url: 'http://127.0.0.1:8000/projects/organization/' + username + '/?type=non_financial&status=done',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                fillNonFinancialProjectTable(data.projects);
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

function fillNonFinancialProjectTable(projects) {
    for (var i = 0; i < projects.length;i++) {
        var project = projects[i];
        console.log(project);
        addNonFinancialProject(project);
    }
}

function addNonFinancialProject(project) {
    var row = '<tr>';
    row += '<td>' + project.project_name + '</td>';
    row += '<td>' + project.location + '</td>';
    row += '<td>' + project.category + '</td>';
    row += '<td>' + project.skill_name + '</td>';
    row += '<td>' + project.username + '</td>';
    row += '<td><a>';
    row += '<button class="ui violet button" id=\"' + project.id + '\"> ' + 'ارسال نظر' + ' </button>';
    row += '</a>';
    row += '</td>';
    row += '</tr>';
    $('#non_financial_projects_table').append(row);
    $("#" + project.id).click(function () {
        sendFeedbackToOrg(project.id);
    });
}

function sendFeedbackToOrg(id) {
    localStorage.setItem('projectID', id);
    window.location.replace("OrgFeedbackToBenefactor.html");
}