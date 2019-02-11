$(function () {
    $("#save").click(function () {
        benefactor = JSON.parse(localStorage.getItem("account"));
        benefactorPassword = {
            old_password: $("#old_password").val(),
            new_password1: $("#new_password1").val(),
            new_password2: $("#new_password2").val()
        };
        console.log(benefactorPassword);

        $.ajax({
            url: "http://localhost:8000/accounts/change_password/" + benefactor.username + "/",
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(benefactorPassword),
            success: function (data) {
                if (data.status == 0) {
                    alert("The password has been changed Successfully.");
                    window.location.replace("BenefactorDashboard.html")
                } else {
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
                alert(msg)
                // message_div.innerText = msg;
            }
        })
    });
});