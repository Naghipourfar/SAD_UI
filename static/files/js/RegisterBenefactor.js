function sendBenefactorInformation() {
    var person = {
        uesrname: $("#username").val(),
        password1: $("#password1").val(),
        name: $("#name").val(),
        lastname: $("#lastname").val(),
        phoneNumber:$("#phoneNumber").val(),
        homeNumber:$("#homeNumber").val(),
        address:$("#address").val(),
        skills: "For later!",
        activities: $("#activities").val(),
        interests: $("#interests").val()
    }

    $('#target').html('sending..');

    $.ajax({
        url: '/test/PersonSubmit',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $('#target').html(data.msg);
        },
        data: JSON.stringify(person)
    });
}