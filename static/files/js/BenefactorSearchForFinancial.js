$(function () {
    $("#search").click(function () {
        clearTable();
        search();
    });
});

function search() {

    $.ajax({
        async: true,
        url: 'http://127.0.0.1:8000/search/benefactor/financial/',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                var projects = data.search;
                for (var i = 0; i < projects.length; i++) {
                    var project = projects[i];
                    var row = '<tr>';
                    row += '<td>' + String(i) + '</td>';
                    row += '<td>' + project.name + '</td>';
                    row += '<td>' + project.organization.name + '</td>';
                    row += '<td>' + project.money_needed + '</td>';
                    row += '<td>' + project.money_donated + '</td>';

                    row += '<td>' + '<button class="ui violet button" onclick="redirectToProfilePage()">مشاهده پروفایل موسسه</button>' + '</td>';
                    row += '<td><button class="ui green button" id="' + project.id + '">پرداخت کمک هزینه</button></td>';

                    row += '</tr>';
                    $('#search_results').append(row);
                    $("#" + project.id).click(function () {
                        pay(project);
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

function pay(project) {
    var username = JSON.parse(localStorage.getItem("account")).username;
    var money_donated = prompt("لطفا مبلغ درخواستی خود را وارد کنید");
    while (money_donated > project.money_needed - project.money_donated) {
        money_donated = prompt("لطفا مبلغ درخواستی خود را دوباره وارد کنید");
    }
    var data = {
        amount: money_donated
    };
    $.ajax({
        async: true,
        url: 'http://127.0.0.1:8000/projects/requests/benefactor/pay/' + username + "/" + project.id + "/",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
            if (data.status == 0) {
                alert(data.message);
                window.location.replace("BenefactorDashboard.html");
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
    localStorage.setItem("firstPlace", "BenefactorSearchForNonFinancial.html");
    window.location.replace("BenefactorViewOrgProfile.html");
}

function clearTable() {
    $("#search_results").empty();
}