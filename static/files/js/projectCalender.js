split_hours = 2;
start_hour = 6;
finish_hour = 24;
full_work_hours = finish_hour-start_hour;

$(function () {
    makeInitialTable();
});

function saveSchedule() {
    var taken_days = new Array(63);
    var cnt = 0;
    for (var i = 0; i < full_work_hours / split_hours; i++) {
        for (var j = 0; j < 7; j++) {
            if ($("#p_date_" + j + "_" + (start_hour+2*i)).attr("class") == "ui button active") {
                taken_days[cnt] = {
                    day: j,
                    time: (start_hour+2*i)
                };
                cnt += 1;
            }
        }
    }
    localStorage.setItem('times_list', JSON.stringify(taken_days));
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
    }
    saveSchedule()
}

function makeInitialTable(){
    for (var i = 0; i < full_work_hours / split_hours; i++) {
        tmp_row = "<tr>";

        tmp_row += "<td>"+ (start_hour+i*split_hours) +"-"+ (start_hour+(i+1)*split_hours) +"</td>"
        for (var j = 0; j < 7; j++) {
            table_address = "p_date_"+j+"_"+(start_hour+2*i);
            tmp_row += "<td><div class='ui huge button' style='background-color: #9ECAD3' id='"+table_address+"' onclick='onClick(\""+table_address+"\")' >  </div></td>";
        }
        tmp_row += "</tr>";
        $("#project_calender_table").append(tmp_row)
    }
}

function changeWebpage(url_addr) {
    window.location.href = 'http://localhost:63342/SADproject/' + url_addr;
}