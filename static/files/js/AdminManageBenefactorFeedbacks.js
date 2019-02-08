$(function () {
    alert("hi");
    var user_name = "ehsan"; //TODO
    $.ajax({
        url: 'http://127.0.0.1:8000/projects/feedbacks/benefactor/' + user_name + '/?type=receive',
        // data: "type=financial" +
        //     "&status=in_progress/",
        type: 'GET',
        dataType: 'json',
        // jsonp: "callback",
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                alert("success");
                feedbacks = data.feedbacks;
                for (var i = 0; i < feedbacks.length;i++) {
                    feedback = feedbacks[i];
                    var row = '<tr>';
                    row += '<td>' + String(i) + '</td>';
                    row += '<td>' + feedback.rate + '/5' + '</td>';

                    row += '<td>' + feedback.feedback + '</td>';

                    row += '<td>' + feedback.category + '</td>';

                    row += '<td>' + feedback.name + '</td>';

                    row += '<td>' + feedback.username+ '</td>';

                    row += '<td>' + '<button class="ui violet button">مشاهده پروفایل موسسه</button>' + '</td>'; //TODO

                    row += '</tr>';
                    $('#feedbacks_about_benefactors').append(row)
                }
            }
        },
        error: function (jqXHR, exception) {
            alert("Goh!");
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