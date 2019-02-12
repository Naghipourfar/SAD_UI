$(function () {
    var benefactor = JSON.parse(localStorage.getItem("account"));
    $.ajax({
        url: 'http://127.0.0.1:8000/projects/feedbacks/benefactor/' + benefactor.username + '/?type=send',
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
    for (var i = 0; i < feedbacks.length; i++) {
        var feedback = feedbacks[i];
        var row = '<tr>';
        row += '<td>' + feedback.project_name + '</td>';
        row += '<td>' + feedback.username + '</td>';
        row += '<td>' + feedback.rate + '</td>';
        row += '<td>' + feedback.category + "-" + feedback.skill_name + '</td>';
        row += '<td>' + feedback.feedback + '</td>';
        row += '</tr>';
        $('#feedbacks_table').append(row);
    }
}