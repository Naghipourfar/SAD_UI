$(function () {
    var request = {
        request_name: "non financial ongoing projects",
        uesrname: "For later", //TODO
    };

    $('#target').html('refreshing..');

    $.ajax({
        url: 'http://127.0.0.1:8000/projects/benefactor/ehsan/?type=financial&status=not_started', //TODO
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.is_valid){

            }
        },
        data: JSON.stringify(request)
    });
}