$(document).ready(function () {

});

function signin() {
    alert("salam");
    var account = {
        username: $("#username").val(),
        password: $("#password").val()
    };

    $.ajax({
        url: 'http://127.0.0.1:8000/accounts/login/',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(account),
        success: function (data) {
            if (data.status == 0) {
                var account = JSON.stringify(account);
                localStorage.setItem('account', account);
                window.location.replace("Homepage.html");
            } else if (data.status == -1) {
                for (var key in data.message) {
                    alert(data.message[key]);
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

