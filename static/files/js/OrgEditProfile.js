$(document).ready(function () {
    var currentUser = JSON.parse(localStorage.getItem('account'));
    var org = {
        username: currentUser.username,
        password: currentUser.password,
        name: "",
        email: "",
        age: "",
        tel_number: "",
        phone_number: "",
        address: "",
        activities: ""
    };

    $.ajax({
        url: 'http://127.0.0.1:8000/accounts/organization/profile/' + org.username + "/",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                fillOrganization(org, data.data);
                fillProfileFields(org);
            } else {
                for (var key in data.message) {
                    alert(data.message[key]);
                }
            }
        }
    });
    $("#save").click(function () { // TODO it must run after retriving data
        var newOrg = org;
        var dataToSend = {};
        for (var key in org) {
            newOrg[key] = $("#" + key).val()
        }
        for (var key in org) {
            if (newOrg[key] != "" && newOrg[key] != org[key]) {
                dataToSend[key] = newOrg[key];
            }
        }
        $.ajax({
            url: 'http://127.0.0.1:8000/accounts/benefactor/profile/' + org.username + "/",
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(dataToSend),
            success: function (data) {
                alert(data.status);
                if (data.status == 0) {
                    alert("Your profile has been updated successfully.")
                } else {
                    for (var key in data.message) {
                        alert(data.message[key]);
                    }
                }
            }
        });
    });
});

function fillOrganization(org, data) {
    org.name = data.name;
    org.email = data.email;
    org.age = data.age;
    org.tel_number = data.tel_number;
    org.phone_number = data.phone_number;
    org.address = data.address;
    org.activities = data.activities;
    return org;
}

function fillProfileFields(org) {
    for (var key in org) {
        console.log(key);
        console.log(org[key]);
        if (key == "activities"){
            $("#" + key.toString()).val(org[key]);
        } else {
            $("#" + key.toString()).attr("value", org[key]);
        }
    }
}