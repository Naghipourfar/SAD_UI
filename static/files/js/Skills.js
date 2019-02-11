$(document).ready(function () {
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

function loadSkills() {
    for (var i = 0; i < skills.length; i++) {
        var skill = skills[i];
        var row = '<div class="item">' + skill.toString() + '</div>';
        $("#skills_menu").append(row);
    }
}


