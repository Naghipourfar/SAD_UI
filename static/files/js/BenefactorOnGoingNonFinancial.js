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
        data: JSON.stringify(request),
        success: function (data) {


        }
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {

        }
    };
    xhttp.open("GET", "ajax_info.txt", true);
    xhttp.send();
}