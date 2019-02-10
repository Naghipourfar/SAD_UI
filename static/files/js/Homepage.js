$(function () {
    if (hasSignedIn() == true) {
        var account = JSON.parse(localStorage.getItem("account"));
        $("#header_tabs").find("a").each(function () {
            if ($(this).attr("href") == "Signin.html" || $(this).attr("href") == "Signup.html") {
                $(this).empty()
            }
        });
        if (account.type == "benefactor"){
            newTag = '<a class="right item" href="BenefactorDashboard.html">' + 'داشبورد' + '</a>'
        } else {
            newTag = '<a class="right item" href="OrgDashboard.html">' + 'داشبورد' + '</a>'
        }
        $("#header_tabs").append(newTag);
    }
});

function hasSignedIn() {
    if (localStorage.getItem("account") != null) {
        return true;
    } else {
        return false;
    }
}