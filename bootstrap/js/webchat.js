var wsUri ="ws://180.76.151.102:8181";
$(document).ready(function(){
    initWebSocket();
    //jsonWebChatApi.funName = "sendMessage";
    //jsonObjSendMessage.target = "zhoushuai";
    //jsonWebChatApi.param = jsonObjSendMessage;
    //alert("target =" + JSON.stringify(jsonWebChatApi));

    $("#tab_menus li a").click(function () {
        $("#tab_menus li").removeClass('active');
        $(this).parent().addClass('active');
        if($(this).text() == "微信") {
            //window.location.href="index.html";
            $("#weixin_view").removeClass('hide');
            $("#nearby_view").addClass('hide');
        } else if($(this).text()== "附近的人") {
            $("#weixin_view").addClass('hide');
            $("#nearby_view").removeClass('hide');
        } else if($(this).text() == "切换设备") {
            websocket.send("web-getdevice");
        }
    });

    $("#send-msg").click(function(){
        //alert($("#text-send").val());
        //var msg = "wxcmd:sendmsg:"+$("#user_name").text()+":"+$("#text-send").val();
        jsonWebChatApi.funName = "sendMessage";
        jsonWebChatApi.param = jsonObjSendMessage;
        jsonObjSendMessage.target = $("#user_name").text();
        jsonObjSendMessage.msg = $("#text-send").val();
        var msg = JSON.stringify(jsonWebChatApi);
        websocket.send(msg);
        var pp=$("<p class=\"text-right\"></p>").text($("#text-send").val());
        $("#content_body").append(pp);
        $("#text-send").val("");
    });

    $("#refresh_user").click(function () {
        //var msg = "wxcmd:getuserlist";
        jsonWebChatApi.funName = "getContactList";
        jsonWebChatApi.param = "";
        var msg = JSON.stringify(jsonWebChatApi);
        websocket.send(msg);
        alert("get user list is send ,please wait .");
        //var data = '{"id":"16815599ed644840be2f0f2dc216afbb","funName":"getContactList","uid":"1851617789","funType":"reqest","page":0,"infoItems":[{"remarkName":"愛雲","pin":"","nickname":"","avatarUrl":""},{"remarkName":"百里屠猪","pin":"","nickname":"","avatarUrl":""},{"remarkName":"碧海蓝天","pin":"","nickname":"","avatarUrl":""},{"remarkName":"大白","pin":"","nickname":"","avatarUrl":""},{"remarkName":"番茄酱","pin":"","nickname":"","avatarUrl":""},{"remarkName":"Jerry","pin":"","nickname":"","avatarUrl":""},{"remarkName":"青藤","pin":"","nickname":"","avatarUrl":""},{"remarkName":"未满丶","pin":"","nickname":"","avatarUrl":""},{"remarkName":"微信团队","pin":"","nickname":"","avatarUrl":""},{"remarkName":"wOw","pin":"","nickname":"","avatarUrl":""},{"remarkName":"xiakalaka","pin":"","nickname":"","avatarUrl":""}]}';
        //var data = "wxcmd:userlist:百里屠猪:碧海蓝天:大白:番茄酱:Jerry:青藤:未满丶:微信团队:wOw:雲霓:xiakalaka";
        dealwithData(data);
    });

    $("#refresh_record").click(function () {
        //var msg = "wxcmd:getchatrecord:"+$("#user_name").text();
        jsonWebChatApi.funName = "getChatRecord";
        jsonObjGetChatRecord.target = $("#user_name").text();
        jsonWebChatApi.param = jsonObjGetChatRecord;
        var msg = JSON.stringify(jsonWebChatApi);
        websocket.send(msg);
        alert("get user record is send ,please wait .");
        //var data = "wxcmd:userlist:百里屠猪:碧海蓝天:大白:番茄酱:Jerry:青藤:未满丶:微信团队:wOw:雲霓:xiakalaka";
        //dealwithData(data);
    });

    $("#refresh_nearby").click(function () {
        //var msg = "wxcmd:getnearbyuser";
        jsonWebChatApi.funName = "getNearbyList";
        jsonWebChatApi.param = "";
        var msg = JSON.stringify(jsonWebChatApi);
        websocket.send(msg);
        alert("get nearby user is send ,please wait .");
        //var data = "wxcmd:nearbyuser:XXX:100米以内:康诺建设:100米以内:王涛:100米以内:xiu@@log:100米以内:想你的人:100米以内:　淡抹丶悲伤:100米以内";
        //dealwithData(data);
    });

    $("#user_list li a").click(function(){
        $("#user_list li").removeClass('active');
        $(this).parent().addClass('active');
        $(this).children(".badge").remove();
        $("#user_name").text($(this).text());
    })
});

