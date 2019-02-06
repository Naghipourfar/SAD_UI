function sendBenefactorInformation() {
    var request = {
        uesrname: "For later", //TODO
        request_name: "non financial ongoing projects",
        is_done: "False"
    };

    $('#target').html('refreshing..');

    $.ajax({
        url: '/test/PersonSubmit', //TODO
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $('').html(data.msg);
        },
        data: JSON.stringify(request)
    });
}