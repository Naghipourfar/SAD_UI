$(function () {
    benefactor = JSON.parse(localStorage.getItem("account"));
    $.ajax({
        url: 'http://127.0.0.1:8000/projects/feedbacks/benefactor/' + benefactor.username + '/?type=receive',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                fillFeedbackTable(data.feedbacks);
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

function fillFeedbackTable(feedbacks) {
    for (var feedback in feedbacks) {
        feedback = JSON.parse(feedback);
        var row = '<tr>';
        row += '<td>' + project.name + '</td>';
        row += '<td>' + project.username + '</td>';
        row += '<td>' + project.rate + '</td>';
        row += '<td>' + project.category + '</td>';
        row += '<td>' + project.feedback + '</td>';
        row += '</tr>';
        $('#feedbacks_table').append(row);
    }
}