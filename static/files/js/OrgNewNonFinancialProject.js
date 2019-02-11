var lastSelectedSkill = "";
var lastSelecterdGender = "";

$(document).ready(function () {
    saveLastSelectedGender();
    saveLastSelectedSkill();
});

function submitNewNonFinancialProject() {
    var username = JSON.parse(localStorage.getItem("account")).username;
    var neededSkill = {
        category: lastSelectedSkill.split("-")[0],
        name: lastSelectedSkill.split("-")[1]
    };
    var project = {
        name: $("#name").val(),
        need: JSON.stringify(neededSkill),
        age: $("#age").val(),
        gender: lastSelecterdGender,
        location: $("#location").val()
    };

    $.ajax({
        url: 'http://127.0.0.1:8000/projects/organization/add_non_financial/' + username + "/",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(project),
        success: function (data) {
            if (data.status == 0) {
                alert("Project has been created Successfully.")
                window.location.replace("OrgDashboard.html");
            } else if (data.status == -1) {
                for (var key in data.message) {
                    alert(key + ": " + data.message[key]);
                }
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
            alert(msg);
        }
    });
}

function saveLastSelectedGender() {
    $("#gender_menu").find("div").each(function () {
        var gender = $(this).text();
        $(this).click(function () {
            lastSelecterdGender = gender;
            $("#gender").text(lastSelecterdGender);
        });
    });
}


function saveLastSelectedSkill() {
    $("#skills_menu").find("div").each(function () {
        var skillName = $(this).text();
        $(this).click(function () {
            lastSelectedSkill = skillName;
            $("#selected_skill").text(lastSelectedSkill);
        });
    });
}