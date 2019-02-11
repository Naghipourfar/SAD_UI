$(document).ready(function () {

});
function submitNewFinancialProject() {
    var username = JSON.parse(localStorage.getItem("account")).username;
    var project = {
        name: $("#name").val(),
        money_needed: $("#money_needed").val(),
        deadline: $("#deadline").val()
    };

    $.ajax({
        url: 'http://127.0.0.1:8000/projects/organization/add_financial/' + username + "/",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(project),
        success: function (data) {
            if (data.status == 0) {
                alert("Project has been created Successfully.")
                window.location.replace("OrgDashboard.html");
            } else if (data.status == -1) {
                for (var key in data.message) {
                    alert(key + ": " + data.message[key]);
                }
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
