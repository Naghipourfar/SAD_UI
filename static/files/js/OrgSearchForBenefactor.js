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
        benefactor_username: $("#benefactor_username").val(),
    };
    $.ajax({
        async: true,
        url: 'http://127.0.0.1:8000/search/organization/',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(searchFilters),
        success: function (data) {
            if (data.status == 0) {
                var benefactors = data.search;

                for (var i = 0; i < benefactors.length; i++) {
                    var benefactor = benefactors[i];
                    var row = '<tr>';
                    row += '<td>' + String(i) + '</td>';
                    row += '<td>' + benefactor.username + '</td>';
                    row += '<td>' + benefactor.gender + '</td>';
                    row += '<td>' + benefactor.location + '</td>';
                    row += '<td>' + "خیلی زود!" + '</td>';
                    row += '<td>' + '<button class="ui violet button" onclick="redirectToProfilePage()">مشاهده پروفایل نیکوکار</button>' + '</td>';
                    row += '<td><button class="ui green button" id="' + benefactor.username + '">ارسال درخواست</button></td>';
                    row += '</tr>';
                    $('#search_results').append(row);
                    $("#" + benefactor.username).click(function () {
                        sendRequest(benefactor.username);
                    });
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

function sendRequest(benefactor_username) {
    var username = JSON.parse(localStorage.getItem("account")).username;
    var project_id = prompt("لطفا نشاسه پروژه خود را وارد کنید.");
    var request_desc = prompt("لطفا متن درخواست را وارد کنید.");

    var data = {
        request_desc: request_desc
    };
    $.ajax({
        async: true,
        url: 'http://127.0.0.1:8000/projects/requests/organization/' + benefactor_username + "/" + project_id + "/",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
            if (data.status == 0) {
                alert(data.message);
                window.location.replace("OrgDashboard.html");
            } else {
                alert("Not success!")
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

function redirectToProfilePage() {
    localStorage.setItem("firstPlace", "OrgSearchForBenefactor.html");
    window.location.replace("OrgViewBenefactorProfile.html");
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