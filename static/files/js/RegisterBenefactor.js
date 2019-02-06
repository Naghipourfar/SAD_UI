function sendBenefactorInformation() {
    skills = [];
    i = 0;
    $("#skills").find("button").each(function () {
         skills[i++] = $(this).html();
    });
    alert(skills);
    var person = {
        username: $("#username").val(),
        password1: $("#password1").val(),
        name: $("#name").val(),
        lastname: $("#lastname").val(),
        phoneNumber: $("#phoneNumber").val(),
        homeNumber: $("#homeNumber").val(),
        address: $("#address").val(),
        skills: skills,
        activities: $("#activities").val(),
        interests: $("#interests").val()
    };

    $('#target').html('sending..');
    $.ajax({
        url: '/Benefactor/' + person.username,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $('#target').html(data.msg);
        },
        data: JSON.stringify(person)
    });
    console.log(JSON.stringify(person))
}