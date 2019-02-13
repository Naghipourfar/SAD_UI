$(document).ready(function () {
});

function loadHeader(type){
    if (type == "Benefactor") {
        var row = '<a class="header item" href="BenefactorDashboard.html">';
        row += 'مدیریت نیکوکار';
        row += '</a>';
        $("#header").append(row)
    } else if (type == "Admin") {
        var row = '<a class="header item" href="AdminDashboard.html">';
        row += 'مدیریت سایت';
        row += '</a>';
        $("#header").append(row)
    } else {
        var row = '<a class="header item" href="OrgDashboard.html">';
        row += 'مدیریت موسسه';
        row += '</a>';
        $("#header").append(row)
    }
    row = '<a class="header right item" onclick="signout()">خروج</a>';
    $("#header").append(row);
}

function signout() {
    localStorage.clear();
    window.location.replace("Homepage.html");
}