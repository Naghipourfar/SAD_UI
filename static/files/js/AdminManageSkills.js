$(function () {
    $("#save").click(function () {
        var skill = {
            category: $("#category").val(),
            name: $("#skill_name").val()
        };
        $.ajax({
            async: true,
            url: 'http://127.0.0.1:8000/admin/manage/skills/',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(skill),
            success: function (data) {
                if (data.status == 0) {
                    alert(data.message);
                    window.location.replace("AdminDashboard.html");
                } else {
                    alert("not success");
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
    });
});

var skills = [
    "مهارت-گلدوزی",
    "معلم-فیزیک",
    "پزشکی-پرستاری",
    "هنر-قالیبافی",
    "بیزینس-بازاریابی",
    "هنز-آشپزی",
    "معلم-شیمی",
    "هنر-صنایع دستی",
    "معلم-ریاضی"
];

function loadSkillsForAdmin(){
    for (var i = 0; i < skills.length; i++) {
        var skill = skills[i];
        var row = '<button class="ui icon button"><i class="x icon"></i></button>' + skill + '<br>';
        $("#skills_menu").append(row);
    }
}

