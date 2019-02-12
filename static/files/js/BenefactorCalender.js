split_hours = 2;
start_hour = 6;
finish_hour = 24;
full_work_hours = finish_hour-start_hour;

$(function () {
    makeInitialTable();
    var localData = JSON.parse(localStorage.getItem("account"));
    var username = localData.username;

    $.ajax({
        url: 'http://127.0.0.1:8000/projects/benefactor/' + username + '/?type=financial&status=done',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                // fillFinancialProjectTable(data.projects);
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

function makeInitialTable(){
    for (var i = 0; i < full_work_hours / split_hours; i++) {
        tmp_row = "<tr>";

        tmp_row += "<td id='interval_"+i+"'>"+ (start_hour+i*split_hours) +"-"+ (start_hour+(i+1)*split_hours) +"</td>"
        for (var j = 0; j < 7; j++) {
            table_address = "date_"+j+"_"+i
            tmp_row += "<td><div class='ui button active' id='"+table_address+"'></div></td>";
        }
        tmp_row += "</tr>";
        $("#calender_table").append(tmp_row)
    }

}