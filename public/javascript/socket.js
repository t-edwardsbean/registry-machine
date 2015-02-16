$(function () {
    var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket
    var chatSocket = new WS("ws://localhost:9000/socket");
    var receiveEvent = function (event) {
        console.log(event.data);
        var data = JSON.parse(event.data);
        if (data.type === "log") {
            $("#logSection").append(data.value + "<br>")
        } else if (data.type === "email") {
            var num = parseInt($("#successNum").text());
            num = num + 1;
            $("#successNum").text(num);
            $("#successEmail").append("<tr><td>" + data.value.email + "</td><td>" + data.value.pwd + "</td></tr>");
        } else if (data.type === "emailException") {
            var num = parseInt($("#emailException").text());
            num = num + 1;
            $("#userExist").text(num);
        } else if (data.type === "networkError") {
            var num = parseInt($("#networkError").text());
            num = num + 1;
            $("#networkError").text(num);
        }
    };
    chatSocket.onmessage = receiveEvent
})