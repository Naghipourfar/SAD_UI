var lastSelectedSkill = "";
var skillIDs = [];

$(document).ready(function () {
    // var currentUser = JSON.parse(localStorage.getItem('account'));
    currentUser = {
        username: "mahak",
        password: "mahak12345"
    };
    var benefactor = {
        username: currentUser.username,
        password: currentUser.password,
        first_name: "",
        last_name: "",
        tel_number: "",
        phone_number: "",
        address: "",
        skills: [],
        activities: "",
        desires: ""
    };

    $.ajax({
        url: 'http://127.0.0.1:8000/benefactor/profile/',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        data: benefactor.username + "/",
        success: function (data) {
            alert(data.status);
            if (data.status == 0) {
                fillBenefactor(data.message);
                fillProfileFields(benefactor);
            } else {
                for (var key in data.message) {
                    alert(data.message[key]);
                }
            }
        }
    });
    $("#save").click(function () { // TODO it must run after retriving data
        var newBenefactor = benefactor;
        var dataToSend = {}
        for (var key in benefactor) {
            newBenefactor[key] = $("#" + key).val()
        }
        for (var key in benefactor) {
            if (newBenefactor[key] != "" && newBenefactor[key] != benefactor[key]) {
                dataToSend[key] = newBenefactor[key];
            }
        }
        $.ajax({
            url: 'http://127.0.0.1:8000/benefactor/profile/' + benefactor.username + "/",
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

    $("#new_skill").click(function () {
        if (lastSelectedSkill != "") {
            addSkill(lastSelectedSkill);
            lastSelectedSkill = "";
            $("#last_selected_skill").text("توانایی‌ها")
        }
    });
    setClickListenersForCurrentSkills();
    saveLastSkillSelected();
});

function fillBenefactor(data) {
    data = JSON.parse(data);
    benefactor.first_name = data.first_name;
    benefactor.last_name = data.last_name;
    benefactor.tel_number = data.tel_number;
    benefactor.phone_number = data.phone_number;
    benefactor.address = data.address;
    benefactor.activities = data.activities;
    benefactor.desires = data.desires;
    for (var i = 0; i < data.skills.length; i++) {
        benefactor.skills[i] = JSON.parse(data.skills[i]);
    }
}

function fillProfileFields(benefactor) {
    for (var key in benefactor) {
        $("#" + key.toString()).attr("value", benefactor[key]);
    }
}

function addSkill(id) {
    if (skillIDs.includes(id)) {
        alert("You have already added this skill!");
    } else {
        newDiv = '<div class="one" id=' + id + '>';
        newDiv += '<button class="ui icon button""><i class="x icon"></i></button> ';
        newDiv += '<label>' + id + '</label><br>';
        newDiv += '</div>';
        $("#skills").append(newDiv);
        setClickListenersForCurrentSkills();
        skillIDs.push(id);
    }

}

function deleteSkill(id) {
    $("#" + id).remove();
    skillIDs.pop(id);
}

function setClickListenersForCurrentSkills() {
    $("#skills").find("div").each(function () {
        var skillID = $(this).attr("id");
        $(this).find("button").each(function () {
            $(this).click(function () {
                deleteSkill(skillID);
            });
        })
    });
}

function saveLastSkillSelected() {
    $("#skills_menu").find("div").each(function () {
        var skillName = $(this).text();
        $(this).click(function () {
            lastSelectedSkill = skillName;
            $("#last_selected_skill").text(lastSelectedSkill);
        });
    });
}

