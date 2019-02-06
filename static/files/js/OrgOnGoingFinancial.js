$(function () {
    var user_name = "ehsan"; //TODO

    $.ajax({
        url: 'http://localhost:8000/projects/benefactor/'+user_name+'/?type=financial&status=not_started', //TODO
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            alert("success");
            if (data.status === 0){
                alert("status is 0");
                projects = data.projects;
                for (var project in projects){
                    var row='<tr>';
                    row += '<td>'+project.name+'</td>';
                    row+='</tr>';

                    row += '<td>'+project.location+'</td>';
                    row+='</tr>';

                    row += '<td>'+project.deadline+'</td>';
                    row+='</tr>';

                    row += '<td>'+project.money_needed+'</td>';
                    row+='</tr>';

                    row += '<td>'+project.money_donated+'</td>';
                    row+='</tr>';
                    $('#org_ongoing_financial_table').append(row)
                }
            }
        },
        data: JSON.stringify(request)
    });

})