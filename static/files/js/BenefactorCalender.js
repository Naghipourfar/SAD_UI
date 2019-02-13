split_hours = 2;
start_hour = 6;
finish_hour = 24;
full_work_hours = finish_hour-start_hour;

$(function () {
    makeInitialTable();
});

function sendSchedule() {
    var free_days = new Array(63);
    var i = 0;
    for (var i = 0; i < full_work_hours / split_hours; i++) {
        for (var j = 0; j < 7; j++) {
            if ($("#date_" + j + "_" + (start_hour+2*i)).attr("class") == "ui button") {
                free_days[i] = {
                    day: j,
                    time: (start_hour+2*i)
                };
                i += 1;
            }
        }
    }
    sendScheduleAjax(free_days,i);
}

function sendScheduleAjax(free_days, count) {
    var schedule = {
        schedule_times: free_days
    };

    var localData = JSON.parse(localStorage.getItem("account"));
    var username = localData.username;

    $.ajax({
        async: false,
        url: 'http://127.0.0.1:8000/projects/benefactor/add_schedule/'+username+"/",
        type: 'POST',

        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.status == 0) {
                alert(data.message);
            } else {
                alert(data.message);
                // for (var key in data.message) {
                //     alert(data.message[key]);
                // }
                // return false;
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
        },
        data: JSON.stringify(schedule)
    });
}

function onClick(address) {
    button = $("#"+address);
    if (button.attr("class") == "ui huge button") {
        button.css("background-color", "#5a30b5");
        button.attr("class", "ui button active");
        button.html("");
    }
    else if (button.attr("class") == "ui button active") {
        button.css("background-color", "#9ECAD3");
        button.attr("class", "ui huge button");
        button.html("آزاد");
    }
    sendSchedule()
}

function makeInitialTable(){
    for (var i = 0; i < full_work_hours / split_hours; i++) {
        tmp_row = "<tr>";

        tmp_row += "<td id='interval_"+i+"'>"+ (start_hour+i*split_hours) +"-"+ (start_hour+(i+1)*split_hours) +"</td>"
        for (var j = 0; j < 7; j++) {
            table_address = "date_"+j+"_"+(start_hour+2*i);
            tmp_row += "<td><div class='ui button active' style='background-color: #5a30b5' id='"+table_address+"' onclick='onClick(\""+table_address+"\")'></div></td>";
        }
        tmp_row += "</tr>";
        $("#calender_table").append(tmp_row)
    }
}