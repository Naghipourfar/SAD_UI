var lastSelectedGender = "";
var lastSelectedSkill = "";
var skillIDs = [];
$(function () {
    $("#new_skill").click(function () {
        if (lastSelectedSkill != "") {
            addSkill(lastSelectedSkill);
            lastSelectedSkill = "";
            $("#last_selected_skill").text("توانایی‌ها")
        }
    });
    $("#search").click(function () {
        clearTable();
        search();
    });
    setClickListenersForCurrentSkills();
    saveLastSelectedGender();
    saveLastSelectedSkill();

});

function search() {
    var searchFilters = {
        gender: lastSelectedGender,
        city: $("#city").val(),
        skills: getSelectedSkills(),
        org_username: $("#org_username").val(),
        project_name: $("#project_name").val()
    };
    $.ajax({
        async: true,
        url: 'http://127.0.0.1:8000/search/benefactor/non_financial/',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(searchFilters),
        success: function (data) {
            if (data.status == 0) {
                var projects = data.search;
                for (var i = 0; i < projects.length; i++) {
                    var project = projects[i];
                    var row = '<tr>';
                    row += '<td>' + String(i) + '</td>';
                    row += '<td>' + project.name + '</td>';
                    row += '<td>' + project.organization.name + '</td>';

                    row += '<td>' + project.need_.category + "-" + project.need_.name + '</td>';

                    row += '<td>' + project.location + '</td>';
                    row += '<td>' + "خیلی زود!" + '</td>';

                    row += '<td>' + project.gender + '</td>';

                    row += '<td>' + '<button class="ui violet button" onclick="redirectToProfilePage()">مشاهده پروفایل موسسه</button>' + '</td>';

                    row += '<td><button class="ui green button" onclick="sendRequest()">ارسال درخواست</button></td>';

                    row += '</tr>';
                    $('#search_results').append(row)
                }
            } else {

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
            alert(msg)
        }

    });
}

function sendRequest() {

}

function redirectToProfilePage() {
    window.location.replace("BenefactorViewOrgProfile.html");
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

function saveLastSelectedGender() {
    $("#gender_menu").find("div").each(function () {
        var gender = $(this).text();
        $(this).click(function () {
            lastSelectedGender = gender;
            $("#gender").text(lastSelectedGender);
        });
    });
}

function deleteSkill(id) {
    $("#" + id).remove();
    skillIDs.pop(id);
}

function saveLastSelectedSkill() {
    $("#skills_menu").find("div").each(function () {
        var skillName = $(this).text();
        $(this).click(function () {
            lastSelectedSkill = skillName;
            $("#last_selected_skill").text(lastSelectedSkill);
        });
    });
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

function clearTable() {
    $("#search_results").empty();
}