var lastSelectedSkill = "";
var lastSelectedGender = "";
var skillIDs = [];

$(document).ready(function () {
    var benefactor_username = localStorage.getItem('benefactor_profile_username')
    var benefactor = {
        username: benefactor_username,
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        tel_number: "",
        phone_number: "",
        age: "",
        city: "",
        address: "",
        activities: "",
        desires: "",
        skills:"",
    };

    $.ajax({
        url: 'http://127.0.0.1:8000/accounts/benefactor/public_profile/' + benefactor_username + "/",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                console.log(data.data)
                fillBenefactor(benefactor, data.data);
                fillProfileFields(benefactor);
            } else {
                for (var key in data.message) {
                    alert(data.message[key]);
                }
            }
        }
    });
});

function fillBenefactor(benefactor, data) {
    benefactor.email = data.email;
    benefactor.first_name = data.first_name;
    benefactor.last_name = data.last_name;
    benefactor.gender = data.gender;
    benefactor.tel_number = data.tel_number;
    benefactor.phone_number = data.phone_number;
    benefactor.age = data.age;
    benefactor.city = data.city;
    benefactor.address = data.address;
    benefactor.activities = data.activities;
    benefactor.desires = data.desires;
    for (var i = 0; i < data.skills.length; i++) {
        benefactor.skills[i] = data.skills[i].category + "-" + data.skills[i].name;
    }
}

function fillProfileFields(benefactor) {
    for (var key in benefactor) {
        if (key == "activities" || key == "desires"){
            $("#" + key.toString()).val(benefactor[key]);
        } else if (key == "skills") {
            for (var i = 0; i < benefactor.skills.length; i ++){
                addSkill(benefactor.skills[i]);
            }
        } else if (key == "gender") {
            $("#" + key.toString()).text(benefactor[key]);
        } else {
            $("#" + key.toString()).attr("value", benefactor[key]);
        }
    }
}
