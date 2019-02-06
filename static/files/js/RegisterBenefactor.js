function sendBenefactorInformation() {
    skills = [];
    i = 0;
    $("#skills").find("button").each(function () {
         skills[i++] = $(this).html();
    });

    var person = {
        username: $("#username").val(),
        password1: $("#password1").val(),
        name: $("#name").val(),
        lastname: $("#lastname").val(),
        phoneNumber: $("#phone_number").val(),
        homeNumber: $("#home_number").val(),
        address: $("#address").val(),
        skills: skills,
        activities: $("#activities").val(),
        interests: $("#interests").val()
    };

    $.ajax({
        url: '/benefactor/' + person.username,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status === 0){

            }
        },
        data: JSON.stringify(person)
    });
    console.log(JSON.stringify(person))
}