$(function () {
    alert("salam5");
    var user_name = "ehsan"; //TODO
    $.ajax({
        url: 'http://127.0.0.1:8000/projects/benefactor/' + user_name + '/?type=financial&status=in_progress/',
        // data: "type=financial" +
        //     "&status=in_progress/",
        type: 'GET',
        dataType: 'json',
        // jsonp: "callback",
        contentType: 'application/json',
        success: function (data) {
            alert("success");
            if (data.status === 0) {
                alert("status is 0");
                projects = data.projects;
                for (var project in projects) {
                    var row = '<tr>';
                    row += '<td>' + project.name + '</td>';
                    row += '</tr>';

                    row += '<td>' + project.location + '</td>';
                    row += '</tr>';

                    row += '<td>' + project.deadline + '</td>';
                    row += '</tr>';

                    row += '<td>' + project.money_needed + '</td>';
                    row += '</tr>';

                    row += '<td>' + project.money_donated + '</td>';
                    row += '</tr>';
                    $('#org_ongoing_financial_table').append(row)
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

})