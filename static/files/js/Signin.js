$(function () {
    // $("#signin").onclick(function () {
    //     signin();
    // })
});

function signin() {
    var account = {
        username: $("#username").val(),
        password: $("#password").val(),
        type: ""
    };

    $.ajax({
        async: false,
        url: 'http://127.0.0.1:8000/accounts/login/',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                account.type = data.user;
                localStorage.setItem('account', JSON.stringify(account));
                changeWebpage("Homepage.html");
                return true;
            } else {
                alert(data.message);
                for (var key in data.message) {
                    alert(data.message[key]);
                }
                return false;
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
        },
        data: JSON.stringify(account)
    });
}


function changeWebpage(url_addr) {
    window.location.href = 'http://localhost:63342/SAD_UI/' + url_addr;
}