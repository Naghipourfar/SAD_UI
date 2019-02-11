var lastSelectedSkill = "";
var skillIDs = [];

$(document).ready(function () {
    var currentUser = JSON.parse(localStorage.getItem('account'));
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
        url: 'http://127.0.0.1:8000/accounts/benefactor/profile/' + benefactor.username + "/",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                fillBenefactor(benefactor, data.data);
                fillProfileFields(benefactor);
            } else {
                for (var key in data.message) {
                    alert(data.message[key]);
                }
            }
        }
    });
    $("#save").click(function () {
        var newBenefactor = {
            password: $("#password").val(),
            age: $("#age").val(),
            phone_number: $("#phone_number").val(),
            tel_number: $("#tel_number").val(),
            address: $("#address").val(),
            skills: JSON.stringify(getSelectedSkills()),
            activities: $("#activities").val(),
            desires: $("#desires").val()
        };
        $.ajax({
            url: 'http://127.0.0.1:8000/accounts/benefactor/profile/' + benefactor.username + "/",
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(newBenefactor),
            success: function (data) {
                if (data.status == 0) {
                    alert("Your profile has been updated successfully.");
                    window.location.replace("BenefactorDashboard.html")
                } else {
                    for (var key in data.message) {
                        alert(key + ": " + data.message[key]);
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

function getSelectedSkills() {
    var skills = [];
    $("#skills").find("div").each(function () {
        skill = $(this).attr("id");
        var category = skill.split("-")[0];
        var name = skill.split("-")[1];
        skill = {
            category: category,
            name: name
        };
        skills.push(skill);
    });
    return skills;
}

function fillBenefactor(benefactor, data) {
    benefactor.first_name = data.first_name;
    benefactor.last_name = data.last_name;
    benefactor.age = data.age;
    benefactor.tel_number = data.tel_number;
    benefactor.phone_number = data.phone_number;
    benefactor.address = data.address;
    benefactor.activities = data.activities;
    benefactor.desires = data.desires;
    for (var i = 0; i < data.skills.length; i++) {
        benefactor.skills[i] = data.skills[i].category + "-" + data.skills[i].name;
    }
    return benefactor;
}

function fillProfileFields(benefactor) {
    for (var key in benefactor) {
        if (key == "activities" || key == "desires"){
            $("#" + key.toString()).val(benefactor[key]);
        } else if (key == "skills") {
            for (var i = 0; i < benefactor.skills.length; i ++){
                addSkill(benefactor.skills[i]);
            }
        } else {
            $("#" + key.toString()).attr("value", benefactor[key]);
        }
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