function initWebSocket() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
        onOpen(evt);
    };
    websocket.onclose = function(evt) {
        onClose(evt);
    };
    websocket.onmessage = function(evt) {
        onMessage(evt);
    };
    websocket.onerror = function(evt) {
        onError(evt);
    };
}

function onOpen(evt) {
    websocket.send("client-web");
    websocket.send("web-getdevice");
}

function onClose(evt) {
}

function onMessage(evt) {
    //websocket.close();
    //alert(evt.data);
    dealwithData(evt.data);
}

function onError(evt) {
}

function dealwithData(data) {
    //alert("data=" +data);
    if(data.indexOf("device") == 0) {
        var dats = data.split(":");
        $("#myModal").modal('show');
        for(var i=1;i<dats.length;i++) {
            var child=$("<a href=\"#\"></a>").text(dats[i]);
            var childli = $("<li></li>");
            childli.append(child);
            $("#device_list").append(childli);
        }
        $("#device_list li a").click(function(){
            $("#user_list li").removeClass('active');
            $(this).parent().addClass('active');
            //alert("device = " + $(this).text());
            websocket.send("aimdevice-"+$(this).text());
            $("#myModal").modal('hide');
        });

    }
    if(data.indexOf("{") == 0) {
        var json = $.parseJSON(data);
        var method = json.funName;
        if(method == "receiveMessage") {
            var msgJson = json.param;
            $("#user_name").text(msgJson.target);
            var pp = $("<p class=\"text-left\"></p>").text(msgJson.msg);
            $("#content_body").append(pp);
        } else if(method == "getContactList") {
            $("#user_list").empty();
            var contactJson =  json.param.infoItems;
            for(var i= 0;i<contactJson.length;i++) {
                //alert("userlist:"+dats[i]);
                var child=$("<a href=\"#\"></a>").text(contactJson[i].remarkName);
                var childli = $("<li></li>");
                childli.append(child);
                $("#user_list").append(childli);
            }
            $("#user_list li a").click(function(){
                $("#user_list li").removeClass('active');
                $(this).parent().addClass('active');
                $(this).children(".badge").remove();
                $("#user_name").text($(this).text());
            });
        } else if(method == "getChatRecord") {
            $("#content_body").empty();
            var recordJson = json.param.infoItems;
            for(var i= 0;i<recordJson.length;i++) {
                var pp;
                if(recordJson[i].owner == "myself") {
                    pp = $("<p class=\"text-right\"></p>").text(recordJson[i].msg);
                } else {
                    pp = $("<p class=\"text-left\"></p>").text(recordJson[i].msg);
                }
                $("#content_body").append(pp);
            }
        } else if(method == "getNearbyList") {
            $("#nearby_list").empty();
            var nearbyJson = json.param.infoItems;
            for(var i= 0;i<nearbyJson.length;i++) {
                var tr = $("<tr></tr>");
                var td1 = $("<td></td>").text(nearbyJson[i].remarkName);
                var td2 = $("<td></td>").text(nearbyJson[i].distance);
                var td3 = $("<td><button type=\"button\" class=\"btn btn-primary pull-right\">添加好友</button></td>");
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                $("#nearby_list").append(tr);
            }
            $("#nearby_list button").click(function () {
                jsonWebChatApi.funName = "sendNearbyUserMsg";
                jsonObjSendNearbyUserMsg.target = $($(this).parent().parent().children("td").get(0)).text();
                jsonObjSendNearbyUserMsg.msg = "Hello,Nice to see you";
                jsonWebChatApi.param = jsonObjSendNearbyUserMsg;
                var msg = JSON.stringify(jsonWebChatApi);
                websocket.send(msg);
                alert("add user is send ,please wait.");
            });
        }
    }
}
