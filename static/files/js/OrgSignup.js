function sendOrgInformation() {

    var organization = {
        name: $("#name").val(),
        username: $("#username").val(),
        password1: $("#password1").val(),
        password2: $("#password2").val(),
        email: $("#email").val(),
        age: $("#age").val(),
        tel_number: $("#tel_number").val(),
        phone_number: $("#phone_number").val(),
        address: $("#address").val(),
        activities: $("#activities").val(),
    };


    $.ajax({
        url: 'http://127.0.0.1:8000/accounts/signup-org/',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(organization),
        success: function (data) {
            if (data.status == 0) {
                window.location.replace("ThankYouForRegistration.html");
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
