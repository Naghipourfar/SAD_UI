$(function () {
    var user_name = "org"; //TODO
    alert("hi")
    $.ajax({
        url: 'http://localhost:8000/projects/organization/'+user_name+'/?type=non_financial&status=not_started', //TODO
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            alert("success");
            if (data.status === 0){
                alert("status is 0");
                projects = data.projects;
                for (var project in projects){
                    var row='<tr>';
                    row += '<td>'+project.location+'</td>';
                    row+='</tr>';

                    row += '<td>'+project.category+'</td>';
                    row+='</tr>';

                    row += '<td>'+project.name+'</td>';
                    row+='</tr>';

                    row += '<td>'+project.username+'</td>';
                    row+='</tr>';

                    row+='</tr>';
                    $('#org_ongoing_non_financial_table').append(row)
                }
            }
        },
        data: JSON.stringify(request)
    });

});