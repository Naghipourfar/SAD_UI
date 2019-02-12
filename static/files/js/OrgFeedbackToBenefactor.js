$(function () {
    var projectID = getProjectID();
    $("#save").click(function () {
        var feedback = {
            feeder: JSON.parse(localStorage.getItem("account")).type,
            feedback: $("#feedback").val(),
            rate: getRate(),
            id: projectID

        };
        console.log(feedback);
        sendFeedback(feedback);
    });

});

function getProjectID() {
    return localStorage.getItem('projectID');
}

function getRate() {
    var rate = 0;
    $("#rate").find('i').each(function () {
        if ($(this).attr("class") == "icon active") {
            rate++;
        } else {
        }
    });
    return rate;
}

function sendFeedback(feedback) {

    $.ajax({
        url: 'http://127.0.0.1:8000/projects/feedbacks/send/',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(feedback),
        success: function (data) {
            if (data.status == 0) {
                alert(data.message);
                window.location.replace("OrgDashboard.html");
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

}