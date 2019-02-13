var lastSelectedSkill = "";
var lastSelectedGender = "";
var skillIDs = ["معلم-فیزیک"];
$(function () {
    $("#new_skill").click(function () {
        if (lastSelectedSkill != "") {
            addSkill(lastSelectedSkill);
            lastSelectedSkill = "";
            $("#last_selected_skill").text("توانایی‌ها")
        }
    });

    setClickListenersForCurrentSkills();
    saveLastSkillSelected();
    saveLastSelectedGender();
});

function sendBenefactorInformation() {
    var skills = getSelectedSkills();
    var person = {
        first_name: $("#first_name").val(),
        last_name: $("#last_name").val(),
        username: $("#username").val(),
        email: $("#email").val(),
        city: $("#city").val(),
        gender: $("#gender").val(),
        password1: $("#password1").val(),
        password2: $("#password2").val(),
        age: $("#age").val(),
        tel_number: $("#tel_number").val(),
        phone_number: $("#phone_number").val(),
        address: $("#address").val(),
        skills: JSON.stringify(skills),
        activities: $("#activities").val(),
        desires: $("#desires").val(),
    };

    $.ajax({
        async: true,
        url: 'http://127.0.0.1:8000/accounts/benefactor/signup/',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(person),
        success: function (data) {
            if (data.status == 0) {
                window.location.replace("ThankYouForRegistration-Admin.html");
            } else if (data.status == -1) {
                for (var key in data.message) {
                    alert(key + ": " + data.message[key]);
                }
            }
        }
    });

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


function saveLastSelectedGender() {
    $("#gender_menu").find("div").each(function () {
        var gender = $(this).text();
        $(this).click(function () {
            lastSelectedGender = gender;
            $("#gender").text(lastSelectedGender);
        });
    });
}

