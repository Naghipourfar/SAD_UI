$(function () {
    $.ajax({
        url: 'http://127.0.0.1:8000/admin/view/pending_benefactors/',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                fillBenefactorTable(data.list);
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

function fillBenefactorTable(benefactors) {
    for (var i = 0; i < benefactors.length;i++) {
        var benefactor = benefactors[i];
        addBenefactor(benefactor);
    }
}

function addBenefactor(benefactor) {
    var row = '<tr>';
    row += '<td>' + benefactor.username + '</td>';
    row += '<td>' + benefactor.first_name + '</td>';
    row += '<td>' + benefactor.last_name + '</td>';
    row += '<td>' + benefactor.email + '</td>';
    row += '<td>' + benefactor.gender + '</td>';
    row += '<td>' + benefactor.phone_number + '</td>';
    row += '<td>' + benefactor.tel_number + '</td>';
    row += '<td>' + benefactor.address + '</td>';
    row += '<td>' + benefactor.age + '</td>';
    row += '<td>' + benefactor.activities + '</td>';
    var skillsStr = "";
    for (var i = 0; i < benefactor.skills.length; i++) {
        skillsStr += benefactor.skills[i].category + "-" + benefactor.skills[i].name;
    }
    row += '<td>' + skillsStr + '</td>';
    row += '</tr>';
    $('#benefactors').append(row)
}

/*<td><a href="BenefactorFeedbackToOrg.html">
                                <button class="ui violet button">ارسال نظر</button>
                            </a>
                        </td>
*
*
*
* */