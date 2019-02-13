var lastSelectedSkill = "";
var lastSelectedGender = "";
var skillIDs = [];

$(document).ready(function () {
    var org_username = localStorage.getItem('org_profile_username')
    var org = {
        username: org_username,
        name: "",
        email: "",
        tel_number: "",
        phone_number: "",
        city: "",
        address: "",
        activities: "",
    };

    $.ajax({
        url: 'http://127.0.0.1:8000/accounts/organization/public_profile/' + org_username + "/",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                console.log(data.data)
                fillOrg(org, data.data);
                fillProfileFields(org);
            } else {
                for (var key in data.message) {
                    alert(data.message[key]);
                }
            }
        }
    });
});

function fillOrg(org, data) {
    org.email = data.email;
    org.name = data.name;
    org.tel_number = data.tel_number;
    org.phone_number = data.phone_number;
    org.city = data.city;
    org.address = data.address;
    org.activities = data.activities;
    return org;
}

function fillProfileFields(org) {
    for (var key in org) {
        if (key == "activities") {
            $("#" + key.toString()).val(org[key]);
        } else {
            $("#" + key.toString()).attr("value", org[key]);
        }
    }
}