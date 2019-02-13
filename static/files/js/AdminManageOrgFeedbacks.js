$(function () {
    $.ajax({
        url: 'http://127.0.0.1:8000/admin/view/feedback_ben/',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                var feedbacks = data.list;
                for (var i = 0; i < feedbacks.length; i++) {
                    var feedback = feedbacks[i];
                    var row = '<tr>';

                    row += '<td>' + feedback.id + '</td>';
                    row += '<td>' + feedback.rate + '</td>';
                    row += '<td>' + feedback.feedback + '</td>';
                    row += '<td>' + feedback.project.need_.category + '</td>';
                    row += '<td>' + feedback.project.need_.name + '</td>';
                    row += '<td>' + feedback.project.benefactor.username + '</td>';

                    // row += '<td>' + '<button class="ui violet button">ویرایش نظر</button>' + '</td>';

                    row += '<td>' + '<button class="ui red button" id=\"' + feedback.id + '\">حذف نظر</button>' + '</td>';

                    row += '</tr>';
                    $('#feedbacks_about_benefactors').append(row);
                    $("#" + feedback.id).click(function () {
                        removeFeedback(feedback.id);
                    });
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
            // message_div.innerText = msg;
        }

    });

});

function removeFeedback(feedback_id) {
    $.ajax({
        async: true,
        url: 'http://127.0.0.1:8000/admin/manage/feedback/remove/' + feedback_id + "/",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                alert(data.message);
                window.location.replace("AdminDashboard.html");
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
            // message_div.innerText = msg;
        }

    });
}